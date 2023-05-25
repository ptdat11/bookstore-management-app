import { atom } from "recoil";
import LocalStorage from "../submodules/local-storage/local-storage";

export const pageState = atom<number>({
    key: "SYSTEM_PAGE",
    default: 3
});

export const themeState = atom<string>({
    key: "SYSTEM_THEME",
    default: LocalStorage.get("theme")
})