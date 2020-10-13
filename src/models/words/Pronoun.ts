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

import { Word } from "./Word";
import { DeclensionOverrides, PronounData } from "../WordData";
import { Genus } from "../types/Genus";
import { Casus } from "../types/Casus";
import { Numerus } from "../types/Numerus";
import { Declension } from "../declensions/Declension";
import { IrregularDeclension } from "../declensions/IrregularDeclension";
import { AdjectiveDeclinable } from "../types/AdjectiveDeclinable";

export class Pronoun extends Word implements AdjectiveDeclinable {
    private maleDeclension: Declension;
    private femaleDeclension: Declension;
    private neuterDeclension: Declension;

    public constructor(data: PronounData) {
        super(data, `${data.latinMale}`);

        switch (data.latinMale) {
            case 'is':
                this.maleDeclension = new IrregularDeclension({genus: Genus.Masculine, overrides: IsEaIdM, nominative: '', genitiveConstruction: ''});
                this.femaleDeclension = new IrregularDeclension({genus: Genus.Femininum, overrides: IsEaIdF, nominative: '', genitiveConstruction: ''});
                this.neuterDeclension = new IrregularDeclension({genus: Genus.Neuter, overrides: IsEaIdN, nominative: '', genitiveConstruction: ''});
                break;
            case 'quis':
                this.maleDeclension = new IrregularDeclension({genus: Genus.Masculine, overrides: QuisM, nominative: '', genitiveConstruction: ''});
                this.femaleDeclension = new IrregularDeclension({genus: Genus.Femininum, overrides: QuisF, nominative: '', genitiveConstruction: ''});
                this.neuterDeclension = new IrregularDeclension({genus: Genus.Neuter, overrides: QuisN, nominative: '', genitiveConstruction: ''});
                break;
            case 'ille':
                this.maleDeclension = new IrregularDeclension({genus: Genus.Masculine, overrides: IlleIllaIlludM, nominative: '', genitiveConstruction: ''});
                this.femaleDeclension = new IrregularDeclension({genus: Genus.Femininum, overrides: IlleIllaIlludF, nominative: '', genitiveConstruction: ''});
                this.neuterDeclension = new IrregularDeclension({genus: Genus.Neuter, overrides: IlleIllaIlludN, nominative: '', genitiveConstruction: ''});
                break;
            case 'hic':
                this.maleDeclension = new IrregularDeclension({genus: Genus.Masculine, overrides: HicHaecHocM, nominative: '', genitiveConstruction: ''});
                this.femaleDeclension = new IrregularDeclension({genus: Genus.Femininum, overrides: HicHaecHocF, nominative: '', genitiveConstruction: ''});
                this.neuterDeclension = new IrregularDeclension({genus: Genus.Neuter, overrides: HicHaecHocN, nominative: '', genitiveConstruction: ''});
                break;
            case 'nēmō':
                this.maleDeclension = new IrregularDeclension({genus: Genus.Masculine, overrides: NemoMFN, nominative: '', genitiveConstruction: ''});
                this.femaleDeclension = new IrregularDeclension({genus: Genus.Femininum, overrides: NemoMFN, nominative: '', genitiveConstruction: ''});
                this.neuterDeclension = new IrregularDeclension({genus: Genus.Neuter, overrides: NemoMFN, nominative: '', genitiveConstruction: ''});
                break;
            default:
                throw Error(`No declension for ${data.latinMale}`);
        }
    }

    public decline(genus: Genus, casus: Casus, numerus: Numerus): string | null {
        switch (genus) {
            case Genus.Masculine: return this.maleDeclension.decline(casus, numerus);
            case Genus.Femininum: return this.femaleDeclension.decline(casus, numerus);
            case Genus.Neuter: return this.neuterDeclension.decline(casus, numerus);
        }
    }
}

const HicHaecHocM: DeclensionOverrides = {
    nomSg: 'hic',
    accSg: 'hunc',
    genSg: 'huius',
    datSg: 'huic',
    ablSg: 'hōc',
    vocSg: 'hic',

    nomPl: 'hī',
    accPl: 'hōs',
    genPl: 'hōrum',
    datPl: 'hīs',
    ablPl: 'hīs',
    vocPl: 'hī',
};

const HicHaecHocF: DeclensionOverrides = {
    nomSg: 'haec',
    accSg: 'hanc',
    genSg: 'huius',
    datSg: 'huic',
    ablSg: 'hāc',
    vocSg: 'haec',

    nomPl: 'hae',
    accPl: 'hās',
    genPl: 'hārum',
    datPl: 'hīs',
    ablPl: 'hīs',
    vocPl: 'hae',
};

