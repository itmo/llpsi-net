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
import { WordDB } from '../../../models/WordDB';
import { AppBar, Box, Card, CardContent, Collapse, IconButton, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Word } from '../../../models/words/Word';

export interface ListProps {
    db: WordDB;
}

export function ParticleList(props: ListProps) {
    const [index, setIndex] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setIndex(newValue);
    };

    return (
        <React.Fragment>
            <Typography component='h1' variant='h4'>Particles</Typography>
            <AppBar position='static'>
                <Tabs value={index} onChange={handleChange}>
                    <Tab label='Adverbs' />
                    <Tab label='Conjunctions' />
                    <Tab label='Interjections' />
                    <Tab label='Interrogatives' />
                    <Tab label='Prepositions' />
                </Tabs>
            </AppBar>
            <div hidden={index != 0}><WordList words={props.db.adverbs} /></div>
            <div hidden={index != 1}><WordList words={props.db.conjunctions} /></div>
            <div hidden={index != 2}><WordList words={props.db.interjections} /></div>
            <div hidden={index != 3}><WordList words={props.db.interrogatives} /></div>
            <div hidden={index != 4}><WordList words={props.db.prepositions} /></div>
        </React.Fragment>
    );
}

export function WordList(props: {words: Word[]}) {
    return (
        <React.Fragment>
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
                        {props.words.map(p => <ParticleRow particle={p} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}

function ParticleRow(props: {particle: Word}) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{props.particle.lemma}</TableCell>
                <TableCell>{props.particle.chapter}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open} unmountOnExit>
                        <Box margin={1}>
                            <WordCard word={props.particle} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function WordCard(props: any) {
    return (
        <Card>
            <CardContent>
                <Typography color='textSecondary' gutterBottom>
                    Chapter {props.word.chapter}
                </Typography>
                <Typography variant='h5' component='h2'>
                    {props.word.lemma}
                </Typography>
                <Typography color='textSecondary'>
                    {props.word.type}
                </Typography>
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
