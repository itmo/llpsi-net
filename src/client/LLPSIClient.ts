import { FormRes, LemmatizeRes, QuoteRes, SenseRes } from "./APITypes";

export class LLPSIClient {
    private base: string;

    public constructor(base: string) {
        this.base = base;
    }

    public async quoteFR(chapter: number, line: number): Promise<QuoteRes> {
        const url = this.base + `/quote/Familia Romana/${chapter}/${line}`;
        const res = await this.get<QuoteRes>(url);
        return res;
    }

    public async lookupForm(form: string, refLimit: number, quoteLimit: number, exact: boolean): Promise<FormRes> {
        const url = this.base + `/forms/${encodeURIComponent(form)}?refLimit=${refLimit}&quoteLimit=${quoteLimit}&exact=${exact}`;
        const res = await this.get<FormRes>(url);
        return res;
    }

    public async lookupSense(lang: string, sense: string, limit: number): Promise<SenseRes> {
        const url = this.base + `/senses/${lang}/${encodeURIComponent(sense)}?limit=${limit}`;
        const res = await this.get<SenseRes>(url);
        return res;
    }

    public async lemmatize(words: string[], exact: boolean): Promise<LemmatizeRes> {
        const url = this.base + `/lemmatize?exact=${exact}`;
        const res = await this.post<LemmatizeRes>(url, {words: words});
        return res;
    }

    private async get<T>(url: string): Promise<T> {
        const params: RequestInit = {
            headers: {
                "content-type": "application/json; charset=UTF-8",
            },
        };
        const res = await fetch(url, params);
        const json = await res.json();
        return json as T;
    }

    private async post<T>(url: string, data: any): Promise<T> {
        const params: RequestInit = {
            headers: {
                "content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(data),
            method: "POST",
        };
        const res = await fetch(url, params);
        const json = await res.json();
        return json as T;
    }
}
