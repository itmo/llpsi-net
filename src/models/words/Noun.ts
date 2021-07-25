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

import { ADeclension } from "../declensions/ADeclension";
import { ConsDeclension } from "../declensions/ConsDeclension";
import { Declension, DeclensionInput } from "../declensions/Declension";
import { EDeclension } from "../declensions/EDeclension";
import { IMixedDeclension } from "../declensions/IMixedDeclension";
import { IndeclinableDeclension } from "../declensions/IndeclinableDeclension";
import { IPureDeclension } from "../declensions/IPureDeclension";
import { ODeclension } from "../declensions/ODeclension";
import { UDeclension } from "../declensions/UDeclension";
import { Casus } from "../types/Casus";
import { Genus } from "../types/Genus";
import { NounDeclinable } from "../types/NounDeclinable";
import { Numerus } from "../types/Numerus";
import { DeclensionOverrides, NounData } from "../WordData";
import { NounDeclension } from "../types/NounDeclension";
import { Word } from "./Word";
import { LaNominal, parse_template, NounData as NounDeclData } from "@fpw/en-wiktionary-la-modules";

export class Noun extends Word implements NounDeclinable {
    private declension: Declension;
    private genus_: Genus;
    private pluraleTantum_: boolean;
    private declensionTemplate: string;

    public constructor(data: NounData) {
        super(data, `${data.latinNominative}`);
        this.genus_ = this.dataToGenus(data.genus);
        this.pluraleTantum_ = data.pluraleTantum ? true : false;
        this.declensionTemplate = data.declension;
        this.declension = this.determineDeclension(data);
    }

    public get genus(): Genus {
        return this.genus_;
    }

    public get pluraleTantum(): boolean {
        return this.pluraleTantum_;
    }

    public get declensionType(): NounDeclension {
        const d = this.declension;

        if (d instanceof ADeclension) {
            return NounDeclension.A;
        } else if (d instanceof ODeclension) {
            return NounDeclension.O;
        } else if (d instanceof UDeclension) {
            return NounDeclension.U;
        } else if (d instanceof ConsDeclension || d instanceof IMixedDeclension || d instanceof IPureDeclension) {
            return NounDeclension.Third;
        } else if (d instanceof EDeclension) {
            return NounDeclension.E;
        } else {
            return NounDeclension.Indeclinable;
        }
    }

    public decline(casus: Casus, numerus: Numerus): string | null {
        return this.declension.decline(casus, numerus);
    }

    public getDeclension(): NounDeclData {
        const args = parse_template(this.declensionTemplate);
        const nominal = new LaNominal();
        return nominal.do_generate_noun_forms(args);
    }

    private determineDeclension(data: NounData): Declension {
        const gen = data.latinGenitive;
        const input = this.nounToDeclension(data);

        if (data.pluraleTantum) {
            if (gen.endsWith('ārum')) {
                return new ADeclension(input);
            } else if (gen.endsWith('ōrum')) {
                return new ODeclension(input);
            } else if (gen.endsWith('uum')) {
                return new UDeclension(input);
            } else if (gen.endsWith('um')) {
                return this.determineConsDeclension(data, input);
            }
        } else {
            if (gen.length == 0) {
                return new IndeclinableDeclension(input);
            } else if (gen.endsWith('ae')) {
                return new ADeclension(input);
            } else if (gen.endsWith('ēī')) {
                return new EDeclension(input);
            } else if (gen.endsWith('eī')) {
                return new EDeclension(input);
            } else if (gen.endsWith('is') || (gen.endsWith("īs"))) {
                return this.determineConsDeclension(data, input);
            } else if (gen.endsWith('ūs') || (gen.endsWith('ū'))) {
                return new UDeclension(input);
            } else if (gen.endsWith('ī')) {
                return new ODeclension(input);
            }
        }

        throw Error(`Unknown declension for ${data.latinNominative}, ${gen}`);
    }

    private nounToDeclension(data: NounData): DeclensionInput {
        return {
            nominative: data.latinNominative,
            genitiveConstruction: data.latinGenitive,
            genus: this.genus,
            pluraleTantum: this.pluraleTantum,
            overrides: this.getOverridesFor(data),
        };
    }

    private dataToGenus(str: string): Genus {
        switch (str) {
            case 'm':   return Genus.Masculine;
            case 'f':   return Genus.Femininum;
            case 'n':   return Genus.Neuter;
            case 'm/f': return Genus.Masculine; // TODO
            default:
                throw Error(`Unknown genus ${str}`);
        }
    }

    private getOverridesFor(data: NounData): DeclensionOverrides | undefined {
        if (!data.overrides) {
            return undefined;
        }

        return JSON.parse(data.overrides);
    }

    private determineConsDeclension(data: NounData, input: DeclensionInput) {
        switch (data.iStemType) {
            case 'pure':    return new IPureDeclension(input);
            case 'mixed':   return new IMixedDeclension(input);
            default:        return new ConsDeclension(input);
        }
    }
}
