import { macronSort, stripMacrons } from "./common";
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

import { WordType } from "./types/WordType";
import { WordData } from "./WordData";
import { Adjective } from "./words/Adjective";
import { Noun } from "./words/Noun";
import { Word } from "./words/Word";

export class WordDB {
    private allWords: Word[] = [];
    private nouns_: Noun[] = [];
    private adjectives_: Adjective[] = [];

    public constructor(data: WordData[]) {
        this.loadWords(data);
    }

    public get nouns(): Noun[] {
        return this.nouns_;
    }

    public get adjectives(): Adjective[] {
        return this.adjectives_;
    }

    private loadWords(data: WordData[]): void {
        for (const entry of data) {
            switch (entry.wordType) {
                case WordType.Noun:
                    const noun = new Noun(entry);
                    this.allWords.push();
                    this.nouns_.push(noun)
                    break;
                case WordType.Adjective:
                    const adj = new Adjective(entry);
                    this.allWords.push(adj);
                    this.adjectives_.push(adj);
                    break;
            }
        }

        this.nouns_.sort((a, b) => macronSort(a.lemma.toLowerCase(), b.lemma.toLowerCase()));
        this.adjectives_.sort((a, b) => macronSort(a.lemma.toLowerCase(), b.lemma.toLowerCase()));
    }
}
