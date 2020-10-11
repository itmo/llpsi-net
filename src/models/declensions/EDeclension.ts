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

export class EDeclension extends Declension {
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
        } else {
            switch (gen) {
                case '-ēī':
                    if (nom.endsWith('ēs')) {
                        return dropSuffix(nom, 'ēs');
                    }
                    break;
            }
        }
        throw Error(`Couldn't determine E-stem for ${nom}, ${gen}`);
    }

    protected buildDeclension(casus: Casus, numerus: Numerus): string | null {
        switch (numerus) {
            case Numerus.Singular:  return this.declineSingular(casus);
            case Numerus.Plural:    return this.declinePlural(casus);
        }
    }

    private declineSingular(casus: Casus): string | null {
        switch (casus) {
            case Casus.Nominative:  return this.data.nominative;
            case Casus.Accusative:  return this.stem + 'em';
            case Casus.Genitive:    return this.stem + 'ēī';
            case Casus.Dative:      return this.stem + 'ēī';
            case Casus.Ablative:    return this.stem + 'ē';
            case Casus.Vocative:    return this.data.nominative;
        }
    }

    private declinePlural(casus: Casus): string | null {
        switch (casus) {
            case Casus.Nominative:  return this.data.nominative;
            case Casus.Accusative:  return this.stem + 'ēs';
            case Casus.Genitive:    return this.stem + 'ērum';
            case Casus.Dative:      return this.stem + 'ēbus';
            case Casus.Ablative:    return this.stem + 'ēbus';
            case Casus.Vocative:    return this.data.nominative;
        }
    }    
}
