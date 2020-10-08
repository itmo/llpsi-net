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
import { Casus } from "../types/Casus";
import { Genus } from "../types/Genus";
import { Numerus } from "../types/Numerus";

export interface DeclensionInput {
    genus: Genus;
    nominative: string;
    genitiveConstruction: string;
    pluraleTantum?: boolean;
    pluralAbus?: boolean;
    genitiveIus?: boolean;
    ablativeI?: boolean;
}

export interface DeclensionRule {
    construction: string;
    nominativeEndings: {
        when: string;
        changeTo: string;
    }[];
}

export abstract class Declension {
    public abstract decline(casus: Casus, numerus: Numerus): string | null;
    public abstract get stem(): string;

    public static applyStemRule(nominative: string, construction: string, rules: DeclensionRule[]): string {
        for (const rule of rules) {
            if (construction.endsWith(rule.construction)) {
                for (const suffix of rule.nominativeEndings) {
                    if (nominative.endsWith(suffix.when)) {
                        if (suffix.when.length == 0) {
                            console.warn(`Using generic rule for ${nominative}, ${construction}`);
                        }
                        return changeSuffix(nominative, suffix.when, suffix.changeTo);
                    }
                }
            }
        }

        throw Error(`Couldn't find rule to get stem for ${nominative}, ${construction}`);
    }
}
