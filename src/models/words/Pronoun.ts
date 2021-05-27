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
            case 'ego':
            case 'tū':
            case 'sē':
            case 'sēsē':
            case 'nōs':
            case 'vōs':
                this.maleDeclension = new IrregularDeclension({genus: Genus.Masculine, nominative: 'ego', genitiveConstruction: ''});
                this.femaleDeclension = new IrregularDeclension({genus: Genus.Masculine, nominative: 'ego', genitiveConstruction: ''});
                this.neuterDeclension = new IrregularDeclension({genus: Genus.Masculine, nominative: 'ego', genitiveConstruction: ''});
                break;
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
            case 'aliquis':
                this.maleDeclension = new IrregularDeclension({genus: Genus.Masculine, overrides: AliquisM, nominative: '', genitiveConstruction: ''});
                this.femaleDeclension = new IrregularDeclension({genus: Genus.Femininum, overrides: AliquisF, nominative: '', genitiveConstruction: ''});
                this.neuterDeclension = new IrregularDeclension({genus: Genus.Neuter, overrides: AliquisN, nominative: '', genitiveConstruction: ''});
                break;
            case 'ille':
                this.maleDeclension = new IrregularDeclension({genus: Genus.Masculine, overrides: IlleIllaIlludM, nominative: '', genitiveConstruction: ''});
                this.femaleDeclension = new IrregularDeclension({genus: Genus.Femininum, overrides: IlleIllaIlludF, nominative: '', genitiveConstruction: ''});
                this.neuterDeclension = new IrregularDeclension({genus: Genus.Neuter, overrides: IlleIllaIlludN, nominative: '', genitiveConstruction: ''});
                break;
            case 'iste':
                this.maleDeclension = new IrregularDeclension({genus: Genus.Masculine, overrides: IsteIstaIstudM, nominative: '', genitiveConstruction: ''});
                this.femaleDeclension = new IrregularDeclension({genus: Genus.Femininum, overrides: IsteIstaIstudF, nominative: '', genitiveConstruction: ''});
                this.neuterDeclension = new IrregularDeclension({genus: Genus.Neuter, overrides: IsteIstaIstudN, nominative: '', genitiveConstruction: ''});
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
            case 'quisque':
                this.maleDeclension = new IrregularDeclension({genus: Genus.Masculine, overrides: QuisQueM, nominative: '', genitiveConstruction: ''});
                this.femaleDeclension = new IrregularDeclension({genus: Genus.Femininum, overrides: QuisQueF, nominative: '', genitiveConstruction: ''});
                this.neuterDeclension = new IrregularDeclension({genus: Genus.Neuter, overrides: QuisQueN, nominative: '', genitiveConstruction: ''});
                break;
            case 'quisnam':
                this.maleDeclension = new IrregularDeclension({genus: Genus.Masculine, overrides: QuisNamMF, nominative: '', genitiveConstruction: ''});
                this.femaleDeclension = new IrregularDeclension({genus: Genus.Femininum, overrides: QuisNamMF, nominative: '', genitiveConstruction: ''});
                this.neuterDeclension = new IrregularDeclension({genus: Genus.Neuter, overrides: QuisNamN, nominative: '', genitiveConstruction: ''});
            case 'quisquam':
                this.maleDeclension = new IrregularDeclension({genus: Genus.Masculine, overrides: QuisQuamM, nominative: '', genitiveConstruction: ''});
                this.femaleDeclension = new IrregularDeclension({genus: Genus.Femininum, overrides: QuisQuamF, nominative: '', genitiveConstruction: ''});
                this.neuterDeclension = new IrregularDeclension({genus: Genus.Neuter, overrides: QuisQuamN, nominative: '', genitiveConstruction: ''});
                break;
            case 'quīdam':
                this.maleDeclension = new IrregularDeclension({genus: Genus.Masculine, overrides: QuidamM, nominative: '', genitiveConstruction: ''});
                this.femaleDeclension = new IrregularDeclension({genus: Genus.Femininum, overrides: QuidamF, nominative: '', genitiveConstruction: ''});
                this.neuterDeclension = new IrregularDeclension({genus: Genus.Neuter, overrides: QuidamN, nominative: '', genitiveConstruction: ''});
                break;
            case 'īdem':
                this.maleDeclension = new IrregularDeclension({genus: Genus.Masculine, overrides: IsEaIdemM, nominative: '', genitiveConstruction: ''});
                this.femaleDeclension = new IrregularDeclension({genus: Genus.Femininum, overrides: IsEaIdemF, nominative: '', genitiveConstruction: ''});
                this.neuterDeclension = new IrregularDeclension({genus: Genus.Neuter, overrides: IsEaIdemN, nominative: '', genitiveConstruction: ''});
                break;
            case 'ipse':
                this.maleDeclension = new IrregularDeclension({genus: Genus.Masculine, overrides: IpseIpsaIpsumM, nominative: '', genitiveConstruction: ''});
                this.femaleDeclension = new IrregularDeclension({genus: Genus.Femininum, overrides: IpseIpsaIpsumF, nominative: '', genitiveConstruction: ''});
                this.neuterDeclension = new IrregularDeclension({genus: Genus.Neuter, overrides: IpseIpsaIpsumN, nominative: '', genitiveConstruction: ''});
                break;
            case 'aliquī':
                this.maleDeclension = new IrregularDeclension({genus: Genus.Masculine, overrides: AliquiM, nominative: '', genitiveConstruction: ''});
                this.femaleDeclension = new IrregularDeclension({genus: Genus.Femininum, overrides: AliquiF, nominative: '', genitiveConstruction: ''});
                this.neuterDeclension = new IrregularDeclension({genus: Genus.Neuter, overrides: AliquiN, nominative: '', genitiveConstruction: ''});
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