const HicHaecHocN: DeclensionOverrides = {
    nomSg: 'hoc',
    accSg: 'hoc',
    genSg: 'huius',
    datSg: 'huic',
    ablSg: 'hōc',
    vocSg: 'hoc',

    nomPl: 'haec',
    accPl: 'haec',
    genPl: 'hōrum',
    datPl: 'hīs',
    ablPl: 'hīs',
    vocPl: 'haec',
};

const IsEaIdM: DeclensionOverrides = {
    nomSg: 'is',
    accSg: 'eum',
    genSg: 'eius',
    datSg: 'eī',
    ablSg: 'eō',
    vocSg: 'is',

    nomPl: 'iī',
    accPl: 'eōs',
    genPl: 'eōrum',
    datPl: 'iīs',
    ablPl: 'iīs',
    vocPl: 'iī',
};

const IsEaIdF: DeclensionOverrides = {
    nomSg: 'ea',
    accSg: 'eam',
    genSg: 'eius',
    datSg: 'eī',
    ablSg: 'eā',
    vocSg: 'ea',

    nomPl: 'eae',
    accPl: 'eās',
    genPl: 'eārum',
    datPl: 'iīs',
    ablPl: 'iīs',
    vocPl: 'eae',
};

const IsEaIdN: DeclensionOverrides = {
    nomSg: 'id',
    accSg: 'id',
    genSg: 'eius',
    datSg: 'eī',
    ablSg: 'eō',
    vocSg: 'id',

    nomPl: 'ea',
    accPl: 'ea',
    genPl: 'eōrum',
    datPl: 'iīs',
    ablPl: 'iīs',
    vocPl: 'ea',
};

const QuisM: DeclensionOverrides = {
    nomSg: 'quis',
    accSg: 'quem',
    genSg: 'cuius',
    datSg: 'cui',
    ablSg: 'quō',
    vocSg: 'quis',

    nomPl: 'quī',
    accPl: 'quōs',
    genPl: 'quōrum',
    datPl: 'quibus',
    ablPl: 'quibis',
    vocPl: 'quī',
};

const QuisF: DeclensionOverrides = {
    nomSg: 'quae',
    accSg: 'quam',
    genSg: 'cuius',
    datSg: 'cui',
    ablSg: 'quā',
    vocSg: 'quae',

    nomPl: 'quae',
    accPl: 'quās',
    genPl: 'quārum',
    datPl: 'quibus',
    ablPl: 'quibis',
    vocPl: 'quae',
};

const QuisN: DeclensionOverrides = {
    nomSg: 'quid',
    accSg: 'quid',
    genSg: 'cuius',
    datSg: 'cui',
    ablSg: 'quō',
    vocSg: 'quid',

    nomPl: 'quae',
    accPl: 'quae',
    genPl: 'quōrum',
    datPl: 'quibus',
    ablPl: 'quibis',
    vocPl: 'quae',
};

const IlleIllaIlludM: DeclensionOverrides = {
    nomSg: 'ille',
    accSg: 'illum',
    genSg: 'illīus',
    datSg: 'illī',
    ablSg: 'illō',
    vocSg: 'ille',

    nomPl: 'illī',
    accPl: 'illōs',
    genPl: 'illōrum',
    datPl: 'illīs',
    ablPl: 'illīs',
    vocPl: 'illī',
};

const IlleIllaIlludF: DeclensionOverrides = {
    nomSg: 'illa',
    accSg: 'illam',
    genSg: 'illīus',
    datSg: 'illī',
    ablSg: 'illā',
    vocSg: 'illa',

    nomPl: 'illae',
    accPl: 'illās',
    genPl: 'illārum',
    datPl: 'illīs',
    ablPl: 'illīs',
    vocPl: 'illae',
};

const IlleIllaIlludN: DeclensionOverrides = {
    nomSg: 'illud',
    accSg: 'illud',
    genSg: 'illīus',
    datSg: 'illī',
    ablSg: 'illō',
    vocSg: 'illud',

    nomPl: 'illa',
    accPl: 'illa',
    genPl: 'illōrum',
    datPl: 'illīs',
    ablPl: 'illīs',
    vocPl: 'illa',
};

const NemoMFN: DeclensionOverrides = {
    nomSg: 'nēmō',
    accSg: 'nēminem',
    genSg: 'nēminis',
    datSg: 'nēminī',
    ablSg: 'nēmine',
    vocSg: 'nēmō',

    nomPl: '',
    accPl: '',
    genPl: '',
    datPl: '',
    ablPl: '',
    vocPl: '',
};
