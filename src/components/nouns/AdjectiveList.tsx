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
import Typography from "@material-ui/core/Typography";
import { WordDB } from '../../models/WordDB';
import { Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Adjective } from '../../models/words/Adjective';
import { AdjectiveBox } from './AdjectiveBox';

export const AdjectiveList: React.FunctionComponent<{db: WordDB}> = (props) =>
  <section>
    <Typography component='h1' variant='h4'>Adjectives</Typography>
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>Adjective</TableCell>
                    <TableCell>Introduced in</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { props.db.adjectives.map(adj => <AdjectiveRow adj={adj} />) }
            </TableBody>
        </Table>
    </TableContainer>
  </section>

const AdjectiveRow: React.FunctionComponent<{adj: Adjective}> = (props) => {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{props.adj.lemma}</TableCell>
                <TableCell>{props.adj.chapter}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={3}>
                    <Collapse in={open} unmountOnExit>
                        <AdjectiveBox adj={props.adj} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
)};
