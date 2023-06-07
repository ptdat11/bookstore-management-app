import isJson from "../string-processing/is-json";
import LocalStorageKey from "./local-storage-keys";

class LocalStorage {
    static get<T extends unknown> (key: LocalStorageKey): T | undefined {
        let rawVal = localStorage[key];
        if (
            !rawVal ||
            ["number", "bigint", "boolean"].includes(typeof rawVal) ||
            !isJson(rawVal)
        ) {
            return rawVal;
        }

        return JSON.parse(rawVal);
    }

    static set(key: LocalStorageKey, value: unknown) {
        if (
            !value ||
            ["string", "number", "bigint", "boolean"].includes(typeof value)
        ) {
            localStorage[key] = value;
            return;
        }

        localStorage[key] = JSON.stringify(value);
    }
}

export default LocalStorage;