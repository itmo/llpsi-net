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

export class ConsDeclension extends Declension {
    private data: DeclensionInput;
    private stem_: string;

    public constructor(data: DeclensionInput) {
        super();
        this.data = data;
        this.stem_ = this.determineStem();
    }

    public get stem(): string {
        return this.stem_;
    }

    private determineStem(): string {
        const gen = this.data.genitiveConstruction;

        if (!gen.startsWith('-')) {
            if (this.data.pluraleTantum) {
                if (gen.endsWith('ium')) {
                    return dropSuffix(gen, 'ium');
                } else if (gen.endsWith('um')) {
                    return dropSuffix(gen, 'um');
                }
            } else {
                if (gen.endsWith('is')) {
                    return dropSuffix(gen, 'is');
                }
            }
        } else {
            if (this.data.pluraleTantum) {
                return Declension.applyStemRule(this.data.nominative, this.data.genitiveConstruction, ConsRulesPlural)
            } else {
                return Declension.applyStemRule(this.data.nominative, this.data.genitiveConstruction, ConsRulesSingular)
            }
        }

        throw Error(`Couldn't determine Cons-stem for ${this.data.nominative}, ${gen}`);
    }

    public decline(casus: Casus, numerus: Numerus): string | null {
        switch (numerus) {
            case Numerus.Singular:
                if (this.data.genus == Genus.Neuter) {
                    return this.declineSingularN(casus);
                } else {
                    return this.declineSingularMF(casus);
                }
            case Numerus.Plural:
                if (this.data.genus == Genus.Neuter) {
                    return this.declinePluralN(casus);
                } else {
                    return this.declinePluralMF(casus);
                }
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

    private declineSingularN(casus: Casus): string | null {
        if (this.data.pluraleTantum) {
            return null;
        }

        const nom = this.data.nominative;

        switch (casus) {
            case Casus.Nominative:  return nom;
            case Casus.Accusative:  return nom;
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
            case Casus.Genitive:    return this.stem + 'um';
            case Casus.Dative:      return this.stem + 'ibus';
            case Casus.Ablative:    return this.stem + 'ibus';
            case Casus.Vocative:    return nominative;
        }
    }    

    private declinePluralN(casus: Casus): string | null {
        let nominative: string;
        if (this.data.pluraleTantum) {
            nominative = this.data.nominative;
        } else {
            nominative = this.stem + 'a';
        }

        switch (casus) {
            case Casus.Nominative:  return nominative;
            case Casus.Accusative:  return this.stem + 'a';
            case Casus.Genitive:    return this.stem + 'um';
            case Casus.Dative:      return this.stem + 'ibus';
            case Casus.Ablative:    return this.stem + 'ibus';
            case Casus.Vocative:    return nominative;
        }
    }    
}

export const ConsRulesPlural: DeclensionRule[] = [
    {
        construction: '-um',
        nominativeEndings: [
            {when: 'a', changeTo: ''}
        ],
    }
];

export const ConsRulesSingular: DeclensionRule[] = [
    {
        construction: '-oris',
        nominativeEndings: [
            {when: 'or', changeTo: 'or'},
            {when: 'us', changeTo: 'or'},
            {when: 'ur', changeTo: 'or'},
        ]
    },
    {
        construction: '-ōris',
        nominativeEndings: [
            {when: 'or', changeTo: 'ōr'},
        ]
    },
    {
        construction: '-ōnis',
        nominativeEndings: [
            {when: 'ō', changeTo: 'ōn'},
        ]
    },
    {
        construction: '-is',
        nominativeEndings: [
            {when: 'is', changeTo: ''},
            {when: '', changeTo: ''},
        ]
    },
    {
        construction: '-itis',
        nominativeEndings: [
            {when: 'ut', changeTo: 'it'},
            {when: 'es', changeTo: 'it'},
        ]
    },
    {
        construction: '-inis',
        nominativeEndings: [
            {when: 'en', changeTo: 'in'},
            {when: 'ō', changeTo: 'in'},
            {when: 'is', changeTo: 'in'}
        ]
    },
    {
        construction: '-ūris',
        nominativeEndings: [
            {when: 'ūs', changeTo: 'ūr'}
        ]
    },
    {
        construction: '-tris',
        nominativeEndings: [
            {when: 'ter', changeTo: 'tr'}
        ]
    },
];