const isJson = (json: string): boolean => {
    try {
        JSON.parse(json);
    }
    catch {
        return false;
    }
    return true;
}

export default isJson;