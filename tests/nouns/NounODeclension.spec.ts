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

describe('O-declension', () => {
  it('basic male rule should decline correctly in singular', () => {
    const word = findNoun('servus');
    checkNounDecl(word, Numerus.Singular, {
      nominative: 'servus',
      accusative: 'servum',
      genitive:   'servī',
      dative:     'servō',
      ablative:   'servō',
      vocative:   'serve',
    });
  });

  it('basic male rule should decline correctly in plural', () => {
    const word = findNoun('servus');
    checkNounDecl(word, Numerus.Plural, {
      nominative: 'servī',
      accusative: 'servōs',
      genitive:   'servōrum',
      dative:     'servīs',
      ablative:   'servīs',
      vocative:   'servī',
    });
  });

  it('basic neuter rule should decline correctly in singular', () => {
    const word = findNoun('oppidum');
    checkNounDecl(word, Numerus.Singular, {
      nominative: 'oppidum',
      accusative: 'oppidum',
      genitive:   'oppidī',
      dative:     'oppidō',
      ablative:   'oppidō',
      vocative:   'oppidum',
    });
  });

  it('basic neuter rule should decline correctly in plural', () => {
    const word = findNoun('oppidum');
    checkNounDecl(word, Numerus.Plural, {
      nominative: 'oppida',
      accusative: 'oppida',
      genitive:   'oppidōrum',
      dative:     'oppidīs',
      ablative:   'oppidīs',
      vocative:   'oppida',
    });
  });

  it('-er rule should decline correctly in singular', () => {
    const word = findNoun('puer');
    checkNounDecl(word, Numerus.Singular, {
      nominative: 'puer',
      accusative: 'puerum',
      genitive:   'puerī',
      dative:     'puerō',
      ablative:   'puerō',
      vocative:   'puer',
    });
  });

  it('-er rule should decline correctly in plural', () => {
    const word = findNoun('puer');
    checkNounDecl(word, Numerus.Plural, {
      nominative: 'puerī',
      accusative: 'puerōs',
      genitive:   'puerōrum',
      dative:     'puerīs',
      ablative:   'puerīs',
      vocative:   'puerī',
    });
  });

  it('plurale tantum male rule should decline correctly in singular', () => {
    const word = findNoun('līberī');
    checkNounDecl(word, Numerus.Singular, {
      nominative: null,
      accusative: null,
      genitive:   null,
      dative:     null,
      ablative:   null,
      vocative:   null,
    });
  });

  it('plurale tantum male rule should decline correctly in plural', () => {
    const word = findNoun('līberī');
    checkNounDecl(word, Numerus.Plural, {
      nominative: 'līberī',
      accusative: 'līberōs',
      genitive:   'līberōrum',
      dative:     'līberīs',
      ablative:   'līberīs',
      vocative:   'līberī',
    });
  });

  it('plurale tantum neuter rule should decline correctly in plural', () => {
    const word = findNoun('arma');
    checkNounDecl(word, Numerus.Plural, {
      nominative: 'arma',
      accusative: 'arma',
      genitive:   'armōrum',
      dative:     'armīs',
      ablative:   'armīs',
      vocative:   'arma',
    });
  });

  it('-ius vocative rule should decline correctly in singular', () => {
    const word = findNoun('fīlius');
    checkNounDecl(word, Numerus.Singular, {
      nominative: 'fīlius',
      accusative: 'fīlium',
      genitive:   'fīliī',
      dative:     'fīliō',
      ablative:   'fīliō',
      vocative:   'fīliī',
    });
  });
});
