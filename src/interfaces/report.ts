export default interface Report {
    Name?: string,
    result_by_month?: {
        FirstAmount: number,
        ImportCount: number,
        LastAmount: number,
    }
};