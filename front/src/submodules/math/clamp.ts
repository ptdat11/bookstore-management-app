export const clamp = (num: number | undefined, min: number, max: number): number => {
    if (min > max) {
        return num ?? 0;
    }

    if (Number.isNaN(num) || num == undefined || num < min) {
        return min;
    }

    if (!Number.isFinite(num) || num > max) {
        return max;
    }

    return num;
};