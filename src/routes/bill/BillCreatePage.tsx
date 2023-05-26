import React, { useRef, useState, useEffect } from "react";
import { BasePropsPage } from "../../submodules/base-props/base-props";
import PageLayout from "../../components/layout/page-layout/PageLayout";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { THEME } from "../../settings";
import Input from "../../components/form-input/Input";
import { useRecoilState, useRecoilValue } from "recoil";
import { billDetailState, importFlagSelector } from "../../states/book-states";
import useFetch from "../../hooks/useFetch";
import Book from "../../interfaces/book";
import { apiUrlSelector } from "../../states/system-states";
import { toast } from "react-toastify";
import Table from "../../components/table/Table";
import TableRow from "../../components/table/TableRow";
import TableCell from "../../components/table/TableCell";
import PlusButton from "../../components/button/PlusButton";
import Hr from "../../components/Hr";
import CardRef from "../../interfaces/refs/card-ref";

interface Props extends BasePropsPage {}

const BillCreatePage = React.memo((props: Props) => {
    const [billDetail, setBillDetail] = useRecoilState(billDetailState);
    const [customer, setCustomer] = useState({FullName: "", PhoneNumber: ""});
    const [dateTime, setDateTime] = useState(new Date());
    const newBookNameRef = useRef<CardRef>(null);
    const importFlag = useRecoilValue(importFlagSelector);
    const booksApiUrl = useRecoilValue(apiUrlSelector("books"));
    const billsApiUrl = useRecoilValue(apiUrlSelector("bills"));

    const importedBooks = useFetch<Book[]>({
        url: booksApiUrl,
        method: "GET"
    }, [importFlag]);

    useEffect(() => {
        let id = setTimeout(() => setDateTime(new Date()), 1000);

        return () => clearTimeout(id);
    });

    const deleteDetailAt = (index: number) => {
        const newBooks = billDetail.filter(book => book.id !== index).map(book => {
            if (book.id < index) {
                return book;
            }

            return { ...book, id: book.id - 1 }
        });
        setBillDetail(newBooks);
    };

    const handleChangeDateTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newDateTime = new Date(e.target.value);
        setDateTime(newDateTime);
    };

    const handleClickAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let newId = billDetail.length === 0 ? 0 : (billDetail.at(-1)?.id as number) + 1;

        const lastBook = billDetail.at(-1) as Book;
        if (newId > 0 && [lastBook.Name, lastBook.Category].includes("")) {
            toast.warn("Cần điền đủ thông tin để thêm sách", { toastId: "IMPORT_NOT_COMPLETE" });
            newBookNameRef.current?.focus();
            return;
        }

        const newBooks = [
            ...billDetail,
            { id: newId, Name: "", Category: "", Author: "", Amount: 0, ImportPrice: 0 }
        ];
        setBillDetail(newBooks);
    };

    return (
        <PageLayout
            id={props.id}
            className={combineClassnames(
                props.className,
                "[&>*]:mx-auto"
            )}
            style={{...props.style}}
        >
            <form
                className={combineClassnames(
                    THEME.text,
                    "w-full flex flex-col items-center p-3 [&>*]:my-1"
                )}
            >
                <Input 
                    label="Khách hàng:" 
                    className="w-7/12 flex justify-between"
                    type="text"
                    placeholder="Họ tên"
                    value={customer.FullName}
                    onChange={(e) => {
                        const newCustomer = {
                            ...customer,
                            FullName: e.target.value
                        };
                        setCustomer(newCustomer);
                    }}
                />
                <Input
                    label="Số điện thoại:"
                    className="w-7/12 flex justify-between"
                    inputClassName="w-32"
                    type="tel"
                    value={customer.PhoneNumber}
                    onChange={(e) => {
                        const newCustomer = {
                            ...customer,
                            PhoneNumber: e.target.value
                        };
                        setCustomer(newCustomer);
                    }}
                />
                <Input
                    label="Ngày lập:"
                    className="w-7/12 flex justify-between"
                    inputClassName="w-48"
                    type="datetime-local"
                    value={dateTime.toISOString().slice(0,16)}
                    readonly
                    onChange={handleChangeDateTime}
                />
            </form>

            <Table
                className="mx-auto"
                colNames={["STT", "Sách", "Thể loại", "Số lượng", "Đơn giá bán(VNĐ)"]}
                colWidths={[9, 35, 20, 12, 24]}
            >
                {billDetail.map((book, index) => 
                    <TableRow
                        key={index}
                        onClickMinusButton={(e) => {
                            e.preventDefault();
                            deleteDetailAt(index);
                        }}
                    >
                        <TableCell
                            readOnly
                            value={book.id + 1}
                        />
                        <TableCell
                            ref={newBookNameRef}
                            value={book.Name}
                            suggestFrom={
                                importedBooks.data ? 
                                importedBooks.data.map(book => book.Name) :
                                undefined
                            }
                            onClickSuggestion={(e) => {
                                if (!importedBooks.data) {
                                    return;
                                }
                                
                                const newBook: Book = importedBooks.data.filter(bo => bo.Name === e.currentTarget.childNodes[0].textContent)[0];
                                const newBooks = billDetail.map((b, i) => {
                                    if (i !== index) {
                                        return b;
                                    }
                                    
                                    return { ...newBook, Amount: b.Amount, id: index};
                                });
                                
                                setBillDetail(newBooks);
                            }}
                            onChange={(e) => {
                                const newBooks = billDetail.map((b, i) => {
                                    if (i !== index) {
                                        return b;
                                    }

                                    return { ...b, Name: e.target.value, id: index }
                                });
                                setBillDetail(newBooks);
                            }}
                        />
                        <TableCell
                            readOnly
                            value={book.Category}
                        />
                        <TableCell
                            value={book.Amount}
                            onChange={(e) => {
                                const newBooks = billDetail.map((b, i) => {
                                    if (i !== index) {
                                        return b;
                                    }
                                    return { ...b, Amount: Number(e.target.value.split(",").join("")) }
                                });

                                setBillDetail(newBooks);
                            }}
                        />
                        <TableCell
                            readOnly
                            value={book.ImportPrice}
                        />
                    </TableRow>
                )}
            </Table>

            <PlusButton onClick={handleClickAdd} />
            <Hr />
        </PageLayout>
    );
});

export default BillCreatePage;