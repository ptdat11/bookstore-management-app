const combineClassnames = (...classes: (string | undefined)[]): string | undefined => {
    let result = classes.
        filter((val) => {
            return (val !== undefined && val != null && val !== "")
        }).
        join(" ");

    return result;
}

export default combineClassnames;