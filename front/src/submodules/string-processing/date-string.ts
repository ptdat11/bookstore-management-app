export const dateToString = (date: Date): string | undefined => {
    return date.toISOString().split("T")[0];
};

export const dateTimeToLocalISOString = (date: Date) : string | undefined => {
    let tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(Date.now() - tzOffset).toISOString().slice(0, 16);
}