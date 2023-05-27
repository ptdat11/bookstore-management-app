export interface BooksGET {
    Author?: string,
    Category?: string,
    Name?: string,
    Amount?: number,
    ImportPrice?: number
};

export interface BooksPerMonthGET {
    month?: number,
    year?: number
};