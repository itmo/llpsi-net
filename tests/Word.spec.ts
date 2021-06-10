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

import { expect } from 'chai';
import 'mocha';
import { findNoun, loadNouns } from './nouns/NounHelpers';
before(() => {
    loadNouns();
});

describe('word database', () => {
    it('should have correct lemma', () => {
        const word = findNoun('ōceanus');
        expect(word.lemma).equals('ōceanus');
    });

    it('should have correct chapter information', () => {
        const word = findNoun('ōceanus');
        expect(word.chapter).equals(1);
    });

    it('should have the correct German translation', () => {
        const word = findNoun('ōceanus');
        expect(word.german).equals('Ozean');
    });

    it('should have the correct English translation', () => {
        const word = findNoun('ōceanus');
        expect(word.english).equals('ocean');
    });

    it('should have the correct references', () => {
        const word = findNoun('ōceanus');
        expect(word.references).equals('1.53');
    });
    it('should find the highest chapter for this sentence' ()=>{
        const sentence="ego nihil est";
        //TBD test worddb.highestChapter(); here
    });
});
