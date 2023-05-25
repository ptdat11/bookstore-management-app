export interface DebtLogsPOST {
    Customer: {
        FullName: string,
        Address: string,
        PhoneNumber: string,
        Email: string
    },
    DebtDate: string,
    Paid: number
};