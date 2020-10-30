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

import React, { useRef, useState } from 'react';
import Typography from "@material-ui/core/Typography";
import { WordDB } from '../../../models/WordDB';
import { DeclensionGame } from '../../../games/declension/DeclensionGame';
import { Box, Button, ButtonGroup, Collapse, FormControl, FormGroup, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@material-ui/core';
import { DeclensionGameOptions } from '../../../games/declension/DeclensionGameOptions';
import { DeclensionChallenge } from '../../../games/declension/DeclensionChallenge';
import { getGrammarKnowledge } from '../../../models/GrammarKnowledge';
import { Preposition } from '../../../models/words/Preposition';
import { Pronoun } from '../../../models/words/Pronoun';
import { Casus } from '../../../models/types/Casus';
import { Numerus } from '../../../models/types/Numerus';
import { Genus } from '../../../models/types/Genus';
import { Word } from '../../../models/words/Word';
import { WordCard } from '../../words/WordCard';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Interjection } from '../../../models/words/Interjection';
import { GameOptions } from './GameOptions';

export interface GameViewProps {
    db: WordDB;
}

enum GameState {
    Options,
    Game,
}

export function DeclensionGameView(props: GameViewProps) {
    const [state, setState] = useState<GameState>(GameState.Options);
    const [options, setOptions] = useState<DeclensionGameOptions>({
        knowledge: getGrammarKnowledge(props.db.maxChapter),
        vocabChapter: props.db.maxChapter,
    });
    const [game, setGame] = useState<DeclensionGame>(new DeclensionGame(props.db));
    const [challenge, setChallenge] = useState<DeclensionChallenge>();

    function changeOptions(opts: DeclensionGameOptions) {
        setOptions(opts);
    }

    function onStart() {
        setChallenge(game.createChallenge(options));
        setState(GameState.Game);
    }

    function onNextGame() {
        setChallenge(game.createChallenge(options));
    }

    function onCancel() {
        setOptions({
            knowledge: getGrammarKnowledge(props.db.maxChapter),
            vocabChapter: props.db.maxChapter,
        });
        setState(GameState.Options);
    }

    return (
        <React.Fragment>
            <Typography component='h1' variant='h4'>Declension Game</Typography>
            { state == GameState.Options &&
                <GameOptions
                    db={props.db}
                    initial={options}
                    onChange={opts => changeOptions(opts)}
                    onDone={() => onStart()}
                />
            }
            { state == GameState.Game && challenge &&
                <Game game={game} challenge={challenge}
                    onNext={() => onNextGame()}
                    onCancel={() => onCancel()}
                    key={new Date().getTime()}
                />
            }
        </React.Fragment>
    );
}

interface GameProps {
    game: DeclensionGame;
    challenge: DeclensionChallenge;
    onNext(): void;
    onCancel(): void;
}

function Game(props: GameProps): JSX.Element {
    const [right, setRight] = useState<boolean>(false);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>();
    const challenge = props.challenge;

    function setResponse(answer: string) {
        setRight(props.game.check(challenge, answer));
    }

    function next() {
        if (inputRef.current) {
            inputRef.current.value = '';
            setRight(false);
        }
        setShowAnswer(false);
        props.onNext();
    }

    function reset() {
        props.onCancel();
    }

    return (
        <React.Fragment>
            <Typography variant='body1'>
                { challenge.indicator instanceof Pronoun && challenge.casus != Casus.Vocative &&
                    'Type the answer to the interrogative pronoun.'
                }
                { challenge.casus == Casus.Vocative &&
                    'Decline the exclamation (vocative).'
                }
                { challenge.indicator instanceof Preposition &&
                    'Decline including the preposition.'
                }
            </Typography>
            <Box mt={1}>
                <TableContainer component={Paper}>
                    <Table size='small'>
                        <TableBody>
                            <TableRow lang='la'>
                                <TableCell style={{width: '20%'}}>Numerus</TableCell>
                                <TableCell style={{backgroundColor: 'yellow'}}>{challenge.number}</TableCell>
                            </TableRow>
                            { getIndicatorRow(challenge) }
                            { challenge.words.map(w => <WordRow word={w} />) }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box mt={1}>
                <form noValidate autoCorrect='off' autoComplete='off' autoCapitalize='off' spellCheck='false'>
                    <FormGroup>
                        <FormControl margin='normal'>
                            <TextField label='Enter answer here' variant='outlined'
                                autoComplete='off'
                                autoFocus={true}
                                error={!right}
                                onChange={ev => setResponse(ev.target.value)}
                                inputRef={inputRef}
                            />
                        </FormControl>
                    </FormGroup>
                    <ButtonGroup color='primary' variant='contained'>
                        <Button type='submit' onClick={() => next()} disabled={!right}>Next</Button>
                        <Button onClick={() => reset()}>Cancel</Button>
                    </ButtonGroup>
                </form>
            </Box>
            <Box mt={2}>
                <Paper>
                    <IconButton size="small" onClick={() => setShowAnswer(!showAnswer)}>
                        {showAnswer ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    <Typography component='span'>Reveal Answer</Typography>
                    <Collapse in={showAnswer}>
                        <Box p={2}>
                            { props.game.getAnswer(props.challenge).join(' ') }
                        </Box>
                    </Collapse>
                </Paper>
            </Box>
            <ul>
                <li>Word order doesn't matter</li>
                <li>For m/f nouns, only m is accepted for now</li>
                <li>If any macron is used, all macrons are checked</li>
                <li>If no macron is used, macrons are not checked</li>
                <li>Expand the words for hints</li>
            </ul>
        </React.Fragment>
    );
}

function getIndicatorRow(challenge: DeclensionChallenge): JSX.Element {
    const indicator = challenge.indicator;

    if (indicator instanceof Preposition || indicator instanceof Interjection) {
        return <WordRow word={indicator} />;
    } else if (indicator instanceof Pronoun) {
        return (
            <TableRow>
                <TableCell>Question</TableCell>
                <TableCell lang='la'>{indicator.decline(Genus.Masculine, challenge.casus, Numerus.Singular)}?</TableCell>
            </TableRow>
        );
    } else {
        return <React.Fragment />;
    }
}

function WordRow(props: {word: Word}) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    {props.word.type}
                </TableCell>
                <TableCell lang='la'>{props.word.lemma}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open} unmountOnExit>
                        <Box margin={1}>
                            <WordCard word={props.word} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
