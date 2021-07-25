/*
 *   LLPSI.net - Learning platform for Lingua Latina per se illustrata
 *   Copyright (C) 2021 Folke Will <folko@solhost.org>
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

import React from 'react';
import Typography from "@material-ui/core/Typography";
import { WordDB } from '../../models/WordDB';
import { IconButton, Collapse, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Word } from '../../models/words/Word';
import { macronSort } from '../../models/common';
import { WordCard } from '../words/WordCard';

export function ChapterList(props: { db: WordDB }) {
    return (
        <section>
            <Typography component='h1' variant='h4'>LLPSI Chapters</Typography>
            { iterateChapters(props.db).map(chapter =>
                <ChapterRow db={props.db} chapter={chapter} />
            )}
        </section>
    );
}

function iterateChapters(db: WordDB): number[] {
    const res = [];
    for (let i = 1; i <= db.maxChapter; i++) {
        res.push(i);
    }
    return res;
}

function ChapterRow(props: {db: WordDB, chapter: number}) {
    const [open, setOpen] = React.useState(false);

    return (
        <section>
            <IconButton size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            Chapter {props.chapter}
            <Collapse in={open} unmountOnExit>
                <Box margin={1}>
                    <Chapter db={props.db} chapter={props.chapter} />
                </Box>
            </Collapse>
        </section>
    );
}

function Chapter(props: {db: WordDB, chapter: number}) {
    const words = props.db.getChapterWords(props.chapter);

    const particles: Word[] = (words.adverbs as Word[])
        .concat(words.conjunctions)
        .concat(words.interjections)
        .concat(words.prepositions)
        .sort((a, b) => macronSort(a.lemma, b.lemma));

    return (
        <React.Fragment>
            { words.nouns.length > 0 && <List words={words.nouns} caption='Nouns' /> }
            { words.adjectives.length > 0 && <List words={words.adjectives} caption='Adjectives' /> }
            { words.pronouns.length > 0 && <List words={words.pronouns} caption='Pronouns' /> }
            { words.numerals.length > 0 && <List words={words.numerals} caption='Numerals' /> }

            { words.verbs.length > 0 && <List words={words.verbs} caption='Verbs' /> }

            { particles.length > 0 && <List words={particles} caption='Particles' /> }
        </React.Fragment>
    );
}

function List(props: {caption?: string, words: Word[]}) {
    return (
        <Box mt={2}>
            { props.caption &&
                <Typography component='h2' variant='h6'>{props.caption}</Typography>
            }
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {props.words.map(p => <WordRow word={p} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

function WordRow(props: {word: Word}) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell lang='la'>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    {props.word.lemma}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open} unmountOnExit>
                        <Box margin={1}>
                            <WordCard word={props.word} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
