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

import { Casus } from "./types/Casus";
import { Genus } from "./types/Genus";
import { Numerus } from "./types/Numerus";
import { AdjectiveDeclension } from "./words/Adjective";
import { NounDeclension } from "./words/Noun";

export interface CaseKnowledge {
    genus: Set<Genus>;
    numerus: Set<Numerus>;
}

export interface DeclensionKnowledge {
    cases: Map<Casus, CaseKnowledge>;
    nounDeclensions: Set<NounDeclension>;
    neuterCons: boolean;
    adjectiveDeclensions: Set<AdjectiveDeclension>;
    comparative: boolean;
    superlative: boolean;
}

export interface GrammarKnowledge {
    declensions: DeclensionKnowledge;

    ablPrepostions: boolean;
    accPrepositions: boolean;

    pronounHic: boolean;
    pronounIlle: boolean;
    pronounIs: boolean;
}

export function getGrammarKnowledge(chapter: number) {
    const k: GrammarKnowledge = {
        declensions: {
            cases: new Map(),
            nounDeclensions: new Set(),
            neuterCons: false,
            adjectiveDeclensions: new Set(),
            comparative: false,
            superlative: false,
        },
        ablPrepostions: false,
        accPrepositions: false,
        pronounHic: false,
        pronounIlle: false,
        pronounIs: false,
    };

    if (chapter >= 1) {
        addCase(k.declensions,
            Casus.Nominative,
            [Genus.Masculine, Genus.Femininum, Genus.Neuter],
            [Numerus.Singular, Numerus.Plural]
        );

        addCase(k.declensions,
            Casus.Ablative,
            [Genus.Masculine, Genus.Femininum, Genus.Neuter],
            [Numerus.Singular]
        );

        k.declensions.nounDeclensions.add(NounDeclension.A);
        k.declensions.nounDeclensions.add(NounDeclension.O);
        k.declensions.nounDeclensions.add(NounDeclension.Indeclinable);

        k.declensions.adjectiveDeclensions.add(AdjectiveDeclension.AO);
    }

    if (chapter >= 2) {
        addCase(k.declensions,
            Casus.Genitive,
            [Genus.Masculine, Genus.Femininum, Genus.Neuter],
            [Numerus.Singular, Numerus.Plural]
        );
    }

    if (chapter >= 3) {
        addCase(k.declensions,
            Casus.Accusative,
            [Genus.Masculine, Genus.Femininum],
            [Numerus.Singular]
        );
    }

    if (chapter >= 4) {
        addCase(k.declensions,
            Casus.Vocative,
            [Genus.Masculine, Genus.Femininum, Genus.Neuter],
            [Numerus.Singular, Numerus.Plural]
        );
    }

    if (chapter >= 5) {
        addCase(k.declensions,
            Casus.Ablative,
            [],
            [Numerus.Plural]
        );

        addCase(k.declensions,
            Casus.Accusative,
            [Genus.Neuter],
            [Numerus.Plural]
        );

        k.ablPrepostions = true;
    }

    if (chapter >= 6) {
        k.accPrepositions = true;
    }

    if (chapter >= 7) {
        addCase(k.declensions,
            Casus.Dative,
            [Genus.Masculine, Genus.Femininum, Genus.Neuter],
            [Numerus.Singular, Numerus.Plural]
        );
    }

    if (chapter >= 8) {
        k.pronounHic = true;
        k.pronounIlle = true;
        k.pronounIs = true;
    }

    if (chapter >= 9) {
        k.declensions.nounDeclensions.add(NounDeclension.Cons);
    }

    if (chapter >= 11) {
        k.declensions.nounDeclensions.add(NounDeclension.I);
        k.declensions.neuterCons = true;
    }

    if (chapter >= 12) {
        k.declensions.nounDeclensions.add(NounDeclension.U);
        k.declensions.adjectiveDeclensions.add(AdjectiveDeclension.Cons);
        k.declensions.comparative = true;
    }

    if (chapter >= 13) {
        k.declensions.nounDeclensions.add(NounDeclension.E);
        k.declensions.superlative = true;
    }

    return k;
}

function addCase(d: DeclensionKnowledge, casus: Casus, genus: Genus[], numerus: Numerus[]) {
    if (!d.cases.has(casus)) {
        d.cases.set(casus, {
            genus: new Set(genus),
            numerus: new Set(numerus),
        });
    }

    const c = d.cases.get(casus);
    if (!c) {
        throw Error('Logic error');
    }

    genus.forEach(g => c.genus.add(g));
    numerus.forEach(n => c.numerus.add(n));
}