const AliquisM: DeclensionOverrides = {
    nomSg: 'aliquis',
    accSg: 'aliquem',
    genSg: 'alicuius',
    datSg: 'alicui',
    ablSg: 'aliquō',
    vocSg: 'aliquis',

    nomPl: 'aliquī',
    accPl: 'aliquōs',
    genPl: 'aliquōrum',
    datPl: 'aliquibus',
    ablPl: 'aliquibis',
    vocPl: 'aliquī',
};

const AliquisF: DeclensionOverrides = {
    nomSg: 'aliquis',
    accSg: 'aliquem',
    genSg: 'alicuius',
    datSg: 'alicui',
    ablSg: 'aliquō',
    vocSg: 'aliquis',

    nomPl: 'aliquae',
    accPl: 'aliquās',
    genPl: 'aliquārum',
    datPl: 'aliquibus',
    ablPl: 'aliquibis',
    vocPl: 'aliquae',
};

const AliquisN: DeclensionOverrides = {
    nomSg: 'aliquid',
    accSg: 'aliquid',
    genSg: 'alicuius',
    datSg: 'alicui',
    ablSg: 'aliquō',
    vocSg: 'aliquid',

    nomPl: 'aliquae',
    accPl: 'aliquae',
    genPl: 'aliquōrum',
    datPl: 'aliquibus',
    ablPl: 'aliquibis',
    vocPl: 'aliquae',
};

const AliquiM: DeclensionOverrides = {
    nomSg: 'aliquī',
    accSg: 'aliquem',
    genSg: 'alicuius',
    datSg: 'alicui',
    ablSg: 'aliquō',
    vocSg: 'aliquī',

    nomPl: 'aliquī',
    accPl: 'aliquōs',
    genPl: 'aliquōrum',
    datPl: 'aliquibus',
    ablPl: 'aliquibis',
    vocPl: 'aliquī',
};

const AliquiF: DeclensionOverrides = {
    nomSg: 'aliqua',
    accSg: 'aliquam',
    genSg: 'alicuius',
    datSg: 'alicui',
    ablSg: 'aliquā',
    vocSg: 'aliqua',

    nomPl: 'aliquae',
    accPl: 'aliquās',
    genPl: 'aliquārum',
    datPl: 'aliquibus',
    ablPl: 'aliquibis',
    vocPl: 'aliquae',
};

