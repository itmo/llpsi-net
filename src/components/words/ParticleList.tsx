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
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { WordList } from './WordList';

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
            <div hidden={index != 0}><WordList words={props.db.words.adverbs} /></div>
            <div hidden={index != 1}><WordList words={props.db.words.conjunctions} /></div>
            <div hidden={index != 2}><WordList words={props.db.words.interjections} /></div>
            <div hidden={index != 4}><WordList words={props.db.words.prepositions} /></div>
        </React.Fragment>
    );
}
