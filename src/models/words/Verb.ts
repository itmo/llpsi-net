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

import { Word } from "./Word";
import { VerbData } from "../WordData";
import { LaVerb } from "../conjugations/LaVerb";
import { laVerbToConjugation, VerbConjugation } from "../conjugations/Conjugation";

export class Verb extends Word {
    private static laVerb = new LaVerb();
    private infinitive_: string;
    private conjugation_: string;
    private stemChapter_: number;

    public constructor(data: VerbData) {
        super(data, `${data.latin}`);
        this.infinitive_ = data.latin;
        this.conjugation_ = data.conjugation;
        this.stemChapter_ = Number.parseInt(data.stemChapter) || 0;
    }

    public get infinitive(): string {
        return this.infinitive_;
    }

    public get stemChapter(): number {
        return this.stemChapter_;
    }

    public conjugate(): VerbConjugation {
        const args = LaVerb.argsFromDesc(this.conjugation_);
        const [data, info] = Verb.laVerb.make_data(args);
        return laVerbToConjugation(data, info);
    }
}
