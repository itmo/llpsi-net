import { WordType } from "../types/WordType";
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

import { WordData } from "../WordData";

export abstract class Word {
    private data: WordData;
    private lemma_: string;

    constructor(data: WordData, lemma: string) {
        this.data = data;
        this.lemma_ = lemma;
    }

    public get type(): WordType {
        return this.data.wordType;
    }

    public get chapter(): number {
        return this.data.chapter;
    }

    public get lemma(): string {
        return this.lemma_;
    }

    public get german(): string {
        return this.data.german;
    }

    public get english(): string {
        return this.data.english;
    }

    public get references(): string {
        return this.data.reference;
    }
}
