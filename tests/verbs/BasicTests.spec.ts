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
import {findVerb, loadVerbs} from './VerbHelpers';
import { expect } from 'chai';

before(() => {
    loadVerbs();
});

describe('Regular verbs', () => {
    it('basic conjugation should work', () => {
        const word = findVerb('habēre');
        const conj = word.conjugate();
        expect(conj.active.indicative?.present?.s3).deep.equals(['habet']);
    });

    it('irregular conjugation should work', () => {
        const word = findVerb('esse');
        const conj = word.conjugate();
        expect(conj.active.indicative?.present?.s3).deep.equals(['est']);
    });

    it('complex conjugation should work', () => {
        const word = findVerb('necesse esse');
        const conj = word.conjugate();
        expect(conj.active.indicative?.future?.s3).deep.equals(['necesse erit']);
    });
});
