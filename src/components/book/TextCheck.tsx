/*
 *   LLPSI.net - Learning platform for Lingua Latina per se illustrata
 *   Copyright (C) 2020 Folke Will <folko@solhost.org>
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Affero General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Affero General Public License for more details.
 *
 *   You should have received a copy of the GNU Affero General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { useEffect, useState } from 'react';
import Typography from "@material-ui/core/Typography";
import { LLPSIClient } from '../../client/LLPSIClient';
import Editor from 'react-simple-code-editor';
import { DictEntry } from '../../client/APITypes';

const client = new LLPSIClient("https://llpsi.net/api/");

const WordDelims = /[\s,.!?:;()\[\]"'/*]/;
const WordDelimsGroup = /([\s,.!?:;()\[\]"'/*])/g;

interface WordGroups {
    fr: Set<string>;
    wiktionary: Set<string>;
    unknown: Set<string>;

    usedWords: DictEntry[];
}

export function TextCheckView(props: {}) {
    const [text, setText] = useState("In taberna quandō sumus.");
    const [groups, setGroups] = useState<WordGroups>({
        fr: new Set(),
        wiktionary: new Set(),
        unknown: new Set(),
        usedWords: [],
    });

    async function updateWords() {
        const [newGroups, changed] = await analyzeText(text, groups);
        if (changed) {
            setGroups(newGroups);
        }
    }

    useEffect(() => {
        updateWords();
    });

    return (
        <>
            <Typography component='h1' variant='h4'>Text Check</Typography>
            <Editor
                value={text}
                onValueChange={text => setText(text)}
                highlight={text => highlight(text + "\n", groups)}
                padding={10}
                style={{backgroundColor: 'lightgray'}}
            />
            <ul style={{display: 'inline'}}>
                { groups.usedWords.map(entry => {
                    if (entry.dictionary == "Wiktionary") {
                        return(
                            <li>
                                {entry.word.lemma}: {entry.word.senses.english.join(", ")}
                            </li>
                        );
                    }
                })}
            </ul>
        </>
    );
}

function highlight(text: string, groups: WordGroups): JSX.Element {
    console.log("Highlight");
    const res: JSX.Element[] = [];

    for (const word of text.split(WordDelimsGroup)) {
        if (!word || word.match(WordDelims)) {
            res.push(<>{word}</>);
            continue;
        }

        const lower = word.toLowerCase();
        let color = "white";
        if (groups.fr.has(lower)) {
            color = "black";
        } else if (groups.wiktionary.has(lower)) {
            color = "yellow";
        } else if (groups.unknown.has(lower)) {
            color = "red";
        }
        res.push(<span style={{color: color}}>{word}</span>);
    }

    return <>{res}</>;
}

async function analyzeText(text: string, groups: WordGroups): Promise<[WordGroups, boolean]> {
    console.log("Analzye");
    const words = text.split(WordDelims);

    const missWords = words.filter(word => {
        const searchForm = word.toLowerCase();
        return !(
                    groups.fr.has(searchForm) ||
                    groups.unknown.has(searchForm) ||
                    groups.wiktionary.has(searchForm)
            );
    });

    if (missWords.length == 0) {
        return [groups, false];
    }

    const newGroups: WordGroups = {
        fr: new Set(groups.fr),
        wiktionary: new Set(groups.wiktionary),
        unknown: new Set(groups.unknown),
        usedWords: Array.from(groups.usedWords),
    };

    const data = await client.lemmatize(missWords, true);
    for (let i = 0; i < data.forms.length; i++) {
        const wordIndices = data.forms[i];
        const words = wordIndices.map(idx => data.words[idx]);
        const frWords = words.filter(word => word.word.meta.llpsiChapter !== null);
        const wiktWords = words.filter(word => word.word.meta.wiktionaryLemma !== null);

        const formToAdd = missWords[i].toLowerCase();
        if (frWords.length > 0) {
            console.log(`Adding "${formToAdd}" to FR`);
            newGroups.fr.add(formToAdd);
            newGroups.usedWords.push(...frWords);
        } else if (wiktWords.length > 0) {
            console.log(`Adding "${formToAdd}" to WKT`);
            newGroups.wiktionary.add(formToAdd);
            newGroups.usedWords.push(...wiktWords);
        } else {
            console.log(`Adding "${formToAdd}" to unknowns`);
            newGroups.unknown.add(formToAdd);
        }
    }

    return [newGroups, true];
}
