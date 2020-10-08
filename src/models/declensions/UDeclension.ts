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

import { Declension, DeclensionInput } from "./Declension";
import { dropSuffix } from "../common";
import { Casus } from "../types/Casus";
import { Genus } from "../types/Genus";
import { Numerus } from "../types/Numerus";

export class UDeclension extends Declension {
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
        const nom = this.data.nominative;
        const gen = this.data.genitiveConstruction;

        if (!this.data.pluraleTantum) {
            if (nom.endsWith('us') && gen == '-ūs') {
                return dropSuffix(nom, 'us');
            }
        }

        throw Error(`Couldn't determine U-stem for ${nom}, ${gen}`);
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

        switch (casus) {
            case Casus.Nominative:  return this.data.nominative;
            case Casus.Accusative:  return this.stem + 'um';
            case Casus.Genitive:    return this.stem + 'ūs';
            case Casus.Dative:      return this.stem + 'uī';
            case Casus.Ablative:    return this.stem + 'ū';
            case Casus.Vocative:    return this.data.nominative;
        }
    }

    private declinePluralMF(casus: Casus): string | null {
        let nominative: string;
        if (this.data.pluraleTantum) {
            nominative = this.data.nominative;
        } else {
            nominative = this.stem + 'ūs';
        }

        switch (casus) {
            case Casus.Nominative:  return nominative;
            case Casus.Accusative:  return this.stem + 'ūs';
            case Casus.Genitive:    return this.stem + 'uum';
            case Casus.Dative:      return this.stem + 'ibus';
            case Casus.Ablative:    return this.stem + 'ibus';
            case Casus.Vocative:    return nominative;
        }
    }    

    private declineSingularN(casus: Casus): string | null {
        if (this.data.pluraleTantum) {
            return null;
        }

        switch (casus) {
            case Casus.Nominative:  return this.data.nominative;
            case Casus.Accusative:  return this.data.nominative;
            case Casus.Genitive:    return this.stem + 'ūs';
            case Casus.Dative:      return this.stem + 'ū';
            case Casus.Ablative:    return this.stem + 'ū';
            case Casus.Vocative:    return this.data.nominative;
        }
    }

    private declinePluralN(casus: Casus): string | null {
        let nominative: string;
        if (this.data.pluraleTantum) {
            nominative = this.data.nominative;
        } else {
            nominative = this.stem + 'ua';
        }

        switch (casus) {
            case Casus.Nominative:  return nominative;
            case Casus.Accusative:  return nominative;
            case Casus.Genitive:    return this.stem + 'uum';
            case Casus.Dative:      return this.stem + 'ibus';
            case Casus.Ablative:    return this.stem + 'ibus';
            case Casus.Vocative:    return nominative;
        }
    }    
}
