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
    it('accepts solutions without macrons', () => {
        const challenge: DeclensionChallenge = {
            preposition: findWord(db.prepositions, 'dē'),
            noun: findWord(db.nouns, 'fīlius'),
            adjective: findWord(db.adjectives, 'parvus'),
            number: Numerus.Singular
        }

        expect(game.check(challenge, 'de filio parvo', false)).to.be.true
        expect(game.check(challenge, 'de parvo filio', false)).to.be.true
        expect(game.check(challenge, 'de filium parvo', false)).to.be.false
    });
});
