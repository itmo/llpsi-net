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

export type WordData =  AdjectiveData | AdverbData | ConjunctionData |
                        InterjectionData | NounData |
                        NumeralData | PrepositionData | PronounData | VerbData |
                        SynonymData;

export interface BaseWord {
    chapter: number;
    grammaticalTerm: boolean;
    reference: string;
    english: string;
    german: string;
    meta: string;
}

export interface AdjectiveData extends BaseWord {
    wordType: WordType.Adjective;
    latinMale: string;
    latinFemale: string;
    latinNeuter: string;
    latinGenitive: string;
    stemType: string;
    pronominal: string;
    overrides: string;
    declension: string;

    // these can be lists joined by ","
    comparative: string;
    superlative: string;
    adverb: string;
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

export interface NounData extends BaseWord  {
    wordType: WordType.Noun;
    latinNominative: string;
    latinGenitive: string;
    pluraleTantum: string;
    genus: string;
    iStemType: '' | 'mixed' | 'pure';
    overrides: string;
    declension: string;
}

export interface NumeralData extends BaseWord  {
    wordType: WordType.Numeral;
    latin: string;
    number: string;
}

export interface PrepositionData extends BaseWord  {
    wordType: WordType.Preposition;
    latin: string;
    case: string;
}

export interface PronounData extends BaseWord  {
    wordType: WordType.Pronoun;
    latinMale: string;
    latinFemale: string;
    latinNeuter: string;
    genitiveSingular: string;
    genus: string;
    declension: string;
}

export interface SynonymData extends BaseWord  {
    wordType: WordType.Synonym;
    latin: string;
    refType: string;
    refLemma: string;
}

export interface VerbData extends BaseWord  {
    wordType: WordType.Verb;
    latin: string;
    conjugation: string;
    stemChapter: string;
    other: string;
}

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
