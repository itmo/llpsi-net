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
import { changeSuffix, dropSuffix } from "../common";
import { Casus } from "../types/Casus";
import { Genus } from "../types/Genus";
import { Numerus } from "../types/Numerus";

export class ConsDeclension extends Declension {
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

        if (!gen.startsWith('-')) {
            if (this.data.pluraleTantum) {
            } else {
                if (gen.endsWith('is')) {
                    return dropSuffix(gen, 'is');
                } else if (gen.endsWith('ior')) {
                    return changeSuffix(gen, 'ior', 'iōr');
                } else if (gen.endsWith('ius')) {
                    return changeSuffix(gen, 'ius', 'iōr');
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
            {when: 'ēs', changeTo: ''},
            {when: 'a', changeTo: ''},
        ],
    },
    {
        construction: '-ium',
        nominativeEndings: [
            {when: 'ēs', changeTo: ''},
            {when: 'a',  changeTo: ''},
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
            {when: 'us', changeTo: 'ōr'},
            {when: 'or', changeTo: 'ōr'},
            {when: 'ōs', changeTo: 'ōr'},
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
            {when: 'er', changeTo: 'er'},
            {when: 'ūr', changeTo: 'ūr'},
        ]
    },
    {
        construction: '-mis',
        nominativeEndings: [
            {when: 'ms', changeTo: 'm'},
        ]
    },
    {
        construction: '-īcis',
        nominativeEndings: [
            {when: 'īx', changeTo: 'īc'},
        ]
    },
    {
        construction: '-ātis',
        nominativeEndings: [
            {when: 'ās', changeTo: 'āt'},
        ]
    },
    {
        construction: '-ūtis',
        nominativeEndings: [
            {when: 'ūs', changeTo: 'ūt'},
        ]
    },
    {
        construction: '-etis',
        nominativeEndings: [
            {when: 'ēs', changeTo: 'et'},
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
        construction: '-iugis',
        nominativeEndings: [
            {when: 'iūnx', changeTo: 'iug'}
        ]
    },
    {
        construction: '-antis',
        nominativeEndings: [
            {when: 'āns', changeTo: 'ant'},
        ]
    },
    {
        construction: '-atis',
        nominativeEndings: [
            {when: 'a', changeTo: 'at'},
        ]
    },
    {
        construction: '-entis',
        nominativeEndings: [
            {when: 'ēns', changeTo: 'ent'},
        ]
    },
    {
        construction: '-egis',
        nominativeEndings: [
            {when: 'ex', changeTo: 'eg'},
        ]
    },
    {
        construction: '-eris',
        nominativeEndings: [
            {when: 'er', changeTo: 'er'},
            {when: 'us', changeTo: 'er'},
        ]
    },
    {
        construction: '-ēdis',
        nominativeEndings: [
            {when: 'ēs', changeTo: 'ēd'},
        ]
    },
    {
        construction: '-ūris',
        nominativeEndings: [
            {when: 'ūs', changeTo: 'ūr'}
        ]
    },
    {
        construction: '-uris',
        nominativeEndings: [
            {when: 'ur', changeTo: 'ur'}
        ]
    },
    {
        construction: '-tris',
        nominativeEndings: [
            {when: 'ter', changeTo: 'tr'}
        ]
    },
    {
        construction: '-bris',
        nominativeEndings: [
            {when: 'ber', changeTo: 'br'},
        ]
    },
    {
        construction: '-or',
        nominativeEndings: [
            {when: 'ior', changeTo: 'iōr'},
            {when: 'ius', changeTo: 'iōr'},
            {when: 'or', changeTo: 'ōr'},
            {when: 'us', changeTo: 'ōr'},
        ]
    },
    {
        construction: '-es',
        nominativeEndings: [
            {when: 'es', changeTo: 'it'},
        ]
    },
    {
        construction: '-ipis',
        nominativeEndings: [
            {when: 'eps', changeTo: 'ip'},
        ]
    },
];
