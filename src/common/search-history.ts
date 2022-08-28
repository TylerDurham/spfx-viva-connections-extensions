export interface ISearchHistoryItem {
    searchTerm: string;
    hits: number;
    lastUsed: Date;
}

const KEY = "SPFX-VIVA-SEARCH-HISTORY"

export default class SearchHistory {

    private maxSearchHistory: number;
    private items: ISearchHistoryItem[];

    constructor(maxSearchHistory: number) {
        this.init();
        this.maxSearchHistory = maxSearchHistory;
    }

    private init(): void {
        try {
            this.items = JSON.parse(window.localStorage.getItem(KEY));
        } catch (e) {
            this.items = [];
        }
    }

    private createItem(searchTerm: string, hits: number = 1, lastUsed?: Date): ISearchHistoryItem {
        return {
            searchTerm, hits,
            lastUsed: (lastUsed === undefined) ? new Date(Date.now()) : lastUsed
        }
    }

    public add(searchTerm: string): void {
        if (this.items === null) {
            this.items = [];
        }

        const matches = this.items.filter((item) => {
            return searchTerm.toUpperCase() === item.searchTerm.toUpperCase()
        });

        if (matches.length) {
            matches[0].searchTerm = searchTerm;
            matches[0].hits += 1;
            matches[0].lastUsed = new Date(Date.now())
        } else {
            if (this.items.length === this.maxSearchHistory) {
                // Make room for a new item
                this.items.shift();
            }

            this.items.push({searchTerm, hits: 1, lastUsed: new Date(Date.now())})
        }

        this.items = this.items.sort((a: ISearchHistoryItem, b: ISearchHistoryItem): number => {
            return b.lastUsed.valueOf() - a.lastUsed.valueOf();
        })

        window.localStorage.setItem(KEY, JSON.stringify(this.items))
    }

    public find(searchTerm: string): ISearchHistoryItem[] {
        if (this.items === null) { this.items = []}
        return this.items.filter((item) => {
            return item.searchTerm.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1
        })
    }
}