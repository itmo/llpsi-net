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

describe('U-declension', () => {
  it('-us rule should decline correctly in singular', () => {
    const word = findNoun('manus');
    checkNounDecl(word, Numerus.Singular, {
      nominative: 'manus',
      accusative: 'manum',
      genitive:   'manūs',
      dative:     'manuī',
      ablative:   'manū',
      vocative:   'manus',
    });
  });

  it('-is neuter rule should decline correctly in plural', () => {
    const word = findNoun('manus');
    checkNounDecl(word, Numerus.Plural, {
      nominative: 'manūs',
      accusative: 'manūs',
      genitive:   'manuum',
      dative:     'manibus',
      ablative:   'manibus',
      vocative:   'manūs',
    });
  });
});
