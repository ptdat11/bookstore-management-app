export default interface ImportLogPOST {
    ImportDate: string,
    Book: {
        Name: string,
        Category: string,
        Author: string,
        ImportPrice: number
    },
    Amount: number,
    TotalPrice: number
}[];