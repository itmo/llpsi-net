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

import { Declension, DeclensionInput, DeclensionRule } from "./Declension";
import { dropSuffix } from "../common";
import { Casus } from "../types/Casus";
import { Genus } from "../types/Genus";
import { Numerus } from "../types/Numerus";

export class IMixedDeclension extends Declension {
    private data: DeclensionInput;
    private stem_: string;

    public constructor(data: DeclensionInput) {
        super(data.overrides);
        this.data = data;
        this.stem_ = this.determineStem();
    }

    public get stem(): string {
        return this.stem_;
    }

    private determineStem(): string {
        if (this.data.genus == Genus.Neuter) {
            throw Error(`I-mixed-stem for neuter noun ${this.data.nominative}`);
        }

        const gen = this.data.genitiveConstruction;

        if (!gen.startsWith('-')) {
            if (!this.data.pluraleTantum) {
                if (gen.endsWith('is')) {
                    return dropSuffix(gen, 'is');
                }
            }
        } else {
            if (!this.data.pluraleTantum) {
                return Declension.applyStemRule(this.data.nominative, this.data.genitiveConstruction, IMixedRulesSingular)
            } else {
                return Declension.applyStemRule(this.data.nominative, this.data.genitiveConstruction, IMixedRulesPlural)
            }
        }

        throw Error(`Couldn't determine I-mixed-stem for ${this.data.nominative}, ${gen}`);
    }

    protected buildDeclension(casus: Casus, numerus: Numerus): string | null {
        switch (numerus) {
            case Numerus.Singular:
                return this.declineSingularMF(casus);
            case Numerus.Plural:
                return this.declinePluralMF(casus);
        }
    }

    private declineSingularMF(casus: Casus): string | null {
        if (this.data.pluraleTantum) {
            return null;
        }

        const nom = this.data.nominative;

        switch (casus) {
            case Casus.Nominative:  return nom;
            case Casus.Accusative:  return this.stem + 'em';
            case Casus.Genitive:    return this.stem + 'is';
            case Casus.Dative:      return this.stem + 'ī';
            case Casus.Ablative:    return this.stem + 'e';
            case Casus.Vocative:    return nom;
        }
    }

    private declinePluralMF(casus: Casus): string | null {
        let nominative: string;
        if (this.data.pluraleTantum) {
            nominative = this.data.nominative;
        } else {
            nominative = this.stem + 'ēs';
        }

        switch (casus) {
            case Casus.Nominative:  return nominative;
            case Casus.Accusative:  return this.stem + 'ēs';
            case Casus.Genitive:    return this.stem + 'ium';
            case Casus.Dative:      return this.stem + 'ibus';
            case Casus.Ablative:    return this.stem + 'ibus';
            case Casus.Vocative:    return nominative;
        }
    }
}

export const IMixedRulesPlural: DeclensionRule[] = [
    {
        construction: '-ium',
        nominativeEndings: [
            {when: 'ēs', changeTo: ''},
        ],
    }
];

export const IMixedRulesSingular: DeclensionRule[] = [
    {
        construction: '-is',
        nominativeEndings: [
            {when: 'is', changeTo: ''},
            {when: 'ēs', changeTo: ''},
        ]
    },
    {
        construction: '-antis',
        nominativeEndings: [
            {when: 'āns', changeTo: 'ant'}
        ]
    },
    {
        construction: '-entis',
        nominativeEndings: [
            {when: 'ēns', changeTo: 'ent'}
        ]
    },
    {
        construction: '-ontis',
        nominativeEndings: [
            {when: 'ōns', changeTo: 'ont'}
        ]
    },
    {
        construction: '-rtis',
        nominativeEndings: [
            {when: 'rs', changeTo: 'rt'}
        ]
    },
    {
        construction: '-tris',
        nominativeEndings: [
            {when: 'ter', changeTo: 'tr'}
        ]
    },
    {
        construction: '-bis',
        nominativeEndings: [
            {when: 'bs', changeTo: 'b'}
        ]
    },
    {
        construction: '-cis',
        nominativeEndings: [
            {when: 'x', changeTo: 'c'},
        ]
    },
];

