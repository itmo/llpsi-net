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
import { checkNounDecl, findNoun, loadNouns } from './NounHelpers';

before(() => {
  loadNouns();
});

describe('Cons-declension', () => {
  it('basic -is male rule should decline correctly in singular', () => {
    const word = findNoun('canis');
    checkNounDecl(word, Numerus.Singular, {
      nominative: 'canis',
      accusative: 'canem',
      genitive:   'canis',
      dative:     'canī',
      ablative:   'cane',
      vocative:   'canis',
    });
  });

  it('basic -is male rule should decline correctly in plural', () => {
    const word = findNoun('canis');
    checkNounDecl(word, Numerus.Plural, {
      nominative: 'canēs',
      accusative: 'canēs',
      genitive:   'canum',
      dative:     'canibus',
      ablative:   'canibus',
      vocative:   'canēs',
    });
  });

  it('basic -is neuter rule should decline correctly in singular', () => {
    const word = findNoun('cor');
    checkNounDecl(word, Numerus.Singular, {
      nominative: 'cor',
      accusative: 'cor',
      genitive:   'cordis',
      dative:     'cordī',
      ablative:   'corde',
      vocative:   'cor',
    });
  });

  it('basic -is neuter rule should decline correctly in plural', () => {
    const word = findNoun('cor');
    checkNounDecl(word, Numerus.Plural, {
      nominative: 'corda',
      accusative: 'corda',
      genitive:   'cordum',
      dative:     'cordibus',
      ablative:   'cordibus',
      vocative:   'corda',
    });
  });
});
