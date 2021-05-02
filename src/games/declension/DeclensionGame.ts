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
import { Casus } from "../../models/types/Casus";
import { Genus } from "../../models/types/Genus";
import { NounDeclension } from "../../models/types/NounDeclension";
import { Numerus } from "../../models/types/Numerus";
import { WordDB } from "../../models/WordDB";
import { Adjective } from "../../models/words/Adjective";
import { Interjection } from "../../models/words/Interjection";
import { Noun } from "../../models/words/Noun";
import { Preposition } from "../../models/words/Preposition";
import { Pronoun } from "../../models/words/Pronoun";
import { Word } from "../../models/words/Word";
import { DeclensionChallenge } from "./DeclensionChallenge";
import { DeclensionGameOptions } from "./DeclensionGameOptions";

interface NounTuple {
    decl: NounDeclension;
    genus: Genus;
    casus: Casus;
    num: Numerus;
}

interface ScoreTuple {
    numCorrect: number;
    numTotal: number;
}

export interface DeclensionGameState {
    opts: DeclensionGameOptions;

    nounPoints: Map<NounTuple, ScoreTuple>;

    pendingChallenge: DeclensionChallenge;
}

export class DeclensionGame {
    private db: WordDB;
    private pronouns: Pronoun[];

    constructor(db: WordDB) {
        this.db = db;
        this.pronouns =
            ['aliquis', 'hic', 'īdem', 'ille', 'ipse', 'is', 'iste', 'quīdam']
            .map(p => this.db.getPronoun(p));
    }

    public initState(opts: DeclensionGameOptions): DeclensionGameState {
        const nounPoints = new Map<NounTuple, ScoreTuple>();

        opts.knowledge.declensions.cases.forEach((casusKnowlege, casus) => {
            opts.knowledge.declensions.nounDeclensions.forEach((declKnowledge, decl) => {
                declKnowledge.genera.forEach(genus => {
                    if (casusKnowlege.genera.has(genus)) {
                        casusKnowlege.numeri.forEach(numerus => {
                            const tuple: NounTuple = {
                                casus: casus,
                                genus: genus,
                                decl: decl,
                                num: numerus,
                            };
                            nounPoints.set(tuple, {numCorrect: 0, numTotal: 0});
                        });
                    }
                });
            });
        });

        return {
            opts: opts,
            nounPoints: new Map(),
            pendingChallenge: this.createChallenge(opts),
        };
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
        if (opts.knowledge.declensions.accPrepositions) {
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
        if (opts.knowledge.declensions.ablPrepostions) {
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
        const o = this.db.getInterjection('ō');
        return this.fillChallenge(opts, Casus.Vocative, o);
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
        const numerus = this.randomNumerus(opts, casus, noun, adj);

        if (opts.knowledge.declensions.pronouns && Math.random() < 0.6) {
            const pronoun = this.randomPronoun(opts, casus, genus, numerus);
            if (pronoun) {
                words.unshift(pronoun);
            }
        }

        return {
            indicator: indicator,
            casus: casus,
            number: numerus,
            genus: genus,
            words: words,
        };
    }

    public getAnswer(challenge: DeclensionChallenge): string[] {
        const solution: string[] = [];

        if (challenge.indicator instanceof Preposition) {
            solution.push(challenge.indicator.latin);
        } else if (challenge.indicator instanceof Interjection) {
            solution.push(challenge.indicator.decline(challenge.number));
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
        const shouldAnswer = this.getAnswer(challenge).map(w => w.toLowerCase());

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
        // first, find all nouns that could be used
        const filter = (noun: Noun): boolean => {
            if (noun.chapter > opts.vocabChapter) {
                return false;
            }

            if (noun.isGrammaticalTerm) {
                return false;
            }

            const decl = opts.knowledge.declensions;
            if (!decl.nounDeclensions.get(noun.declensionType)?.genera.has(noun.genus)) {
                return false;
            }

            if (!decl.cases.get(casus)?.genera.has(noun.genus)) {
                return false;
            }

            if (!decl.cases.get(casus)?.numeri.has(Numerus.Plural) && noun.pluraleTantum) {
                return false;
            }

            return true;
        };

        const filtered = this.db.words.nouns.filter(filter);

        // now try to equally choose between the declensions
        const decl = randomElement(Array.from(opts.knowledge.declensions.nounDeclensions.keys()));
        const noun = randomElement(filtered, n => {
            return n.declensionType == decl;
        });

        if (noun) {
            return noun;
        } else {
            // if not possible (for example, when vocabChapter < grammarChapter), use any declension
            return randomElement(filtered);
        }
    }

    private randomPronoun(opts: DeclensionGameOptions, casus: Casus, genus: Genus, numerus: Numerus): Pronoun | undefined {
        // first, find all pronouns that could be used
        const filter = (pronoun: Pronoun): boolean => {
            if (pronoun.chapter > opts.vocabChapter) {
                return false;
            }

            const word = pronoun.decline(genus, casus, numerus);
            if (!word) {
                return false;
            }

            return true;
        };

        const pronoun = randomElement(this.pronouns, filter);

        if (pronoun) {
            return pronoun;
        }
    }

    private randomAdjective(opts: DeclensionGameOptions, casus: Casus): Adjective | undefined {
        const filter = (adj: Adjective): boolean => {
            if (adj.chapter > opts.vocabChapter) {
                return false;
            }

            if (adj.isGrammaticalTerm) {
                return false;
            }

            const decl = opts.knowledge.declensions;
            if (!decl.adjectiveDeclensions.has(adj.declensionType)) {
                return false;
            }

            if (!decl.cases.get(casus)?.numeri.has(Numerus.Plural) && adj.pluraleTantum) {
                return false;
            }

            return true;
        };

        const filtered = this.db.words.adjectives.filter(filter);

        // now try to equally choose between the declensions
        const decl = randomElement(Array.from(opts.knowledge.declensions.adjectiveDeclensions.keys()));
        const adj = randomElement(filtered, n => {
            return n.declensionType == decl;
        });

        if (adj) {
            return adj;
        } else {
            // if not possible (for example, when vocabChapter < grammarChapter), use any declension
            return randomElement(filtered);
        }
    }

    private randomNumerus(opts: DeclensionGameOptions, casus: Casus, noun: Noun, adj: Adjective): Numerus {
        if (noun.pluraleTantum || adj.pluraleTantum) {
            return Numerus.Plural;
        } else if (!opts.knowledge.declensions.cases.get(casus)?.numeri.has(Numerus.Plural)) {
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

        return randomElement(this.db.words.prepositions, filter);
    }
}
