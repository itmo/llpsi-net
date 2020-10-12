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

import { randomElement, stripMacrons } from "../../models/common";
import { Declension, DeclensionRule } from "../../models/declensions/Declension";
import { Casus } from "../../models/types/Casus";
import { Genus } from "../../models/types/Genus";
import { Numerus } from "../../models/types/Numerus";
import { WordDB } from "../../models/WordDB";
import { Adjective } from "../../models/words/Adjective";
import { Noun, NounDeclension } from "../../models/words/Noun";
import { Preposition } from "../../models/words/Preposition";
import { Pronoun } from "../../models/words/Pronoun";
import { Word } from "../../models/words/Word";
import { DeclensionChallenge } from "./DeclensionChallenge";
import { DeclensionGameOptions } from "./DeclensionGameOptions";

export class DeclensionGame {
    private db: WordDB;

    constructor(db: WordDB) {
        this.db = db;
    }

    public createChallenge(opts: DeclensionGameOptions): DeclensionChallenge {
        const casus = randomElement(Array.from(opts.knowledge.declensions.cases.keys()));
        switch (casus) {
            case Casus.Nominative:  return this.createNominative(opts);
            case Casus.Accusative:  return this.createAccusative(opts);
            case Casus.Genitive:    return this.createGenitive(opts);
            case Casus.Ablative:    return this.createAblative(opts);
            case Casus.Dative:      return this.createDative(opts);
            case Casus.Vocative:    return this.createVocative(opts);
            default:                throw Error(`Invalid casus ${casus}`);
        }
    }

    private createNominative(opts: DeclensionGameOptions): DeclensionChallenge {
        const quis = this.db.getPronoun('quis');
        return this.fillChallenge(opts, Casus.Nominative, quis);
    }

    private createAccusative(opts: DeclensionGameOptions): DeclensionChallenge {
        let indicator: Word | undefined;
        if (opts.knowledge.accPrepositions) {
            indicator = this.randomPreposition(opts, Casus.Accusative);
        }

        if (!indicator) {
            indicator = this.db.getPronoun('quis');
        }

        return this.fillChallenge(opts, Casus.Accusative, indicator);
    }

    private createGenitive(opts: DeclensionGameOptions): DeclensionChallenge {
        const cuius = this.db.getPronoun('quis');
        return this.fillChallenge(opts, Casus.Genitive, cuius);
    }

    private createAblative(opts: DeclensionGameOptions): DeclensionChallenge {
        let indicator: Word | undefined;
        if (opts.knowledge.ablPrepostions) {
            indicator = this.randomPreposition(opts, Casus.Ablative);
        }

        if (!indicator) {
            indicator = this.db.getPreposition('in');
        }

        return this.fillChallenge(opts, Casus.Ablative, indicator);
    }

    private createDative(opts: DeclensionGameOptions): DeclensionChallenge {
        const cui = this.db.getPronoun('quis');
        return this.fillChallenge(opts, Casus.Dative, cui);
    }

    private createVocative(opts: DeclensionGameOptions): DeclensionChallenge {
        const quis = this.db.getPronoun('quis');
        return this.fillChallenge(opts, Casus.Vocative, quis);
    }

    private fillChallenge(opts: DeclensionGameOptions, casus: Casus, indicator: Word): DeclensionChallenge {
        const noun = this.randomNoun(opts, casus);
        const adj = this.randomAdjective(opts, casus);

        if (!noun) {
            throw Error(`No noun for game ${casus}`);
        }

        if (!adj) {
            throw Error(`No adjective for game ${casus}`);
        }

        const genus = noun.genus;
        const words: Word[] = [noun, adj];

        if (opts.knowledge.pronounHic && Math.random() < 0.25) {
            words.unshift(this.db.getPronoun('hic'));
        } else if (opts.knowledge.pronounIlle && Math.random() < 0.25) {
            words.unshift(this.db.getPronoun('ille'));
        } else if (opts.knowledge.pronounIs && Math.random() < 0.25) {
            words.unshift(this.db.getPronoun('is'));
        }

        return {
            indicator: indicator,
            casus: casus,
            number: this.randomNumerus(opts, casus, noun, adj),
            genus: genus,
            words: words,
        };
    }

