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
import { Noun } from "./words/Noun";
import { Numeral } from "./words/Numeral";
import { Preposition } from "./words/Preposition";
import { Pronoun } from "./words/Pronoun";
import { Verb } from "./words/Verb";
import { Word } from "./words/Word";

export interface WordList {
    // Declined
    nouns: Noun[];
    numerals: Numeral[];
    adjectives: Adjective[];
    pronouns: Pronoun[];

    // Conjugated
    verbs: Verb[];

    // Particles
    adverbs: Adverb[];
    conjunctions: Conjunction[];
    interjections: Interjection[];
    prepositions: Preposition[];
}

export class WordDB {
    public words: WordList = {
        nouns: [],
        numerals: [],
        adjectives: [],
        pronouns: [],
        verbs: [],
        adverbs: [],
        conjunctions: [],
        interjections: [],
        prepositions: []
    };
    private maxChapter_: number = 0;

    public constructor(data: WordData[]) {
        this.loadWords(data);
    }

    public get maxChapter() {
        return this.maxChapter_;
    }

    public getVerb(lemma: string): Verb {
        return this.getWord<Verb>(this.words.verbs, lemma);
    }

    public getPreposition(lemma: string): Word {
        return this.getWord<Preposition>(this.words.prepositions, lemma);
    }

    public getNoun(lemma: string): Noun {
        return this.getWord<Noun>(this.words.nouns, lemma);
    }

    public getPronoun(lemma: string): Pronoun {
        return this.getWord<Pronoun>(this.words.pronouns, lemma);
    }

    public getInterjection(lemma: string): Interjection {
        return this.getWord<Interjection>(this.words.interjections, lemma);
    }

    public getChapterWords(chapter: number): WordList {
        const filter = (word: Word) => word.chapter == chapter;
        return {
            nouns: this.words.nouns.filter(filter),
            numerals: this.words.numerals.filter(filter),
            adjectives: this.words.adjectives.filter(filter),
            pronouns: this.words.pronouns.filter(filter),
            verbs: this.words.verbs.filter(filter),
            adverbs: this.words.adverbs.filter(filter),
            conjunctions: this.words.conjunctions.filter(filter),
            interjections: this.words.interjections.filter(filter),
            prepositions: this.words.prepositions.filter(filter),
        };
    }

    private getWord<T extends Word>(coll: T[], lemma: string): T {
        const word = coll.find(p => p.lemma == lemma);
        if (!word) {
            throw Error(`Word ${lemma} not found`);
        }
        return word;
    }

    private loadWords(data: WordData[]): void {
        for (const word of data) {
            if (word.meta && word.meta.includes("type=name")) {
                continue;
            }
            this.addWord(word);
        }

        this.sortLists([
            this.words.adverbs, this.words.adjectives, this.words.conjunctions, this.words.interjections,
            this.words.nouns, this.words.numerals, this.words.prepositions,
            this.words.pronouns, this.words.verbs
        ]);

        for (const word of this.words.nouns) {
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
                this.words.adjectives.push(adj);
                break;
            case WordType.Adverb:
                const adverb = new Adverb(data);
                this.words.adverbs.push(adverb);
                break;
            case WordType.Conjunction:
                const conj = new Conjunction(data);
                this.words.conjunctions.push(conj)
                break;
            case WordType.Interjection:
                const inj = new Interjection(data);
                this.words.interjections.push(inj);
                break;
            case WordType.Noun:
                const noun = new Noun(data);
                this.words.nouns.push(noun)
                break;
            case WordType.Numeral:
                const numr = new Numeral(data);
                this.words.numerals.push(numr);
                break;
            case WordType.Preposition:
                const prp = new Preposition(data);
                this.words.prepositions.push(prp);
                break;
            case WordType.Pronoun:
                const prn = new Pronoun(data);
                this.words.pronouns.push(prn);
                break;
            case WordType.Verb:
                const verb = new Verb(data);
                this.words.verbs.push(verb);
                break;
        }
    }
}
