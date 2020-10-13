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
import { WordDB } from '../../models/WordDB';
import { DeclensionGame } from '../../games/declension/DeclensionGame';
import { Box, Button, ButtonGroup, Collapse, FormControl, FormGroup, FormLabel, IconButton, Paper, Slider, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@material-ui/core';
import { DeclensionGameOptions } from '../../games/declension/DeclensionGameOptions';
import { DeclensionChallenge } from '../../games/declension/DeclensionChallenge';
import { getGrammarKnowledge } from '../../models/GrammarKnowledge';
import { Preposition } from '../../models/words/Preposition';
import { Pronoun } from '../../models/words/Pronoun';
import { Casus } from '../../models/types/Casus';
import { Numerus } from '../../models/types/Numerus';
import { Genus } from '../../models/types/Genus';
import { Word } from '../../models/words/Word';
import { WordCard } from '../words/WordCard';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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

    function onOptionsSet(opts: DeclensionGameOptions) {
        setOptions(old => Object.assign(old, opts));
        setChallenge(game.createChallenge(opts));
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
                    onDone={opts => onOptionsSet(opts)}
                />
            }
            { state == GameState.Game && challenge &&
                <Game game={game} challenge={challenge}
                    onNext={() => onNextGame()}
                    onCancel={() => onCancel()}
                />
            }
        </React.Fragment>
    );
}

interface OptionsProps {
    db: WordDB;
    initial: DeclensionGameOptions;
    onDone(options: DeclensionGameOptions): void;
}

function GameOptions(props: OptionsProps) {
    const [options, setOptions] = useState<DeclensionGameOptions>(props.initial);

    return (
        <Box p={1}>
            <form onSubmit={() => props.onDone(options)}>
                <FormGroup>
                    <FormControl margin='normal'>
                        <FormLabel>Vocabulary up to chapter</FormLabel>
                        <Slider
                            defaultValue={props.db.maxChapter}
                            valueLabelDisplay='on'
                            getAriaValueText={value => value.toString()}
                            step={1} min={1} max={props.db.maxChapter} marks
                            onChangeCommitted={(_, value) => setOptions(old => ({...old, vocabChapter: value as number}))}
                        />
                    </FormControl>
                    <FormControl margin='normal'>
                        <FormLabel>Grammar up to chapter</FormLabel>
                        <Slider
                            defaultValue={props.db.maxChapter}
                            valueLabelDisplay='on'
                            getAriaValueText={value => value.toString()}
                            step={1} min={1} max={props.db.maxChapter} marks
                            onChangeCommitted={(_, value) => setOptions(old => ({...old, knowledge: getGrammarKnowledge(value as number)}))}
                        />
                    </FormControl>
                </FormGroup>
                <Button type='submit' variant='contained' color='primary'>Start</Button>
            </form>
        </Box>
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
                    'Exclaim the answer (vocative).'
                }
                { challenge.indicator instanceof Preposition &&
                    'Decline including the preposition.'
                }
            </Typography>
            <Box mt={1} mb={1}>
                <TableContainer component={Paper}>
                    <Table size='small'>
                        <TableBody>
                            <TableRow>
                                <TableCell>Numerus</TableCell>
                                <TableCell>{challenge.number}</TableCell>
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
                            <TextField label='Entere answer here' variant='outlined'
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

    if (indicator instanceof Preposition) {
        return <WordRow word={indicator} />;
    } else if (indicator instanceof Pronoun) {
        return (
            <TableRow>
                <TableCell>Question</TableCell>
                <TableCell>{indicator.decline(Genus.Masculine, challenge.casus, Numerus.Singular)}?</TableCell>
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
                <TableCell>{props.word.lemma}</TableCell>
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
