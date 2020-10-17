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

import { macronSort } from "./common";
import { WordType } from "./types/WordType";
import { WordData } from "./WordData";
import { Adjective } from "./words/Adjective";
import { Adverb } from "./words/Adverb";
import { Conjunction } from "./words/Conjunction";
import { Interjection } from "./words/Interjection";
import { Interrogative } from "./words/Interrogative";
import { Noun } from "./words/Noun";
import { Numeral } from "./words/Numeral";
import { Preposition } from "./words/Preposition";
import { Pronoun } from "./words/Pronoun";
import { Verb } from "./words/Verb";
import { Word } from "./words/Word";

export class WordDB {
    // Declined
    public nouns: Noun[] = [];
    public numerals: Numeral[] = [];
    public adjectives: Adjective[] = [];
    public pronouns: Pronoun[] = [];

    // Conjugated
    public verbs: Verb[] = [];

    // Particles
    public adverbs: Adverb[] = [];
    public conjunctions: Conjunction[] = [];
    public interjections: Interjection[] = [];
    public interrogatives: Interrogative[] = [];
    public prepositions: Preposition[] = [];

    private maxChapter_: number = 0;

    public constructor(data: WordData[]) {
        this.loadWords(data);
    }

    public get maxChapter() {
        return this.maxChapter_;
    }

    public getVerb(lemma: string): Verb {
        return this.getWord<Verb>(this.verbs, lemma);
    }

    public getPreposition(lemma: string): Word {
        return this.getWord<Preposition>(this.prepositions, lemma);
    }

    public getNoun(lemma: string): Noun {
        return this.getWord<Noun>(this.nouns, lemma);
    }

    public getPronoun(lemma: string): Pronoun {
        return this.getWord<Pronoun>(this.pronouns, lemma);
    }

    public getInterjection(lemma: string): Interjection {
        return this.getWord<Interjection>(this.interjections, lemma);
    }

    private getWord<T extends Word>(coll: T[], lemma: string): T {
        const word = coll.find(p => p.lemma == lemma);
        if (!word) {
            throw Error(`Word ${lemma} not found`);
        }
        return word;
    }

    private loadWords(data: WordData[]): void {
        data.forEach(entry => this.addWord(entry));
        this.sortLists([
            this.adverbs, this.adjectives, this.conjunctions, this.interjections,
            this.interrogatives, this.nouns, this.numerals, this.prepositions,
            this.pronouns, this.verbs
        ]);

        for (const word of this.nouns) {
            if (word.chapter > this.maxChapter_) {
                this.maxChapter_ = word.chapter;
            }
        }
    }

    private sortLists(lists: Word[][]) {
        const lemmaSort = (a: Word, b: Word) => macronSort(a.lemma.toLowerCase(), b.lemma.toLowerCase());
        for (const list of lists) {
            list.sort(lemmaSort);
        }
    }

    private addWord(data: WordData) {
        switch (data.wordType) {
            case WordType.Adjective:
                const adj = new Adjective(data);
                this.adjectives.push(adj);
                break;
            case WordType.Adverb:
                const adverb = new Adverb(data);
                this.adverbs.push(adverb);
                break;
            case WordType.Conjunction:
                const conj = new Conjunction(data);
                this.conjunctions.push(conj)
                break;
            case WordType.Interjection:
                const inj = new Interjection(data);
                this.interjections.push(inj);
                break;
            case WordType.Interrogative:
                const intr = new Interrogative(data);
                this.interrogatives.push(intr);
                break;
            case WordType.Noun:
                const noun = new Noun(data);
                this.nouns.push(noun)
                break;
            case WordType.Numeral:
                const numr = new Numeral(data);
                this.numerals.push(numr);
                break;
            case WordType.Preposition:
                const prp = new Preposition(data);
                this.prepositions.push(prp);
                break;
            case WordType.Pronoun:
                const prn = new Pronoun(data);
                this.pronouns.push(prn);
                break;
            case WordType.Verb:
                const verb = new Verb(data);
                this.verbs.push(verb);
                break;
        }
    }
}
