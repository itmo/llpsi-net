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
import { Casus } from "../../models/types/Casus";
import { Genus } from "../../models/types/Genus";
import { Numerus } from "../../models/types/Numerus";
import { WordType } from "../../models/types/WordType";
import { Adjective } from "../../models/words/Adjective";
import { Conjunction } from "../../models/words/Conjunction";
import { Noun } from "../../models/words/Noun";
import { Preposition } from "../../models/words/Preposition";
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
                <Typography variant='h5' component='h2'>
                    {props.word.lemma}
                </Typography>
                { getWordData(props.word) }
                <Typography variant='body2' component='p'>
                    English: {props.word.english}
                </Typography>
                <Typography variant='body2' component='p'>
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
        case WordType.Adjective:    return <AdjectiveEntry adj={word as Adjective} />;
        case WordType.Conjunction:  return <ConjunctionEntry conj={word as Conjunction} />;
        case WordType.Preposition:  return <PrepositionEntry prp={word as Preposition} />;
        case WordType.Noun:         return <NounEntry noun={word as Noun} />;
        default:
            return <React.Fragment />;
    }
}

function AdjectiveEntry(props: {adj: Adjective}) {
    return (
    <React.Fragment>
        <Typography variant='h6' component='h6'>Declension</Typography>
        <TableContainer>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell colSpan={3} style={{textAlign: 'center'}}>{Numerus.Singular}</TableCell>
                        <TableCell colSpan={3} style={{textAlign: 'center'}}>{Numerus.Plural}</TableCell>
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
                    <AdjectiveDeclension adj={props.adj} casus={Casus.Nominative} />
                    <AdjectiveDeclension adj={props.adj} casus={Casus.Accusative} />
                    <AdjectiveDeclension adj={props.adj} casus={Casus.Genitive} />
                    <AdjectiveDeclension adj={props.adj} casus={Casus.Dative} />
                    <AdjectiveDeclension adj={props.adj} casus={Casus.Ablative} />
                    <AdjectiveDeclension adj={props.adj} casus={Casus.Vocative} />
                </TableBody>
            </Table>
        </TableContainer>
    </React.Fragment>
)};

const AdjectiveDeclension: React.FunctionComponent<{adj: Adjective, casus: Casus}> = (props) =>
    <StyledTableRow>
        <TableCell>{props.casus}</TableCell>
        <TableCell>{props.adj.decline(Genus.Masculine, props.casus, Numerus.Singular)}</TableCell>
        <TableCell>{props.adj.decline(Genus.Femininum, props.casus, Numerus.Singular)}</TableCell>
        <TableCell>{props.adj.decline(Genus.Neuter, props.casus, Numerus.Singular)}</TableCell>

        <TableCell>{props.adj.decline(Genus.Masculine, props.casus, Numerus.Plural)}</TableCell>
        <TableCell>{props.adj.decline(Genus.Femininum, props.casus, Numerus.Plural)}</TableCell>
        <TableCell>{props.adj.decline(Genus.Neuter, props.casus, Numerus.Plural)}</TableCell>
    </StyledTableRow>                    

const ConjunctionEntry: React.FunctionComponent<{conj: Conjunction}> = (props) =>
    <React.Fragment>
        { props.conj.abbreviations.length == 0 ? null : 
            <Typography variant='body2' component='p'>
                Abbreviations: { props.conj.abbreviations.join(', ') }
            </Typography>
        }
    </React.Fragment>

const PrepositionEntry: React.FunctionComponent<{prp: Preposition}> = (props) =>
    <React.Fragment>
        Cases: {props.prp.cases.join(', ') }
    </React.Fragment>

function NounEntry(props: {noun: Noun}) {
    return (
    <React.Fragment>
        <Typography variant='h6' component='h6'>Declension</Typography>
        <Typography variant='body2' component='p'>
            Gender: {props.noun.genus}
        </Typography>
        <TableContainer>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>{Numerus.Singular}</TableCell>
                        <TableCell>{Numerus.Plural}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <NounDeclension noun={props.noun} casus={Casus.Nominative} />
                    <NounDeclension noun={props.noun} casus={Casus.Accusative} />
                    <NounDeclension noun={props.noun} casus={Casus.Genitive} />
                    <NounDeclension noun={props.noun} casus={Casus.Dative} />
                    <NounDeclension noun={props.noun} casus={Casus.Ablative} />
                    <NounDeclension noun={props.noun} casus={Casus.Vocative} />
                </TableBody>
            </Table>
        </TableContainer>
    </React.Fragment>
)};

const NounDeclension: React.FunctionComponent<{noun: Noun, casus: Casus}> = (props) =>
    <StyledTableRow>
        <TableCell>{props.casus}</TableCell>
        <TableCell>{props.noun.decline(props.casus, Numerus.Singular)}</TableCell>
        <TableCell>{props.noun.decline(props.casus, Numerus.Plural)}</TableCell>
    </StyledTableRow>                    
