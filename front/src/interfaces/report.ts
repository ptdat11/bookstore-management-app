export interface BookReport {
    Name?: string,
    result_by_month?: {
        FirstAmount: number,
        ImportCount: number,
        LastAmount: number,
    }
};

export interface DebtReport {
    PhoneNumber?: string,
    result_by_month?: {
        FirstDebt: number,
        DebtSum: number,
        LastDebt: number
    }
}