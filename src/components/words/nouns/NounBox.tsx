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

import React from 'react';
import { Noun } from '../../../models/words/Noun';
import { Casus } from '../../../models/types/Casus';
import { Numerus } from '../../../models/types/Numerus';
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, makeStyles, createStyles, withStyles, TableCell } from '@material-ui/core';

export interface NounBoxProps {
    noun: Noun;
}

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

export const NounBox: React.FunctionComponent<NounBoxProps> = (props) => {
    return (
    <React.Fragment>
        <TableContainer component={Paper}>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>{Numerus.Singular}</TableCell>
                        <TableCell>{Numerus.Plural}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <NounEntry noun={props.noun} casus={Casus.Nominative} />
                    <NounEntry noun={props.noun} casus={Casus.Accusative} />
                    <NounEntry noun={props.noun} casus={Casus.Genitive} />
                    <NounEntry noun={props.noun} casus={Casus.Dative} />
                    <NounEntry noun={props.noun} casus={Casus.Ablative} />
                    <NounEntry noun={props.noun} casus={Casus.Vocative} />
                </TableBody>
            </Table>
        </TableContainer>
        <ul>
            <li>Genus: { props.noun.genus }</li>
            <li>English: { props.noun.english }</li>
            <li>German: { props.noun.german }</li>
            <li>Notable uses: { props.noun.references }</li>
        </ul>
    </React.Fragment>
)};

const NounEntry: React.FunctionComponent<{noun: Noun, casus: Casus}> = (props) =>
    <StyledTableRow>
        <TableCell>{props.casus}</TableCell>
        <TableCell>{props.noun.decline(props.casus, Numerus.Singular)}</TableCell>
        <TableCell>{props.noun.decline(props.casus, Numerus.Plural)}</TableCell>
    </StyledTableRow>                    