const AliquiN: DeclensionOverrides = {
    nomSg: 'aliquod',
    accSg: 'aliquod',
    genSg: 'alicuius',
    datSg: 'alicui',
    ablSg: 'aliquō',
    vocSg: 'aliquod',

    nomPl: 'aliqua',
    accPl: 'aliqua',
    genPl: 'aliquōrum',
    datPl: 'aliquibus',
    ablPl: 'aliquibis',
    vocPl: 'aliqua',
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

const QuisQueM: DeclensionOverrides = {
    nomSg: 'quisque',
    accSg: 'quemque',
    genSg: 'cuiusque',
    datSg: 'cuique',
    ablSg: 'quōque',
    vocSg: 'quisque',

    nomPl: 'quīque',
    accPl: 'quōsque',
    genPl: 'quōrumque',
    datPl: 'quibusque',
    ablPl: 'quibusque',
    vocPl: 'quīque',
};

const QuisQueF: DeclensionOverrides = {
    nomSg: 'quaeque',
    accSg: 'quamque',
    genSg: 'cuiusque',
    datSg: 'cuique',
    ablSg: 'quāque',
    vocSg: 'quisque',

    nomPl: 'quaeque',
    accPl: 'quāsque',
    genPl: 'quārumque',
    datPl: 'quibusque',
    ablPl: 'quibusque',
    vocPl: 'quaeque',
};

const QuisQueN: DeclensionOverrides = {
    nomSg: 'quodque',
    accSg: 'quodque',
    genSg: 'cuiusque',
    datSg: 'cuique',
    ablSg: 'quōque',
    vocSg: 'quodque',

    nomPl: 'quaeque',
    accPl: 'quaeque',
    genPl: 'quōrumque',
    datPl: 'quibusque',
    ablPl: 'quibusque',
    vocPl: 'quaeque',
};

const QuisNamMF: DeclensionOverrides = {
    nomSg: 'quisnam',
    accSg: 'quemnam',
    genSg: 'cuiusnam',
    datSg: 'cuinam',
    ablSg: 'quōnam',
    vocSg: 'quisnam',

    nomPl: 'quīnam',
    accPl: 'quōsnam',
    genPl: 'quōrumnam',
    datPl: 'quibusnam',
    ablPl: 'quibusnam',
    vocPl: 'quīnam',
};

const QuisNamN: DeclensionOverrides = {
    nomSg: 'quidnam',
    accSg: 'quidnam',
    genSg: 'cuiusnam',
    datSg: 'cuinam',
    ablSg: 'quōnam',
    vocSg: 'quidnam',

    nomPl: 'quaenam',
    accPl: 'quaenam',
    genPl: 'quōrumnam',
    datPl: 'quibusnam',
    ablPl: 'quibusnam',
    vocPl: 'quaenam',
};

const QuisQuamM: DeclensionOverrides = {
    nomSg: 'quisquam',
    accSg: 'quemquam',
    genSg: 'cuiusquam',
    datSg: 'cuiquam',
    ablSg: 'quōquam',
    vocSg: 'quisquam',

    nomPl: 'quīquam',
    accPl: 'quōsquam',
    genPl: 'quōrumquam',
    datPl: 'quibusquam',
    ablPl: 'quibusquam',
    vocPl: 'quīquam',
};

const QuisQuamF: DeclensionOverrides = {
    nomSg: 'quaequam',
    accSg: 'quamquam',
    genSg: 'cuiusquam',
    datSg: 'cuiquam',
    ablSg: 'quāquam',
    vocSg: 'quaequam',

    nomPl: 'quaequam',
    accPl: 'quāsquam',
    genPl: 'quārumquam',
    datPl: 'quibusquam',
    ablPl: 'quibusquam',
    vocPl: 'quaequam',
};

const QuisQuamN: DeclensionOverrides = {
    nomSg: 'quidquam',
    accSg: 'quidquam',
    genSg: 'cuiusquam',
    datSg: 'cuiquam',
    ablSg: 'quōquam',
    vocSg: 'quidquam',

    nomPl: 'quaequam',
    accPl: 'quaequam',
    genPl: 'quōrumquam',
    datPl: 'quibusquam',
    ablPl: 'quibusquam',
    vocPl: 'quaequam',
};

const IsEaIdemM: DeclensionOverrides = {
    nomSg: 'īdem',
    accSg: 'eundem',
    genSg: 'eiusdem',
    datSg: 'eīdem',
    ablSg: 'eōdem',
    vocSg: 'īdem',

    nomPl: 'iīdem',
    accPl: 'eōsdem',
    genPl: 'eōrundem',
    datPl: 'iīsdem',
    ablPl: 'iīsdem',
    vocPl: 'iīdem',
};

const IsEaIdemF: DeclensionOverrides = {
    nomSg: 'eadem',
    accSg: 'eandem',
    genSg: 'eiusdem',
    datSg: 'eīdem',
    ablSg: 'eādem',
    vocSg: 'eadem',

    nomPl: 'eaedem',
    accPl: 'eāsdem',
    genPl: 'eārundem',
    datPl: 'iīsdem',
    ablPl: 'iīsdem',
    vocPl: 'eaedem',
};

const IsEaIdemN: DeclensionOverrides = {
    nomSg: 'idem',
    accSg: 'idem',
    genSg: 'eiusdem',
    datSg: 'eīdem',
    ablSg: 'eōdem',
    vocSg: 'idem',

    nomPl: 'eaedem',
    accPl: 'eaedem',
    genPl: 'eōrundem',
    datPl: 'iīsdem',
    ablPl: 'iīsdem',
    vocPl: 'eaedem',
};

const IsteIstaIstudM: DeclensionOverrides = {
    nomSg: 'iste',
    accSg: 'istum',
    genSg: 'istīus',
    datSg: 'istī',
    ablSg: 'istō',
    vocSg: 'iste',

    nomPl: 'istī',
    accPl: 'istōs',
    genPl: 'istōrum',
    datPl: 'istīs',
    ablPl: 'istīs',
    vocPl: 'istī',
};

const IsteIstaIstudF: DeclensionOverrides = {
    nomSg: 'ista',
    accSg: 'istam',
    genSg: 'istīus',
    datSg: 'istī',
    ablSg: 'istā',
    vocSg: 'ista',

    nomPl: 'istae',
    accPl: 'istās',
    genPl: 'istārum',
    datPl: 'istīs',
    ablPl: 'istīs',
    vocPl: 'istae',
};

const IsteIstaIstudN: DeclensionOverrides = {
    nomSg: 'istud',
    accSg: 'istud',
    genSg: 'istīus',
    datSg: 'istī',
    ablSg: 'istō',
    vocSg: 'istud',

    nomPl: 'ista',
    accPl: 'ista',
    genPl: 'istōrum',
    datPl: 'istīs',
    ablPl: 'istīs',
    vocPl: 'ista',
};

const IpseIpsaIpsumM: DeclensionOverrides = {
    nomSg: 'ipse',
    accSg: 'ipsum',
    genSg: 'ipsīus',
    datSg: 'ipsī',
    ablSg: 'ipsō',
    vocSg: 'ipse',

    nomPl: 'ipsī',
    accPl: 'ipsōs',
    genPl: 'ipsōrum',
    datPl: 'ipsīs',
    ablPl: 'ipsīs',
    vocPl: 'ipsī',
};

const IpseIpsaIpsumF: DeclensionOverrides = {
    nomSg: 'ipsa',
    accSg: 'ipsam',
    genSg: 'ipsīus',
    datSg: 'ipsī',
    ablSg: 'ipsā',
    vocSg: 'ipsa',

    nomPl: 'ipsae',
    accPl: 'ipsās',
    genPl: 'ipsārum',
    datPl: 'ipsīs',
    ablPl: 'ipsīs',
    vocPl: 'ipsae',
};

const IpseIpsaIpsumN: DeclensionOverrides = {
    nomSg: 'ipsum',
    accSg: 'ipsum',
    genSg: 'ipsīus',
    datSg: 'ipsī',
    ablSg: 'ipsō',
    vocSg: 'ipsum',

    nomPl: 'ipsa',
    accPl: 'ipsa',
    genPl: 'ipsōrum',
    datPl: 'ipsīs',
    ablPl: 'ipsīs',
    vocPl: 'ipsa',
};

const QuidamM: DeclensionOverrides = {
    nomSg: 'quīdam',
    accSg: 'quendam',
    genSg: 'cuiusdam',
    datSg: 'cuidam',
    ablSg: 'quōdam',
    vocSg: 'quīdam',

    nomPl: 'quīdam',
    accPl: 'quōsdam',
    genPl: 'quōrundam',
    datPl: 'quibusdam',
    ablPl: 'quibusdam',
    vocPl: 'quīdam',
};

const QuidamF: DeclensionOverrides = {
    nomSg: 'quaedam',
    accSg: 'quamdam',
    genSg: 'cuiusdam',
    datSg: 'cuidam',
    ablSg: 'quādam',
    vocSg: 'quaedam',

    nomPl: 'quaedam',
    accPl: 'quāsdam',
    genPl: 'quārundam',
    datPl: 'quibusdam',
    ablPl: 'quibusdam',
    vocPl: 'quaedam',
};

const QuidamN: DeclensionOverrides = {
    nomSg: 'quiddam',
    accSg: 'quiddam',
    genSg: 'cuiusdam',
    datSg: 'cuidam',
    ablSg: 'quōdam',
    vocSg: 'quiddam',

    nomPl: 'quaedam',
    accPl: 'quaedam',
    genPl: 'quōrundam',
    datPl: 'quibusdam',
    ablPl: 'quibusdam',
    vocPl: 'quaedam',
};
