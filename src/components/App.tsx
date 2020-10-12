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
import { HashRouter as Router, Route, Link as RouterLink, Switch, Redirect } from 'react-router-dom';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import SportsEsports from '@material-ui/icons/SportsEsports';
import People from '@material-ui/icons/People';
import DirectionsRun from '@material-ui/icons/DirectionsRun';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import { WordDB } from '../models/WordDB';
import { About } from './About';
import { ParticleList } from './words/ParticleList';
import { WordList } from './words/WordList';
import { DeclensionGameView } from './games/DeclensionGameView';

const drawerWidth = 240;
const useStyles = makeStyles(theme => createStyles({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overFlow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

export interface AppProps {
    db: WordDB;
}

export const App: React.FunctionComponent<AppProps> = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position='fixed' className={classes.appBar}>
                <Toolbar>
                    <Typography component='h1' variant='h6' color='inherit' noWrap>
                        LLPSI.net
                    </Typography>
                </Toolbar>
            </AppBar>
            <Router>
                <Drawer variant='permanent' className={classes.drawer} classes={{paper: classes.drawerPaper}}>
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                        <List>
                            <ListItem button component={RouterLink} to='/words/nouns'>
                                <ListItemIcon><LocalFloristIcon /></ListItemIcon>
                                <ListItemText primary='Nouns' />
                            </ListItem>
                            <ListItem button component={RouterLink} to='/words/adjectives'>
                                <ListItemIcon><FitnessCenterIcon /></ListItemIcon>
                                <ListItemText primary='Adjectives' />
                            </ListItem>
                            <ListItem button component={RouterLink} to='/words/pronouns'>
                                <ListItemIcon><People /></ListItemIcon>
                                <ListItemText primary='Pronouns' />
                            </ListItem>
                            <ListItem button component={RouterLink} to='/words/verbs'>
                                <ListItemIcon><DirectionsRun /></ListItemIcon>
                                <ListItemText primary='Verbs' />
                            </ListItem>
                            <ListItem button component={RouterLink} to='/words/particles'>
                                <ListItemIcon><PlaylistAddCheckIcon /></ListItemIcon>
                                <ListItemText primary='Particles' />
                            </ListItem>
                            <ListItem button component={RouterLink} to='/games/declension'>
                                <ListItemIcon><SportsEsports /></ListItemIcon>
                                <ListItemText primary='Games' />
                            </ListItem>
                            <ListItem button component={RouterLink} to='/about'>
                                <ListItemIcon><InfoIcon /></ListItemIcon>
                                <ListItemText primary='About' />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <main className={classes.content}>
                    <Toolbar />
                    <Container className={classes.container}>
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/games/declension" />
                            </Route>

                            <Route path="/words/nouns">
                                <WordList words={props.db.nouns} />
                            </Route>

                            <Route path="/words/adjectives">
                                <WordList words={props.db.adjectives} />
                            </Route>

                            <Route path="/words/pronouns">
                                <WordList words={props.db.pronouns} />
                            </Route>

                            <Route path="/words/verbs">
                            <WordList words={props.db.verbs} />
                            </Route>

                            <Route path="/words/particles">
                                <ParticleList db={props.db} />
                            </Route>

                            <Route path="/games/declension">
                                <DeclensionGameView db={props.db} />
                            </Route>

                            <Route path="/about">
                                <About db={props.db} />
                            </Route>
                        </Switch>
                    </Container>
                    <Copyright />
                </main>
            </Router>
        </div>
    )
};

const Copyright: React.FunctionComponent = () =>
    <Box pt={4}>
        <Typography variant='body2' color='textSecondary' align='center'>
            Copyright © <a href='https://github.com/fpw/'>Folke Will</a>, 2020
        </Typography>
    </Box>
