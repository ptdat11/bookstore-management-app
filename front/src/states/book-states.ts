import { atom, selector } from "recoil";
import Book from "../interfaces/book";
import LocalStorage from "../submodules/local-storage/local-storage";
import AppConstraint from "../interfaces/app-constraint";

export const importFlagState = atom<boolean>({
    key: "BOOK_IMPORT_COUNT",
    default: false
});
export const importFlagSelector = selector<boolean>({
    key: "",
    get: ({get}) => {
        return get(importFlagState);
    }
})

export const importBookState = atom<Book[]>({
    key: "BOOK_IMPORT",
    default: [{ 
        id: 0, 
        Name: "", 
        Category: "", 
        Author: "", 
        Amount: LocalStorage.get<AppConstraint>("settings")?.MinImport as number, 
        ImportPrice: 0 
    }]
});

export const billDetailState = atom<Book[]>({
    key: "BILL_DETAIL",
    default: [{ 
        id: 0, 
        Name: "", 
        Category: "", 
        Author: "", 
        Amount: 1, 
        ImportPrice: 0 
    }]
});

export const categoryCriterionState = atom<string[]>({
    key: "CATEGORY_CRITERION",
    default: []
});

export const authorCriterionState = atom<string[]>({
    key: "AUTHOR_CRITERION",
    default: []
});