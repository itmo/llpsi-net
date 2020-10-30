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

import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, Typography, withStyles } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow/TableRow";
import React from "react";
import { AdjectiveDeclinable } from "../../models/types/AdjectiveDeclinable";
import { AllCases, Casus } from "../../models/types/Casus";
import { Genus } from "../../models/types/Genus";
import { Numerus } from "../../models/types/Numerus";
import { WordType } from "../../models/types/WordType";
import { Adjective } from "../../models/words/Adjective";
import { Conjunction } from "../../models/words/Conjunction";
import { Noun } from "../../models/words/Noun";
import { Preposition } from "../../models/words/Preposition";
import { Pronoun } from "../../models/words/Pronoun";
import { Word } from "../../models/words/Word";

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

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
        default:
            return <React.Fragment />;
    }
}

function AdjectivalEntry(props: {word: AdjectiveDeclinable}) {
    return (
        <React.Fragment>
            <Typography variant='h6' component='h6'>Declension</Typography>
            <TableContainer>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell colSpan={3} style={{textAlign: 'center'}} lang='la'>{Numerus.Singular}</TableCell>
                            <TableCell colSpan={3} style={{textAlign: 'center'}} lang='la'>{Numerus.Plural}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            <TableCell />
                            <TableCell style={{textAlign: 'center'}}>m</TableCell>
                            <TableCell style={{textAlign: 'center'}}>f</TableCell>
                            <TableCell style={{textAlign: 'center'}}>n</TableCell>
                            <TableCell style={{textAlign: 'center'}}>m</TableCell>
                            <TableCell style={{textAlign: 'center'}}>f</TableCell>
                            <TableCell style={{textAlign: 'center'}}>n</TableCell>
                        </StyledTableRow>
                        { AllCases.map(casus => <AdjectivalDeclension word={props.word} casus={casus} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
)};

function AdjectivalDeclension(props: {word: AdjectiveDeclinable, casus: Casus}) {
    return (
        <StyledTableRow lang='la'>
            <TableCell>{props.casus}</TableCell>

            <TableCell>{props.word.decline(Genus.Masculine, props.casus, Numerus.Singular)}</TableCell>
            <TableCell>{props.word.decline(Genus.Femininum, props.casus, Numerus.Singular)}</TableCell>
            <TableCell>{props.word.decline(Genus.Neuter, props.casus, Numerus.Singular)}</TableCell>

            <TableCell>{props.word.decline(Genus.Masculine, props.casus, Numerus.Plural)}</TableCell>
            <TableCell>{props.word.decline(Genus.Femininum, props.casus, Numerus.Plural)}</TableCell>
            <TableCell>{props.word.decline(Genus.Neuter, props.casus, Numerus.Plural)}</TableCell>
        </StyledTableRow>
    );
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

function NounEntry(props: {noun: Noun}) {
    return (
        <React.Fragment>
            <Typography variant='h6' component='h6'>Declension</Typography>
            <Typography variant='body2' component='p' lang='la'>
                Gender: {props.noun.genus}
            </Typography>
            <TableContainer>
                <Table size='small'>
                    <TableHead>
                        <TableRow lang='la'>
                            <TableCell></TableCell>
                            <TableCell>{Numerus.Singular}</TableCell>
                            <TableCell>{Numerus.Plural}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { AllCases.map(casus => <NounDeclension noun={props.noun} casus={casus} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
};

function NounDeclension(props: {noun: Noun, casus: Casus}) {
    return (
        <StyledTableRow lang='la'>
            <TableCell>{props.casus}</TableCell>
            <TableCell>{props.noun.decline(props.casus, Numerus.Singular)}</TableCell>
            <TableCell>{props.noun.decline(props.casus, Numerus.Plural)}</TableCell>
        </StyledTableRow>
    );
}
