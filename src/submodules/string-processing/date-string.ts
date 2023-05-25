export const dateToString = (date: Date): string | undefined => {
    return date.toISOString().split("T")[0];
};