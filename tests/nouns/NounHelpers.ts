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
import { Casus } from '../../src/models/types/Casus';
import { Numerus } from '../../src/models/types/Numerus';
import { WordType } from '../../src/models/types/WordType';
import { Noun } from '../../src/models/words/Noun';

export interface DeclTable {
    nominative: string | null;
    accusative: string | null;
    genitive: string | null;
    dative: string | null;
    ablative: string | null;
    vocative: string | null;
}

export function checkNounDecl(noun: Noun, numerus: Numerus, data: DeclTable) {
    expect(noun.decline(Casus.Nominative, numerus)).equals(data.nominative);
    expect(noun.decline(Casus.Accusative, numerus)).equals(data.accusative);
    expect(noun.decline(Casus.Genitive, numerus)).equals(data.genitive);
    expect(noun.decline(Casus.Dative, numerus)).equals(data.dative);
    expect(noun.decline(Casus.Ablative, numerus)).equals(data.ablative);
    expect(noun.decline(Casus.Vocative, numerus)).equals(data.vocative);
}

const nouns: Noun[] = [];

export function loadNouns() {
    const data = require('../../data/LLPSI.json');
    for (const entry of data) {
        switch (entry.wordType) {
            case WordType.Noun:
                const noun = new Noun(entry);
                nouns.push(noun);
                break;
        }
    }
}

export function findNoun(lemma: string): Noun {
    for (const noun of nouns) {
        if (noun.lemma == lemma) {
            return noun;
        }
    }
    throw Error(`Noun ${lemma} not found`);
}
