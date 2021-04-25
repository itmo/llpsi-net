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

import {Table, TableBody, TableCell, TableContainer, TableHead, Typography, withStyles } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow/TableRow";
import React from "react";
import { AllCases, Casus } from "../../models/types/Casus";
import { Numerus } from "../../models/types/Numerus";
import { Noun } from "../../models/words/Noun";

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

export function NounEntry(props: {noun: Noun}) {
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

export function NounDeclension(props: {noun: Noun, casus: Casus}) {
    return (
        <StyledTableRow lang='la'>
            <TableCell>{props.casus}</TableCell>
            <TableCell>{props.noun.decline(props.casus, Numerus.Singular)}</TableCell>
            <TableCell>{props.noun.decline(props.casus, Numerus.Plural)}</TableCell>
        </StyledTableRow>
    );
}
