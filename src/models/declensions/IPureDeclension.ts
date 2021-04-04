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
import { Casus } from "../types/Casus";
import { Genus } from "../types/Genus";
import { Numerus } from "../types/Numerus";

export class IPureDeclension extends Declension {
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
        const gen = this.data.genitiveConstruction;

        if (gen.startsWith('-')) {
            if (!this.data.pluraleTantum) {
                return Declension.applyStemRule(this.data.nominative, this.data.genitiveConstruction, IPureRulesSingular)
            } else {
                return Declension.applyStemRule(this.data.nominative, this.data.genitiveConstruction, IPureRulesPlural)
            }
        }

        throw Error(`Couldn't determine I-pure-stem for ${this.data.nominative}, ${gen}`);
    }

    protected buildDeclension(casus: Casus, numerus: Numerus): string | null {
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
        let ablative: string;
        if (this.data.ablativeI) {
            ablative = this.stem + 'ī';
        } else {
            ablative = this.stem + 'e';
        }

        switch (casus) {
            case Casus.Nominative:  return nom;
            case Casus.Accusative:  return this.stem + 'em';
            case Casus.Genitive:    return this.stem + 'is';
            case Casus.Dative:      return this.stem + 'ī';
            case Casus.Ablative:    return ablative;
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
            case Casus.Ablative:    return this.stem + 'ī';
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

    private declinePluralN(casus: Casus): string | null {
        let nominative: string;
        if (this.data.pluraleTantum) {
            nominative = this.data.nominative;
        } else {
            nominative = this.stem + 'ia';
        }

        switch (casus) {
            case Casus.Nominative:  return nominative;
            case Casus.Accusative:  return nominative;
            case Casus.Genitive:    return this.stem + 'ium';
            case Casus.Dative:      return this.stem + 'ibus';
            case Casus.Ablative:    return this.stem + 'ibus';
            case Casus.Vocative:    return nominative;
        }
    }
}

export const IPureRulesPlural: DeclensionRule[] = [
    {
        construction: '-ium',
        nominativeEndings: [
            {when: 'ēs', changeTo: ''},
            {when: 'a', changeTo: ''},
        ],
    }
];

export const IPureRulesSingular: DeclensionRule[] = [
    {
        construction: '-ālis',
        nominativeEndings: [
            {when: 'al', changeTo: 'āl'},
        ]
    },
    {
        construction: '-is',
        nominativeEndings: [
            {when: 'is', changeTo: ''},
            {when: 'e', changeTo: ''},
        ]
    },
    {
        construction: '-ns',
        nominativeEndings: [
            {when: 'ēns', changeTo: 'ent'},
        ]
    },
    {
        construction: '-ōcis',
        nominativeEndings: [
            {when: 'ōx', changeTo: 'ōc'},
        ]
    },
];
