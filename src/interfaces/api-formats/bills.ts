export interface BillPOST {
    Customer: {
        FullName: string,
        PhoneNumber: string
    },
    BillDate: string,
    BillDetails: {
        Book: {
            Name: string,
            Category: string
        },
        Amount: number,
        SoldPrice: number
    }[],
    TotalPrice: number,
    Paid: number,
    Debt: number
};