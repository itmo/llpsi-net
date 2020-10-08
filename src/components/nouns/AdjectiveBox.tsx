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
import { Casus } from '../../models/types/Casus';
import { Numerus } from '../../models/types/Numerus';
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, makeStyles, createStyles, withStyles, TableCell } from '@material-ui/core';
import { Adjective } from '../../models/words/Adjective';
import { Genus } from '../../models/types/Genus';

export interface AdjectiveBoxProps {
    adj: Adjective;
}

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

export const AdjectiveBox: React.FunctionComponent<AdjectiveBoxProps> = (props) => {
    return (
    <React.Fragment>
        <TableContainer component={Paper}>
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
                    <NounEntry adj={props.adj} casus={Casus.Nominative} />
                    <NounEntry adj={props.adj} casus={Casus.Accusative} />
                    <NounEntry adj={props.adj} casus={Casus.Genitive} />
                    <NounEntry adj={props.adj} casus={Casus.Dative} />
                    <NounEntry adj={props.adj} casus={Casus.Ablative} />
                    <NounEntry adj={props.adj} casus={Casus.Vocative} />
                </TableBody>
            </Table>
        </TableContainer>
        <ul>
            <li>English: { props.adj.english }</li>
            <li>German: { props.adj.german }</li>
            <li>Notable uses: { props.adj.references }</li>
        </ul>
    </React.Fragment>
)};

const NounEntry: React.FunctionComponent<{adj: Adjective, casus: Casus}> = (props) =>
    <StyledTableRow>
        <TableCell>{props.casus}</TableCell>
        <TableCell>{props.adj.decline(Genus.Masculine, props.casus, Numerus.Singular)}</TableCell>
        <TableCell>{props.adj.decline(Genus.Femininum, props.casus, Numerus.Singular)}</TableCell>
        <TableCell>{props.adj.decline(Genus.Neuter, props.casus, Numerus.Singular)}</TableCell>

        <TableCell>{props.adj.decline(Genus.Masculine, props.casus, Numerus.Plural)}</TableCell>
        <TableCell>{props.adj.decline(Genus.Femininum, props.casus, Numerus.Plural)}</TableCell>
        <TableCell>{props.adj.decline(Genus.Neuter, props.casus, Numerus.Plural)}</TableCell>
    </StyledTableRow>                    


