import { atom, selectorFamily } from "recoil";
import LocalStorage from "../submodules/local-storage/local-storage";

export const pageState = atom<number>({
    key: "SYSTEM_PAGE",
    default: 3
});

export const themeState = atom<string>({
    key: "SYSTEM_THEME",
    default: LocalStorage.get("theme")
});

export const urlPrefixState = atom<string>({
    key: "SYSTEM_URL_PREFIX",
    default: "https://qlns.dipicorp.com"
});

export type BookAPI = "books" | "import-logs-create" | "settings" | "books-per-month" | "bills" | "debt-logs" | "customers-per-month" | "customers";
export const apiUrlSelector = selectorFamily({
    key: "SYSTEM_API_URL",
    get: (api: BookAPI) => ({ get }) => {
        return `${get(urlPrefixState)}/api/${api}`;
    }
});