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

import { stripMacrons } from "../../models/common";
import { Numerus } from "../../models/types/Numerus";
import { WordDB } from "../../models/WordDB";
import { Word } from "../../models/words/Word";
import { DeclensionChallenge } from "./DeclensionChallenge";

export class DeclensionGame {
    private db: WordDB;

    constructor(db: WordDB) {
        this.db = db;
    }

    public createChallenge(maxChapter: number): DeclensionChallenge {
        const preposition = this.randomWord(this.db.prepositions, maxChapter);
        const noun = this.randomWord(this.db.nouns, maxChapter);
        const adjective = this.randomWord(this.db.adjectives, maxChapter);
        let numerus: Numerus;
        if (noun.pluraleTantum || adjective.pluraleTantum) {
            numerus = Numerus.Plural;
        } else {
            numerus = Math.random() < 0.5 ? Numerus.Singular : Numerus.Plural;
        }

        return {
            preposition: preposition,
            adjective: adjective,
            noun: noun,
            number: numerus,
        };
    }

    public getAnswer(challenge: DeclensionChallenge): string[] {
        const answers: string[] = [];
        for (const casus of challenge.preposition.cases) {
            const prp = challenge.preposition.latin;
            const noun = challenge.noun.decline(casus, challenge.number);
            const adj = challenge.adjective.decline(challenge.noun.genus, casus, challenge.number);
            answers.push(`${prp} ${noun} ${adj}`);
        }
        
        return answers;
    }

    public check(challenge: DeclensionChallenge, response: string, checkMacrons: boolean): boolean {
        for (const casus of challenge.preposition.cases) {
            let prp = challenge.preposition.latin;
            let noun = challenge.noun.decline(casus, challenge.number);
            let adj = challenge.adjective.decline(challenge.noun.genus, casus, challenge.number);
            if (!noun || !adj) {
                return (response == '');
            }

            if (!checkMacrons) {
                prp = stripMacrons(prp);
                noun = stripMacrons(noun);
                adj = stripMacrons(adj);
            }
            
            return (response.includes(prp) && response.includes(noun) && response.includes(adj));
        }

        return false;
    }

    private randomWord<T extends Word>(words: T[], maxChapter: number): T {
        const from = words.filter(w => w.chapter <= maxChapter);
        return from[Math.floor(Math.random() * from.length)];
    }
}
