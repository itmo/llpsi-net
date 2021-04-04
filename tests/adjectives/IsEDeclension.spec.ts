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
import { Numerus } from '../../src/models/types/Numerus';
import { checkAdjDecl, findAdjective, loadAdjectives } from './AdjectiveHelpers';

before(() => {
    loadAdjectives();
});

describe('Is-E-declension', () => {
    it('basic rule should decline correctly in singular', () => {
        const word = findAdjective('brevis');
        checkAdjDecl(word, Numerus.Singular, {
            nominative: ['brevis', 'brevis', 'breve'],
            accusative: ['brevem', 'brevem', 'breve'],
            genitive:   ['brevis', 'brevis', 'brevis'],
            dative:     ['brevī',  'brevī',  'brevī'],
            ablative:   ['brevī',  'brevī',  'brevī'],
            vocative:   ['brevis', 'brevis', 'breve'],
        });
    });

    it('basic rule should decline correctly in plural', () => {
        const word = findAdjective('brevis');
        checkAdjDecl(word, Numerus.Plural, {
            nominative: ['brevēs',   'brevēs',   'brevia'],
            accusative: ['brevēs',   'brevēs',   'brevia'],
            genitive:   ['brevium',  'brevium',  'brevium'],
            dative:     ['brevibus', 'brevibus', 'brevibus'],
            ablative:   ['brevibus', 'brevibus', 'brevibus'],
            vocative:   ['brevēs',   'brevēs',   'brevia'],
        });
    });

    it('-ns rule should decline correctly in singular', () => {
        const word = findAdjective('absēns');
        checkAdjDecl(word, Numerus.Singular, {
            nominative: ['absēns',      'absēns',   'absēns'],
            accusative: ['absentem',    'absentem', 'absēns'],
            genitive:   ['absentis',    'absentis', 'absentis'],
            dative:     ['absentī',     'absentī',  'absentī'],
            ablative:   ['absentī',     'absentī',  'absentī'],
            vocative:   ['absēns',      'absēns',   'absēns'],
        });
    });

    it('-ns rule should decline correctly in plural', () => {
        const word = findAdjective('absēns');
        checkAdjDecl(word, Numerus.Plural, {
            nominative: ['absentēs',    'absentēs',     'absentia'],
            accusative: ['absentēs',    'absentēs',     'absentia'],
            genitive:   ['absentium',   'absentium',    'absentium'],
            dative:     ['absentibus',  'absentibus',   'absentibus'],
            ablative:   ['absentibus',  'absentibus',   'absentibus'],
            vocative:   ['absentēs',    'absentēs',     'absentia'],
        });
    });

    it('comparative adjective should decline correctly', () => {
        const word = findAdjective('melior');
        checkAdjDecl(word, Numerus.Singular, {
            nominative: ['melior',      'melior',   'melius'],
            accusative: ['meliōrem',    'meliōrem', 'melius'],
            genitive:   ['meliōris',    'meliōris', 'meliōris'],
            dative:     ['meliōrī',     'meliōrī',  'meliōrī'],
            ablative:   ['meliōre',     'meliōre',  'meliōre'],
            vocative:   ['melior',      'melior',   'melius'],
        });

        checkAdjDecl(word, Numerus.Plural, {
            nominative: ['meliōrēs',    'meliōrēs',   'meliōra'],
            accusative: ['meliōrēs',    'meliōrēs',   'meliōra'],
            genitive:   ['meliōrum',    'meliōrum',   'meliōrum'],
            dative:     ['meliōribus',  'meliōribus', 'meliōribus'],
            ablative:   ['meliōribus',  'meliōribus', 'meliōribus'],
            vocative:   ['meliōrēs',    'meliōrēs',   'meliōra'],
        });
    });


    it('one termination adjective ferōx should decline correctly', () => {
        const word = findAdjective('ferōx');
        checkAdjDecl(word, Numerus.Singular, {
            nominative: ['ferōx',      'ferōx',   'ferōx'],
            accusative: ['ferōcem',    'ferōcem', 'ferōx'],
            genitive:   ['ferōcis',    'ferōcis', 'ferōcis'],
            dative:     ['ferōcī',     'ferōcī',  'ferōcī'],
            ablative:   ['ferōcī',     'ferōcī',  'ferōcī'],
            vocative:   ['ferōx',      'ferōx',   'ferōx'],
        });

        checkAdjDecl(word, Numerus.Plural, {
            nominative: ['ferōcēs',    'ferōcēs',   'ferōcia'],
            accusative: ['ferōcēs',    'ferōcēs',   'ferōcia'],
            genitive:   ['ferōcium',   'ferōcium',  'ferōcium'],
            dative:     ['ferōcibus',  'ferōcibus', 'ferōcibus'],
            ablative:   ['ferōcibus',  'ferōcibus', 'ferōcibus'],
            vocative:   ['ferōcēs',    'ferōcēs',   'ferōcia'],
        });
    });

    it('one termination adjective dīves should decline correctly', () => {
        const word = findAdjective('dīves');
        checkAdjDecl(word, Numerus.Singular, {
            nominative: ['dīves',      'dīves',   'dīves'],
            accusative: ['dīvitem',    'dīvitem', 'dīves'],
            genitive:   ['dīvitis',    'dīvitis', 'dīvitis'],
            dative:     ['dīvitī',     'dīvitī',  'dīvitī'],
            ablative:   ['dīvite',     'dīvite',  'dīvite'],
            vocative:   ['dīves',      'dīves',   'dīves'],
        });

        checkAdjDecl(word, Numerus.Plural, {
            nominative: ['dīvitēs',    'dīvitēs',   'dīvita'],
            accusative: ['dīvitēs',    'dīvitēs',   'dīvita'],
            genitive:   ['dīvitum',    'dīvitum',   'dīvitum'],
            dative:     ['dīvitibus',  'dīvitibus', 'dīvitibus'],
            ablative:   ['dīvitibus',  'dīvitibus', 'dīvitibus'],
            vocative:   ['dīvitēs',    'dīvitēs',   'dīvita'],
        });
    });

    it('one termination adjective pauper should decline correctly', () => {
        const word = findAdjective('pauper');
        checkAdjDecl(word, Numerus.Singular, {
            nominative: ['pauper',      'pauper',   'pauper'],
            accusative: ['pauperem',    'pauperem', 'pauper'],
            genitive:   ['pauperis',    'pauperis', 'pauperis'],
            dative:     ['pauperī',     'pauperī',  'pauperī'],
            ablative:   ['paupere',     'paupere',  'paupere'],
            vocative:   ['pauper',      'pauper',   'pauper'],
        });

        checkAdjDecl(word, Numerus.Plural, {
            nominative: ['pauperēs',    'pauperēs',   'paupera'],
            accusative: ['pauperēs',    'pauperēs',   'paupera'],
            genitive:   ['pauperum',    'pauperum',   'pauperum'],
            dative:     ['pauperibus',  'pauperibus', 'pauperibus'],
            ablative:   ['pauperibus',  'pauperibus', 'pauperibus'],
            vocative:   ['pauperēs',    'pauperēs',   'paupera'],
        });
    });

    it('one termination adjective plūrēs should decline correctly', () => {
        const word = findAdjective('plūrēs');
        checkAdjDecl(word, Numerus.Plural, {
            nominative: ['plūrēs',    'plūrēs',   'plūra'],
            accusative: ['plūrēs',    'plūrēs',   'plūra'],
            genitive:   ['plūrium',   'plūrium',  'plūrium'],
            dative:     ['plūribus',  'plūribus', 'plūribus'],
            ablative:   ['plūribus',  'plūribus', 'plūribus'],
            vocative:   ['plūrēs',    'plūrēs',   'plūra'],
        });
    });
});
