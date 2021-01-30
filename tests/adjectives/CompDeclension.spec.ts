/*
 *   LLPSI.net - Learning platform for Lingua Latina per se illustrata
 *   Copyright (C) 2021 Folke Will <folko@solhost.org>
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
import { Numerus } from '../../src/models/types/Numerus';
import { checkAdjDecl, findAdjective, loadAdjectives } from './AdjectiveHelpers';

before(() => {
    loadAdjectives();
});

describe('Comparative-declension', () => {
    it('basic rule should decline correctly in singular', () => {
        const word = findAdjective('posterior');
        checkAdjDecl(word, Numerus.Singular, {
            nominative: ['posterior',   'posterior',   'posterius'],
            accusative: ['posteriōrem', 'posteriōrem', 'posterius'],
            genitive:   ['posteriōris', 'posteriōris', 'posteriōris'],
            dative:     ['posteriōrī',  'posteriōrī',  'posteriōrī'],
            ablative:   ['posteriōre',  'posteriōre',  'posteriōre'],
            vocative:   ['posterior',   'posterior',   'posterius'],
        });
    });

    it('basic rule should decline correctly in plural', () => {
        const word = findAdjective('posterior');
        checkAdjDecl(word, Numerus.Plural, {
            nominative: ['posteriōrēs',     'posteriōrēs',      'posteriōra'],
            accusative: ['posteriōrēs',     'posteriōrēs',      'posteriōra'],
            genitive:   ['posteriōrum',     'posteriōrum',      'posteriōrum'],
            dative:     ['posteriōribus',   'posteriōribus',    'posteriōribus'],
            ablative:   ['posteriōribus',   'posteriōribus',    'posteriōribus'],
            vocative:   ['posteriōrēs',     'posteriōrēs',      'posteriōra'],
        });
    });
});
