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

export interface DeclensionOverrides {
    nomSg: string | null;
    accSg: string | null;
    genSg: string | null;
    datSg: string | null;
    ablSg: string | null;
    vocSg: string | null;

    nomPl: string | null;
    accPl: string | null;
    genPl: string | null;
    datPl: string | null;
    ablPl: string | null;
    vocPl: string | null;
}

export type WordData =  AdjectiveData | AdverbData | ConjunctionData |
                        InterjectionData | InterrogativeData | NounData |
                        NumeralData | PrepositionData | PronounData | VerbData;

export interface BaseWord {
    chapter: number;
    reference: string;
    english: string;
    german: string;
}

export interface AdjectiveData extends BaseWord {
    wordType: WordType.Adjective;
    latinMale: string;
    latinFemale: string;
    latinNeuter: string;
    genitiveIus: string;
    overrides: string;
}

export interface AdverbData extends BaseWord  {
    wordType: WordType.Adverb;
    latin: string;
}

export interface ConjunctionData extends BaseWord  {
    wordType: WordType.Conjunction;
    latin: string;
}

export interface InterjectionData extends BaseWord  {
    wordType: WordType.Interjection;
    latinSingular: string;
    latinPlural: string;
}

export interface InterrogativeData extends BaseWord  {
    wordType: WordType.Interrogative;
    latin: string;
}

export interface NounData extends BaseWord  {
    wordType: WordType.Noun;
    latinNominative: string;
    latinGenitive: string;
    pluraleTantum: string;
    genus: string;
    iStemType: '' | 'mixed' | 'pure';
    overrides: string;
}

export interface NumeralData extends BaseWord  {
    wordType: WordType.Numeral;
    latin: string;
    nominativePlural: string;
    genitivePlural: string;
}

export interface PrepositionData extends BaseWord  {
    wordType: WordType.Preposition;
    latin: string;
    case: string;
}

export interface PronounData extends BaseWord  {
    wordType: WordType.Pronoun;
    nominativeSingular: string;
    genitiveSingular: string;
    genus: string;
}

export interface VerbData extends BaseWord  {
    wordType: WordType.Verb;
    latin: string;
    other: string;
}
