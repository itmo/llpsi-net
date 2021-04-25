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

import { Table, TableBody, TableCell, TableContainer, TableHead, Typography, withStyles } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow/TableRow";
import React from "react";
import { AdjectiveDeclinable } from "../../models/types/AdjectiveDeclinable";
import { AllCases, Casus } from "../../models/types/Casus";
import { Genus } from "../../models/types/Genus";
import { Numerus } from "../../models/types/Numerus";

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

export function AdjectivalEntry(props: {word: AdjectiveDeclinable}) {
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

export function AdjectivalDeclension(props: {word: AdjectiveDeclinable, casus: Casus}) {
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

