import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { BasePropsPage } from "../../submodules/base-props/base-props";
import { useRecoilState, useRecoilValue } from "recoil";
import { importBookState, importFlagState } from "../../states/book-states";
import PageLayout from "../../components/layout/page-layout/PageLayout";
import { dateToString } from "../../submodules/string-processing/date-string";
import Table from "../../components/table/Table";
import TableRow from "../../components/table/TableRow";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import TableCell from "../../components/table/TableCell";
import { toast } from "react-toastify";
import Hr from "../../components/Hr";
import LargeButton from "../../components/button/LargeButton";
import LocalStorage from "../../submodules/local-storage/local-storage";
import AppConstraint from "../../interfaces/app-constraint";
import PlusButton from "../../components/button/PlusButton";
import Book from "../../interfaces/book";
import { jsonFetch } from "../../submodules/networking/jsonFetch";
import ImportLogPOST from "../../interfaces/api-formats/import-logs-create";
import CardRef from "../../interfaces/refs/card-ref";
import Input from "../../components/form-input/Input";
import useFetch from "../../hooks/useFetch";
import { apiUrlSelector } from "../../states/system-states";

interface Props extends BasePropsPage {}

const ImportPage = React.memo((props: Props) => {
    const [books, setBooks] = useRecoilState(importBookState);
    const [date, setDate] = useState<Date>(new Date());
    const booksApiUrl = useRecoilValue(apiUrlSelector("books"));
    const importApiUrl = useRecoilValue(apiUrlSelector("import-logs-create"));
    const [importFlag, setImportFlag] = useRecoilState(importFlagState);
    const newBookNameRef = useRef<CardRef>(null);
    
    const importedBooks = useFetch<Book[]>({
        url: booksApiUrl,
        method: "GET"
    }, [importFlag]);

    useEffect(() => {
        newBookNameRef.current?.focus();
    }, [books.length]);

    const deleteBookAt = (index: number) => {
        const newBooks = books.filter(book => book.id !== index).map(book => {
            if (book.id < index) {
                return book;
            }

            return { ...book, id: book.id - 1 }
        });
        setBooks(newBooks);
    };

    const handleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(e.target.value);
        setDate(newDate);
    };

    const handleClickAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        let newId = books.length === 0 ? 0 : books.at(-1)?.id as number + 1;

        const lastBook = books.at(-1) as Book;
        if (newId > 0 && [lastBook.Name, lastBook.Category, lastBook.Author].includes("")) {
            toast.warn("Cần điền đủ thông tin để thêm sách", { toastId: "IMPORT_NOT_COMPLETE" });
            newBookNameRef.current?.focus();
            return;
        }

        const newBooks: Book[] = [
            ...books,
            { id: newId, Name: "", Category: "", Author: "", Amount: 0, ImportPrice: 0 }
        ];
        setBooks(newBooks);
    };

    const handleClickImport = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        let settings: AppConstraint | undefined = LocalStorage.get("settings");
        
        if (!settings) {
            toast.error("Đã xảy ra lỗi", { toastId: "ERR_SETTING_NOT_FOUND" });
            return;
        }

        let s = settings as AppConstraint;

        if (books.length === 0) {
            toast.error("Cần nhập ít nhất 1 dòng sách", { toastId: "ERR_NO_IMPORT_BOOK" });
            return;
        }

        const lastBook = books.at(-1) as Book;
        if ([lastBook.Name, lastBook.Category, lastBook.Author].includes("")) {
            toast.error("Hãy nhập đầy đủ thông tin");
            return;
        }

        let b = books.filter(book => book.Amount < s.MinImport);
        if (b.length > 0) {
            toast.error(
                <>
                    {`Số lượng nhập ít nhất là ${s.MinImport} quyển:`}
                    <ul className="font-bold">
                        {b.map((book, i) => <li key={i}>&bull; {book.Name}</li>)}
                    </ul>
                </>, 
                { toastId: "IMPORT_MIN_NOT_MEET" }
            );
            return;
        }

        const data: ImportLogPOST[] = books.map<ImportLogPOST>(book => ({
                ImportDate: dateToString(date) as string,
                Book: {
                    Name: book.Name,
                    Category: book.Category,
                    Author: book.Author,
                    ImportPrice: book.ImportPrice
                },
                Amount: book.Amount,
                TotalPrice: book.Amount * book.ImportPrice
            }));
        let response = await jsonFetch(importApiUrl, "POST", data);
        switch (response.status) {
            case 201:
                toast.success("Nhập sách hoàn tất");
                setImportFlag(!importFlag);
                break;
            case 400:
                toast.error(<>Không thể nhập sách tồn trong kho còn nhiều hơn <b>{s.AmountNeedImport}</b></>, { toastId: "IMPORT_EXCEED_STORED_AMOUNT" });
        }
    };

    return (
        <PageLayout
            id={props.id}
        >              
            <form
                className={combineClassnames(
                    props.className,
                    "w-full flex flex-col items-center"
                )}
                style={{...props.style}}
            >
                <Input 
                    className="my-3 pointer-events-none"
                    label="Ngày nhập:" 
                    type="date"
                    value={dateToString(date)}
                    onChange={handleChangeDate}
                />
                <Table
                    colWidths={[7, 30, 15, 22, 9, 17]}
                    colNames={["STT", "Sách", "Thể loại", "Tác giả", "Số lượng", "Đơn giá nhập (VNĐ)"]}
                >
                    {books.map((book, index) => {
                        return (
                            <TableRow
                                key={index}
                                onClickMinusButton={(e) => {
                                    e.preventDefault();
                                    deleteBookAt(index);
                                }}
                            >
                                <TableCell 
                                    disablePointerEvent
                                    value={book.id + 1}
                                />
                                
                                <TableCell 
                                    ref={newBookNameRef}
                                    onChange={(e) => {
                                        const newBooks = books.map((book, i) => {
                                            if (i !== index) {
                                                return book;
                                            }
                                            return { ...book, Name: e.target.value }
                                        });
                                        setBooks(newBooks);
                                    }}
                                    value={book.Name}
                                />

                                <TableCell 
                                    onChange={(e) => {
                                        const newBooks = books.map((book, i) => {
                                            if (i !== index) {
                                                return book;
                                            }
                                            return { ...book, Category: e.target.value }
                                        });
                                        setBooks(newBooks);
                                    }}
                                    value={book.Category}
                                />

                                <TableCell 
                                    onChange={(e) => {
                                        const newBooks = books.map((book, i) => {
                                            if (i !== index) {
                                                return book;
                                            }
                                            return { ...book, Author: e.target.value }
                                        });
                                        setBooks(newBooks);
                                    }}
                                    value={book.Author}
                                />

                                <TableCell 
                                    onChange={(e) => {
                                        const newBooks = books.map((book, i) => {
                                            if (i !== index) {
                                                return book;
                                            }
                                            return { ...book, Amount: Number(e.target.value.split(",").join("")) }
                                        });
                                        setBooks(newBooks);
                                    }}
                                    value={book.Amount}
                                />

                                <TableCell 
                                    onChange={(e) => {
                                        const newBooks = books.map((book, i) => {
                                            if (i !== index) {
                                                return book;
                                            }
                                            return { ...book, ImportPrice: Number(e.target.value.split(",").join("")) }
                                        });
                                        setBooks(newBooks);
                                    }}
                                    value={book.ImportPrice}
                                />
                            </TableRow>
                        );
                    })}
                </Table>
                
                <PlusButton onClick={handleClickAdd} />
                <Hr />

                <LargeButton
                    onClick={handleClickImport}
                >
                    NHẬP
                </LargeButton>
            </form>
        </PageLayout>
    );
});

export default ImportPage;