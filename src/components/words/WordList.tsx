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
import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Word } from '../../models/words/Word';
import { WordCard } from './WordCard';
import { WordType } from '../../models/types/WordType';
import { Verb } from '../../models/words/Verb';

export function WordList(props: {caption?: string, words: Word[]}) {
    return (
        <React.Fragment>
            { props.caption &&
                <Typography component='h1' variant='h4'>{props.caption}</Typography>
            }
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Word</TableCell>
                            <TableCell>Introduced in</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.words.map(p => <WordRow word={p} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}

function WordRow(props: {word: Word}) {
    const [open, setOpen] = React.useState(false);
    const word = props.word;

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell lang='la'>{word.lemma}</TableCell>
                <TableCell>{word.chapter}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open} unmountOnExit>
                        <Box margin={1}>
                            <WordCard word={word} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
