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
import { laVerbToConjugation, VerbConjugation } from "../conjugations/Conjugation";
import { LaVerb, parse_template, remove_links } from "@fpw/en-wiktionary-la-modules";

export class Verb extends Word {
    private static laVerb = new LaVerb({
        suppressPassiveRe: true,
        suppressPerfectEre: true,
        suppressUndVariants: true,
        suppressIPerfect: true,
        suppressPoet: true
    });
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

    public get fullEntry(): string {
        const conj = this.conjugate();

        let str = this.infinitive;
        if (conj.active.indicative.perfect?.infinitive) {
            if (conj.active.indicative.perfect.infinitive.length > 0) {
                str += ";";
                str += conj.active.indicative.perfect.infinitive.join(', ');
            }
        }

        if (conj.supine.acc) {
            if (conj.supine.acc.length > 0) {
                str += ";";
                str += conj.supine.acc.join(', ');
            }
        }

        return remove_links(str);
    }

    public conjugate(): VerbConjugation {
        const args = parse_template(this.conjugation_);
        const conj = Verb.laVerb.make_data(args);
        return laVerbToConjugation(conj);
    }
}
