import { InsiteSearchResultItem } from './insiteSearchResultItem';

export class InsiteSearchResult {
    spellCorrectedQuery: string;
    originalQuery: string;
    count: number;
    resultItems: InsiteSearchResultItem[];
}
