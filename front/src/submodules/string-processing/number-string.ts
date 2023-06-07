export const stringToStrNumber = (str: string): string => {
    let num = str.split(",").join("");
    // console.log(str);

    if (num === "NaN") {
        return "0";
    }
    return Number(num).toLocaleString();
}