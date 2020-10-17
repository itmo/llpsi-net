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
import { AdjectiveDeclension } from "./types/AdjectiveDeclension";
import { NounDeclension } from "./types/NounDeclension";

export interface CaseKnowledge {
    genera: Set<Genus>;
    numeri: Set<Numerus>;
}

export interface NounDeclensionKnowledge {
    genera: Set<Genus>;
}

export interface DeclensionKnowledge {
    cases: Map<Casus, CaseKnowledge>;
    nounDeclensions: Map<NounDeclension, NounDeclensionKnowledge>;

    adjectiveDeclensions: Set<AdjectiveDeclension>;
    comparative: boolean;
    superlative: boolean;

    ablPrepostions: boolean;
    accPrepositions: boolean;

    pronounHic: boolean;
    pronounIlle: boolean;
    pronounIs: boolean;
}

export interface GrammarKnowledge {
    declensions: DeclensionKnowledge;
}

export function getGrammarKnowledge(chapter: number) {
    const k: GrammarKnowledge = {
        declensions: {
            cases: new Map(),
            nounDeclensions: new Map(),
            adjectiveDeclensions: new Set(),
            comparative: false,
            superlative: false,

            ablPrepostions: false,
            accPrepositions: false,
            pronounHic: false,
            pronounIlle: false,
            pronounIs: false,
        },
    };

    const allGenera = [Genus.Masculine, Genus.Femininum, Genus.Neuter];
    const mfGenera = [Genus.Masculine, Genus.Femininum];
    const spNumeri = [Numerus.Singular, Numerus.Plural];

    if (chapter >= 1) {
        addCase(k.declensions, Casus.Nominative, allGenera, spNumeri);
        addCase(k.declensions, Casus.Ablative, allGenera, [Numerus.Singular]);

        addNounDeclension(k.declensions, NounDeclension.A, allGenera);
        addNounDeclension(k.declensions, NounDeclension.O, allGenera);
        addNounDeclension(k.declensions, NounDeclension.Indeclinable, allGenera);

        k.declensions.adjectiveDeclensions.add(AdjectiveDeclension.AO);
    }

    if (chapter >= 2) {
        addCase(k.declensions, Casus.Genitive, allGenera, spNumeri);
    }

    if (chapter >= 3) {
        addCase(k.declensions, Casus.Accusative, mfGenera, [Numerus.Singular]);
    }

    if (chapter >= 4) {
        addCase(k.declensions, Casus.Vocative, allGenera, spNumeri);
    }

    if (chapter >= 5) {
        addCase(k.declensions, Casus.Ablative, [], [Numerus.Plural]);
        addCase(k.declensions, Casus.Accusative, [Genus.Neuter], [Numerus.Plural]);
        k.declensions.ablPrepostions = true;
    }

    if (chapter >= 6) {
        k.declensions.accPrepositions = true;
    }

    if (chapter >= 7) {
        addCase(k.declensions, Casus.Dative, allGenera, spNumeri);
    }

    if (chapter >= 8) {
        k.declensions.pronounHic = true;
        k.declensions.pronounIlle = true;
        k.declensions.pronounIs = true;
    }

    if (chapter >= 9) {
        addNounDeclension(k.declensions, NounDeclension.Third, mfGenera);
    }

    if (chapter >= 11) {
        addNounDeclension(k.declensions, NounDeclension.Third, [Genus.Neuter]);
    }

    if (chapter >= 12) {
        addNounDeclension(k.declensions, NounDeclension.U, mfGenera);
        k.declensions.adjectiveDeclensions.add(AdjectiveDeclension.Cons);
        k.declensions.comparative = true;
    }

    if (chapter >= 13) {
        addNounDeclension(k.declensions, NounDeclension.E, mfGenera);
        k.declensions.superlative = true;
    }

    if (chapter >= 21) {
        addNounDeclension(k.declensions, NounDeclension.U, [Genus.Neuter]);
    }

    return k;
}

function addNounDeclension(d: DeclensionKnowledge, decl: NounDeclension, genera: Genus[]) {
    const nd = d.nounDeclensions.get(decl);

    if (!nd) {
        d.nounDeclensions.set(decl, {
            genera: new Set(genera),
        });
    } else {
        genera.forEach(g => nd.genera.add(g));
    }
}

function addCase(d: DeclensionKnowledge, casus: Casus, genera: Genus[], numeri: Numerus[]) {
    const c = d.cases.get(casus);

    if (!c) {
        d.cases.set(casus, {
            genera: new Set(genera),
            numeri: new Set(numeri),
        });
    } else {
        genera.forEach(g => c.genera.add(g));
        numeri.forEach(n => c.numeri.add(n));
    }
}
