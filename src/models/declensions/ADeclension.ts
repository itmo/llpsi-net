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
import { Numerus } from "../types/Numerus";

export class ADeclension extends Declension {
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
        const nom = this.data.nominative;
        const gen = this.data.genitiveConstruction;

        if (this.data.pluraleTantum) {
            switch (gen) {
                case '-ārum':
                    if (nom.endsWith('ae')) {
                        return dropSuffix(nom, 'ae');
                    }
            }
        } else {
            switch (gen) {
                case '-ae':
                    if (nom.endsWith('a')) {
                        return dropSuffix(nom, 'a');
                    }
                    break;
            }
        }
        throw Error(`Couldn't determine A-stem for ${nom}, ${gen}`);
    }

    protected buildDeclension(casus: Casus, numerus: Numerus): string | null {
        switch (numerus) {
            case Numerus.Singular:  return this.declineSingular(casus);
            case Numerus.Plural:    return this.declinePlural(casus);
        }
    }

    private declineSingular(casus: Casus): string | null {
        if (this.data.pluraleTantum) {
            return null;
        }

        let genitive, dative;
        if (this.data.genitiveIus) {
            genitive = this.stem + 'ius';
            dative = this.stem + 'ī';
        } else {
            genitive = this.stem + 'ae';
            dative = this.stem + 'ae';
        }

        switch (casus) {
            case Casus.Nominative:  return this.data.nominative;
            case Casus.Accusative:  return this.stem + 'am';
            case Casus.Genitive:    return genitive;
            case Casus.Dative:      return dative;
            case Casus.Ablative:    return this.stem + 'ā';
            case Casus.Vocative:    return this.data.nominative;
        }
    }

    private declinePlural(casus: Casus): string | null {
        let nominative: string;
        if (this.data.pluraleTantum) {
            nominative = this.data.nominative;
        } else {
            nominative = this.stem + 'ae';
        }

        switch (casus) {
            case Casus.Nominative:  return nominative;
            case Casus.Accusative:  return this.stem + 'ās';
            case Casus.Genitive:    return this.stem + 'ārum';
            case Casus.Dative:      return this.stem + 'īs';
            case Casus.Ablative:    return this.stem + 'īs';
            case Casus.Vocative:    return nominative;
        }
    }    
}
