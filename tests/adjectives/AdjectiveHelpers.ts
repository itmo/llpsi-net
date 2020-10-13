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
import { Genus } from '../../src/models/types/Genus';
import { Numerus } from '../../src/models/types/Numerus';
import { WordType } from '../../src/models/types/WordType';
import { Adjective } from '../../src/models/words/Adjective';

type AdjEntry = (string | null);

export interface AdjTable {
    nominative: AdjEntry[];
    accusative: AdjEntry[];
    genitive: AdjEntry[];
    dative: AdjEntry[];
    ablative: AdjEntry[];
    vocative: AdjEntry[];
}

export function checkAdjDecl(adj: Adjective, numerus: Numerus, data: AdjTable) {
    const genus = [Genus.Masculine, Genus.Femininum, Genus.Neuter];
    for (let i = 0; i < 3; i++) {
        expect(adj.decline(genus[i], Casus.Nominative, numerus)).equals(data.nominative[i], 'nominative');
        expect(adj.decline(genus[i], Casus.Accusative, numerus)).equals(data.accusative[i], 'accusative');
        expect(adj.decline(genus[i], Casus.Genitive, numerus)).equals(data.genitive[i], 'genitive');
        expect(adj.decline(genus[i], Casus.Dative, numerus)).equals(data.dative[i], 'dative');
        expect(adj.decline(genus[i], Casus.Ablative, numerus)).equals(data.ablative[i], 'ablative');
        expect(adj.decline(genus[i], Casus.Vocative, numerus)).equals(data.vocative[i], 'vocative');
    }
}

const adjs: Adjective[] = [];

export function loadAdjectives() {
    const data = require('../../data/LLPSI.json');
    for (const entry of data) {
        switch (entry.wordType) {
            case WordType.Adjective:
                const noun = new Adjective(entry);
                adjs.push(noun);
                break;
        }
    }
}

export function findAdjective(lemma: string): Adjective {
    for (const adj of adjs) {
        if (adj.lemma == lemma) {
            return adj;
        }
    }
    throw Error(`Adjective ${lemma} not found`);
}
