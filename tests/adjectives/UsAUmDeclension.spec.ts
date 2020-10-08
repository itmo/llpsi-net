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

describe('Us-A-Um-declension', () => {
  it('basic rule should decline correctly in singular', () => {
    const word = findAdjective('longus');
    checkAdjDecl(word, Numerus.Singular, {
      nominative: ['longus',    'longa',    'longum'],
      accusative: ['longum',    'longam',   'longum'],
      genitive:   ['longī',     'longae',   'longī'],
      dative:     ['longō',     'longae',   'longō'],
      ablative:   ['longō',     'longā',    'longō'],
      vocative:   ['longe',     'longa',    'longum'],
    });
  });

  it('basic rule should decline correctly in plural', () => {
    const word = findAdjective('longus');
    checkAdjDecl(word, Numerus.Plural, {
      nominative: ['longī',     'longae',   'longa'],
      accusative: ['longōs',    'longās',   'longa'],
      genitive:   ['longōrum',  'longārum', 'longōrum'],
      dative:     ['longīs',    'longīs',   'longīs'],
      ablative:   ['longīs',    'longīs',   'longīs'],
      vocative:   ['longī',     'longae',   'longa'],
    });
  });

  it('-cher rule should decline correctly in singular', () => {
    const word = findAdjective('pulcher');
    checkAdjDecl(word, Numerus.Singular, {
      nominative: ['pulcher',   'pulchra',  'pulchrum'],
      accusative: ['pulchrum',  'pulchram', 'pulchrum'],
      genitive:   ['pulchrī',   'pulchrae', 'pulchrī'],
      dative:     ['pulchrō',   'pulchrae', 'pulchrō'],
      ablative:   ['pulchrō',   'pulchrā',  'pulchrō'],
      vocative:   ['pulcher',   'pulchra',  'pulchrum'],
    });
  });

  it('-cher rule should decline correctly in plural', () => {
    const word = findAdjective('pulcher');
    checkAdjDecl(word, Numerus.Plural, {
      nominative: ['pulchrī',       'pulchrae',     'pulchra'],
      accusative: ['pulchrōs',      'pulchrās',     'pulchra'],
      genitive:   ['pulchrōrum',    'pulchrārum',   'pulchrōrum'],
      dative:     ['pulchrīs',      'pulchrīs',     'pulchrīs'],
      ablative:   ['pulchrīs',      'pulchrīs',     'pulchrīs'],
      vocative:   ['pulchrī',       'pulchrae',     'pulchra'],
    });
  });

  it('plurale tantum should decline correctly in plural', () => {
    const word = findAdjective('cēterī');
    checkAdjDecl(word, Numerus.Plural, {
      nominative: ['cēterī',       'cēterae',     'cētera'],
      accusative: ['cēterōs',      'cēterās',     'cētera'],
      genitive:   ['cēterōrum',    'cēterārum',   'cēterōrum'],
      dative:     ['cēterīs',      'cēterīs',     'cēterīs'],
      ablative:   ['cēterīs',      'cēterīs',     'cēterīs'],
      vocative:   ['cēterī',       'cēterae',     'cētera'],
    });
  });
});
