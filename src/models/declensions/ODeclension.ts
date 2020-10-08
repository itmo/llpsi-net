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

export class ODeclension extends Declension {
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
                if (gen.endsWith('ōrum')) {
                    return dropSuffix(gen, 'ōrum');
                }
            } else {
                if (gen.endsWith('ī')) {
                    return dropSuffix(gen, 'ī');
                }
            }
        } else {
            if (this.data.pluraleTantum) {
                return Declension.applyStemRule(this.data.nominative, this.data.genitiveConstruction, ORulesPlural);
            } else {
                return Declension.applyStemRule(this.data.nominative, this.data.genitiveConstruction, ORulesSingular);
            }
        }

        throw Error(`Couldn't determine O-stem for ${this.data.nominative}, ${gen}`);
    }

    public decline(casus: Casus, numerus: Numerus): string | null {
        const ovr = this.getOverride(this.data.overrides, casus, numerus);
        if (ovr) {
            return ovr;
        }

        switch (numerus) {
            case Numerus.Singular:
                return this.declineSingular(casus);
            case Numerus.Plural:
                if (this.data.genus == Genus.Neuter) {
                    return this.declinePluralN(casus);
                } else {
                    return this.declinePluralMF(casus);
                }
        }
    }

    private declineSingular(casus: Casus): string | null {
        if (this.data.pluraleTantum) {
            return null;
        }

        const nom = this.data.nominative;

        let genitive, dative;
        if (this.data.genitiveIus) {
            genitive = this.stem + 'ius';
            dative = this.stem + 'ī';
        } else {
            genitive = this.stem + 'ī';
            dative = this.stem + 'ō';
        }

        switch (casus) {
            case Casus.Nominative:  return nom;
            case Casus.Accusative:  return this.stem + 'um';
            case Casus.Genitive:    return genitive;
            case Casus.Dative:      return dative;
            case Casus.Ablative:    return this.stem + 'ō';
            case Casus.Vocative:
                if (nom.endsWith('ius')) {
                    return this.stem + 'ī';
                } else if (nom.endsWith('us')) {
                    return this.stem + 'e';
                } else {
                    return nom;
                }
        }
    }

    private declinePluralMF(casus: Casus): string | null {
        let nominative: string;
        if (this.data.pluraleTantum) {
            nominative = this.data.nominative;
        } else {
            nominative = this.stem + 'ī';
        }

        switch (casus) {
            case Casus.Nominative:  return nominative;
            case Casus.Accusative:  return this.stem + 'ōs';
            case Casus.Genitive:    return this.stem + 'ōrum';
            case Casus.Dative:      return this.stem + 'īs';
            case Casus.Ablative:    return this.stem + 'īs';
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
            case Casus.Genitive:    return this.stem + 'ōrum';
            case Casus.Dative:      return this.stem + 'īs';
            case Casus.Ablative:    return this.stem + 'īs';
            case Casus.Vocative:    return nominative;
        }
    }    
}

const ORulesPlural: DeclensionRule[] = [
    {
        construction: '-ōrum',
        nominativeEndings: [
            {when: 'ī', changeTo: ''},
            {when: 'a', changeTo: ''},
        ],
    },
];

const ORulesSingular: DeclensionRule[] = [
    {
        construction: '-ī',
        nominativeEndings: [
            {when: 'us', changeTo: ''},
            {when: 'um', changeTo: ''},
            {when: '', changeTo: ''},
        ],
    },
    {
        construction: '-erī',
        nominativeEndings: [
            {when: 'er', changeTo: 'er'},
        ],
    },
    {
        construction: '-trī',
        nominativeEndings: [
            {when: 'ter', changeTo: 'tr'},
        ],
    },
    {
        construction: '-brī',
        nominativeEndings: [
            {when: 'ber', changeTo: 'br'},
        ],
    },
    {
        construction: '-grī',
        nominativeEndings: [
            {when: 'ger', changeTo: 'gr'},
        ],
    },
    {
        construction: '-chrī',
        nominativeEndings: [
            {when: 'cher', changeTo: 'chr'},
        ],
    },
];
    
