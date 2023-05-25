import { atom } from "recoil";
import Book from "../interfaces/book";

export const importCountState = atom<number>({
    key: "BOOK_IMPORT_COUNT",
    default:0
});

export const importBookState = atom<Book[]>({
    key: "BOOK_IMPORT",
    default: [
        { id: 0, Name: "", Category: "", Author: "", Amount: 0, ImportPrice: 0 }
    ]
});

export const billDetailState = atom<Book[]>({
    key: "BILL_DETAIL",
    default: [
        { id: 0, Name: "", Category: "", Author: "", Amount: 0, ImportPrice: 0 }
    ]
});

export const categoryCriterionState = atom<string[]>({
    key: "CATEGORY_CRITERION",
    default: []
});

export const authorCriterionState = atom<string[]>({
    key: "AUTHOR_CRITERION",
    default: []
});