    public getAnswer(challenge: DeclensionChallenge): string[] {
        const solution: string[] = [];
        
        if (challenge.indicator instanceof Preposition) {
            solution.push(challenge.indicator.latin);
        }

        for (const word of challenge.words) {
            if (word instanceof Noun) {
                const decl = word.decline(challenge.casus, challenge.number);
                if (!decl) {
                    throw Error('No solution');
                }
                solution.push(decl);
            } else if (word instanceof Adjective || word instanceof Pronoun) {
                const decl = word.decline(challenge.genus, challenge.casus, challenge.number);
                if (!decl) {
                    throw Error('No solution');
                }
                solution.push(decl);
            }
        }
        return solution;
    }

    public check(challenge: DeclensionChallenge, response: string): boolean {
        const checkMacrons = (response != stripMacrons(response));
        const isAnswer = response.split(' ').map(w => w.toLowerCase());
        const shouldAnswer = this.getAnswer(challenge);

        if (isAnswer.length != shouldAnswer.length) {
            return false;
        }

        for (const shouldPart of shouldAnswer) {
            let gotPart = false;
            for (const isPart of isAnswer) {
                if ((checkMacrons && isPart == shouldPart) || (!checkMacrons && isPart == stripMacrons(shouldPart))) {
                    gotPart = true;
                    break;
                }
            }
            if (!gotPart) {
                return false;
            }
        }

        return true;
    }

    private randomNoun(opts: DeclensionGameOptions, casus: Casus): Noun | undefined {
        const filter = (noun: Noun): boolean => {
            if (noun.chapter > opts.vocabChapter) {
                return false;
            }

            const decl = opts.knowledge.declensions;
            if (!decl.nounDeclensions.has(noun.declensionType)) {
                return false;
            }

            if (!decl.cases.get(casus)?.genus.has(noun.genus)) {
                return false;
            }

            if (!decl.cases.get(casus)?.numerus.has(Numerus.Plural) && noun.pluraleTantum) {
                return false;
            }

            if (noun.declensionType == NounDeclension.Cons || noun.declensionType == NounDeclension.I) {
                if (noun.genus == Genus.Neuter && !decl.neuterCons) {
                    return false;
                }
            }

            return true;
        };

        return randomElement(this.db.nouns, filter);
    }

    private randomAdjective(opts: DeclensionGameOptions, casus: Casus): Adjective | undefined {
        const filter = (adj: Adjective): boolean => {
            if (adj.chapter > opts.vocabChapter) {
                return false;
            }

            const decl = opts.knowledge.declensions;
            if (!decl.adjectiveDeclensions.has(adj.declensionType)) {
                return false;
            }

            if (!decl.cases.get(casus)?.numerus.has(Numerus.Plural) && adj.pluraleTantum) {
                return false;
            }

            return true;
        };

        return randomElement(this.db.adjectives, filter);
    }

    private randomNumerus(opts: DeclensionGameOptions, casus: Casus, noun: Noun, adj: Adjective): Numerus {
        if (noun.pluraleTantum || adj.pluraleTantum) {
            return Numerus.Plural;
        } else if (!opts.knowledge.declensions.cases.get(casus)?.numerus.has(Numerus.Plural)) {
            return Numerus.Singular;
        } else if (casus == Casus.Nominative) {
            return Numerus.Plural;
        } else {
            return Math.random() < 0.5 ? Numerus.Singular : Numerus.Plural;
        }
    }

    private randomPreposition(opts: DeclensionGameOptions, casus: Casus): Preposition | undefined {
        const filter = (prp: Preposition): boolean => {
            if (prp.chapter > opts.vocabChapter) {
                return false;
            }

            if (!prp.cases.includes(casus) || prp.cases.length != 1) {
                return false;
            }

            return true;
        };

        return randomElement(this.db.prepositions, filter);
    }
}
