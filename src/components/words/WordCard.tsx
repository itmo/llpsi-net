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

import { Card, CardContent, Typography, withStyles } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow/TableRow";
import React from "react";
import { WordType } from "../../models/types/WordType";
import { Adjective } from "../../models/words/Adjective";
import { Conjunction } from "../../models/words/Conjunction";
import { Noun } from "../../models/words/Noun";
import { Preposition } from "../../models/words/Preposition";
import { Pronoun } from "../../models/words/Pronoun";
import { Verb } from "../../models/words/Verb";
import { Word } from "../../models/words/Word";
import { AdjectivalEntry } from "./Adjective";
import { NounEntry } from "./Noun";
import { VerbEntry } from "./Verb";

export function WordCard(props: {word: Word}) {
    return (
        <Card>
            <CardContent>
                <Typography color='textSecondary' gutterBottom>
                    Chapter {props.word.chapter} - {props.word.type}
                </Typography>
                <Typography variant='h5' component='h2'  lang='la'>
                    {props.word.lemma}
                </Typography>
                { getWordData(props.word) }
                <Typography variant='body2' component='p'>
                    English: {props.word.english}
                </Typography>
                <Typography variant='body2' component='p' lang='de'>
                    German: {props.word.german}
                </Typography>
                <Typography variant='body2' component='p'>
                    Notables uses: {props.word.references}
                </Typography>
            </CardContent>
        </Card>
    );
}

function getWordData(word: Word): JSX.Element {
    switch (word.type) {
        case WordType.Adjective:    return <AdjectivalEntry word={word as Adjective} />;
        case WordType.Conjunction:  return <ConjunctionEntry conj={word as Conjunction} />;
        case WordType.Preposition:  return <PrepositionEntry prp={word as Preposition} />;
        case WordType.Noun:         return <NounEntry noun={word as Noun} />;
        case WordType.Pronoun:      return <AdjectivalEntry word={word as Pronoun} />;
        case WordType.Verb:         return <VerbEntry verb={word as Verb} />;
        default:
            return <React.Fragment />;
    }
}

function ConjunctionEntry(props: {conj: Conjunction}) {
    return (
        <React.Fragment>
            {props.conj.abbreviations.length == 0 ? null :
                <Typography variant='body2' component='p' lang='la'>
                    Abbreviations: {props.conj.abbreviations.join(', ')}
                </Typography>}
        </React.Fragment>
    );
}

function PrepositionEntry(props: {prp: Preposition}) {
    return (
        <span lang='la'>
            Cases: {props.prp.cases.join(', ')}
        </span>
    );
};
