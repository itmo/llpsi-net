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
import { Numerus } from "../../models/types/Numerus";
import { Verb } from "../../models/words/Verb";

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

export function VerbEntry(props: {verb: Verb}) {
    const c = props.verb.conjugate();

    return (
        <React.Fragment>
            <Typography variant='h6' component='h6'>Stems</Typography>
            <ul>
                <li>Present: {c.active.indicative.present?.infinitive?.join(', ')}</li>
                <li>Perfect: {c.active.indicative.perfect?.infinitive?.join(', ')}</li>
                <li>Supine: {c.supine.acc?.join(', ')}</li>
            </ul>
        </React.Fragment>
    );
};
