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

import { changeSuffix } from "../common";
import { ADeclension } from "../declensions/ADeclension";
import { Declension, DeclensionInput, DeclensionRule } from "../declensions/Declension";
import { IPureDeclension } from "../declensions/IPureDeclension";
import { IrregularDeclension } from "../declensions/IrregularDeclension";
import { ODeclension } from "../declensions/ODeclension";
import { AdjectiveDeclinable } from "../types/AdjectiveDeclinable";
import { Casus } from "../types/Casus";
import { Genus } from "../types/Genus";
import { Numerus } from "../types/Numerus";
import { AdjectiveData, DeclensionOverrides } from "../WordData";
import { AdjectiveDeclension } from "../types/AdjectiveDeclension";
import { Word } from "./Word";

export class Adjective extends Word implements AdjectiveDeclinable {
    private maleDeclension: Declension;
    private femaleDeclension: Declension;
    private neuterDeclension: Declension;
    private pluraleTantum_: boolean = false;

    public constructor(data: AdjectiveData) {
        super(data, `${data.latinMale}`);

        const [m, f, n] = this.determineDeclensions(data);

        this.maleDeclension = m;
        this.femaleDeclension = f;
        this.neuterDeclension = n;
    }

    public get pluraleTantum(): boolean {
        return this.pluraleTantum_;
    }

    public get declensionType(): AdjectiveDeclension {
        if (this.maleDeclension instanceof ODeclension) {
            return AdjectiveDeclension.AO;
        } else if (this.maleDeclension instanceof IPureDeclension) {
            return AdjectiveDeclension.Cons;
        } else {
            return AdjectiveDeclension.Irregular;
        }
    }

    public decline(genus: Genus, casus: Casus, numerus: Numerus): string | null {
        switch (genus) {
            case Genus.Masculine: return this.maleDeclension.decline(casus, numerus);
            case Genus.Femininum: return this.femaleDeclension.decline(casus, numerus);
            case Genus.Neuter: return this.neuterDeclension.decline(casus, numerus);
        }
    }

    private determineDeclensions(data: AdjectiveData): [Declension, Declension, Declension] {
        let male, female, neuter: Declension | undefined;

        if (data.latinNeuter == '-ud' || data.latinNeuter == '-o') {
            const input = this.adjToDeclensionRewrite(data, Genus.Neuter, '', '', '');
            male = new IrregularDeclension(input);
            female = male;
            neuter = male;
        } else if (data.latinNeuter.endsWith('um') && data.latinFemale.endsWith('a')) {
            const stem = Declension.applyStemRule(data.latinMale, data.latinNeuter, UsAUmRules);

            const maleInput = this.adjToDeclension(data, data.latinMale, data.latinNeuter.replace(/um$/, 'ī'), Genus.Masculine);
            male = new ODeclension(maleInput);

            const femaleInput = this.adjToDeclension(data, stem + 'a', '-ae', Genus.Femininum);
            female = new ADeclension(femaleInput);

            const neuterInput = this.adjToDeclension(data, stem + 'um', '-ī', Genus.Neuter);
            neuter = new ODeclension(neuterInput);
        } else if (data.latinMale.endsWith('ī')) {
            this.pluraleTantum_ = true;
            const maleInput = this.adjToDeclensionRewrite(data, Genus.Masculine, '-ōrum', 'ī', 'ī');
            maleInput.pluraleTantum = true;
            male = new ODeclension(maleInput);
            if (data.latinFemale == '-ae') {
                const femaleInput = this.adjToDeclensionRewrite(data, Genus.Femininum, '-ārum', 'ī', 'ae');
                femaleInput.pluraleTantum = true;
                female = new ADeclension(femaleInput);
            }

            if (data.latinNeuter == '-a') {
                const neuterInput = this.adjToDeclensionRewrite(data, Genus.Neuter, '-ōrum', 'ī', 'a');
                neuterInput.pluraleTantum = true;
                neuter = new ODeclension(neuterInput);
            }
        } else if (data.latinMale.endsWith('is')) {
            const input = this.adjToDeclensionRewrite(data, Genus.Masculine, '-is', 'is', 'is');
            input.ablativeI = true;
            male = new IPureDeclension(input);
            female = male;
            if (data.latinNeuter == '-e') {
                const neuterInput = this.adjToDeclensionRewrite(data, Genus.Neuter, '-is', 'is', 'e');
                neuter = new IPureDeclension(neuterInput);
            }
        }

        if (!male || !female || !neuter) {
            throw Error(`Don't know how to decline adjective ${data.latinMale}`);
        }

        return [male, female, neuter];
    }

    private adjToDeclensionRewrite(data: AdjectiveData, genus: Genus, genitive: string, sufFrom: string, sufTo: string): DeclensionInput {
        const genitiveIus = data.genitiveIus ? true : false;

        return {
            nominative: changeSuffix(data.latinMale, sufFrom, sufTo),
            genitiveConstruction: genitive,
            genus: genus,
            genitiveIus: genitiveIus,
            overrides: this.getOverridesFor(data, genus),
        };
    }

    private adjToDeclension(data: AdjectiveData, nominative: string, cons: string, genus: Genus): DeclensionInput {
        const genitiveIus = data.genitiveIus ? true : false;

        return {
            nominative: nominative,
            genitiveConstruction: cons,
            genus: genus,
            genitiveIus: genitiveIus,
            overrides: this.getOverridesFor(data, genus),
        };
    }

    private getOverridesFor(data: AdjectiveData, genus: Genus): DeclensionOverrides | undefined {
        if (!data.overrides) {
            return undefined;
        }

        const overrides = JSON.parse(data.overrides);
        if (overrides) {
            switch (genus) {
                case Genus.Masculine:   return overrides.m;
                case Genus.Femininum:   return overrides.f;
                case Genus.Neuter:      return overrides.n;
            }
        }
        return undefined;
    }
}

const UsAUmRules: DeclensionRule[] = [
    {
        construction: '-um',
        nominativeEndings: [
            {when: 'us', changeTo: ''},
        ],
    },
    {
        construction: '-brum',
        nominativeEndings: [
            {when: 'ber', changeTo: 'br'},
        ],
    },
    {
        construction: '-chrum',
        nominativeEndings: [
            {when: 'cher', changeTo: 'chr'},
        ],
    },
    {
        construction: '-grum',
        nominativeEndings: [
            {when: 'ger', changeTo: 'gr'},
        ],
    },
    {
        construction: '-trum',
        nominativeEndings: [
            {when: 'ter', changeTo: 'tr'},
        ],
    },
];
