export interface QuoteRes {
    page: number;
    lines: string[];
}

export interface WordRes {
    lemma: string;
    data: string;
    senses: {
        english: string[];
        german: string[];
    };
    meta: {
        llpsiChapter?: number;
        llpsiRef?: string;
        wiktionaryLemma?: string;
    };
    quotes: BookEntry[];
}

export interface FormTuple {
    key: string;
    form: string;
}

export interface DictEntry {
    word: WordRes;
    dictionary: string;
    forms: FormTuple[];
    parent?: WordRes;
    suffix?: WordRes;
}

export interface BookEntry {
    book: string;
    chapter: number;
    line: number;
    form: string;
    quote: QuoteRes;
}

export interface FormRes {
    lemmata: DictEntry[];
    books: BookEntry[];
}

export interface SenseRes {
    dicts: {
        dictionary: string;
        words: WordRes[];
    }[];
}

// gets list of forms as string[]
export interface LemmatizeRes {
    words: DictEntry[];

    // input index to words indices
    forms: number[][];
}
