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

import 'mocha';
import { loadDB } from './DBHelper';
import { DeclensionGame } from '../../src/games/declension/DeclensionGame';
import { WordDB } from '../../src/models/WordDB';
import { DeclensionChallenge } from '../../src/games/declension/DeclensionChallenge';
import { Numerus } from '../../src/models/types/Numerus';
import { expect } from 'chai';
import { Word } from '../../src/models/words/Word';
import { Pronoun } from '../../src/models/words/Pronoun';
import { Casus } from '../../src/models/types/Casus';
import { Genus } from '../../src/models/types/Genus';
import { Adjective } from '../../src/models/words/Adjective';
import { Noun } from '../../src/models/words/Noun';

let game: DeclensionGame;
let db: WordDB

function findWord<T extends Word>(words: T[], str: string): T {
    const word = words.find(w => w.lemma == str);
    if (!word) {
        throw Error(`Word ${str} not found`);
    }
    return word;
}

before(() => {
    db = loadDB();
    game = new DeclensionGame(db);
});

describe('Declension game', () => {
    it('accepts solutions macrons', () => {
        const challenge: DeclensionChallenge = {
            indicator: findWord<Pronoun>(db.pronouns, 'quis'),
            casus: Casus.Genitive,
            number: Numerus.Plural,
            genus: Genus.Femininum,
            words: [findWord<Noun>(db.nouns, 'puella'), findWord<Adjective>(db.adjectives, 'parvus')],
        };

        expect(game.check(challenge, 'puellārum parvārum')).to.be.true;
        expect(game.check(challenge, 'parvārum puellārum')).to.be.true;

        expect(game.check(challenge, 'parvarum puellarum')).to.be.true;
        expect(game.check(challenge, 'puellarum parvarum')).to.be.true;

        expect(game.check(challenge, 'Parvarum puellarum')).to.be.true;
        expect(game.check(challenge, 'Puellarum parvarum')).to.be.true;

        expect(game.check(challenge, 'puellārum parvarum')).to.be.false;
    });
});
