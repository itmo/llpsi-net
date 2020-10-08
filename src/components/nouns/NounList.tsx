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
import { NounBox } from './NounBox';
import { Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from '@material-ui/core';
import { Noun } from '../../models/words/Noun';
import { macronSort } from '../../models/common';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export interface NounProps {
    db: WordDB;
}

export const NounList: React.FunctionComponent<NounProps> = (props) =>
  <section>
    <Typography component='h1' variant='h4'>Nouns</Typography>
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>Noun</TableCell>
                    <TableCell>Introduced in</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { props.db.nouns.map(noun => <NounRow noun={noun} />) }
            </TableBody>
        </Table>
    </TableContainer>
  </section>

const NounRow: React.FunctionComponent<{noun: Noun}> = (props) => {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{props.noun.lemma}</TableCell>
                <TableCell>{props.noun.chapter}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={3}>
                    <Collapse in={open} unmountOnExit>
                        <NounBox noun={props.noun} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
)};

function getComparator(order: string, key: string): (a: Noun, b: Noun) => number {
    if (key == 'chapter') {
        if (order == 'asc') {
            return (a, b) => a.chapter > b.chapter ? 1 : -1;
        } else {
            return (a, b) => a.chapter > b.chapter ? -1 : 1;
        }
    } else if (key == 'lemma') {
        if (order == 'asc') {
            return (a, b) => macronSort(a.lemma, b.lemma);
        } else {
            return (a, b) => macronSort(b.lemma, a.lemma);
        }
    } else {
        throw Error('Invalid sort options');
    }
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        } 
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
