import levenshteinDistance from "./levenshtein-distance";

const suggestWords = (query: string, from: string[]) => {
    query = query.toLowerCase();
    const lowerFrom = from.map(str => str.toLowerCase());

    const matchedIndex: number[] = [];
    lowerFrom.forEach((str, index) => {
        if (
            str.includes(query) ||
            levenshteinDistance(query, str) < 3
        ) {
            matchedIndex.push(index);
        }
    });

    return matchedIndex.map((i) => from[i]);
};

export default suggestWords;