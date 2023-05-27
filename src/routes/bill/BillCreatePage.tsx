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
import { dateTimeToLocalISOString, dateToString } from "../../submodules/string-processing/date-string";
import { stringToStrNumber } from "../../submodules/string-processing/number-string";
import LargeButton from "../../components/button/LargeButton";
import AppConstraint from "../../interfaces/app-constraint";
import LocalStorage from "../../submodules/local-storage/local-storage";
import { BillPOST } from "../../interfaces/api-formats/bills";
import { jsonFetch } from "../../submodules/networking/jsonFetch";

interface Props extends BasePropsPage {}

const BillCreatePage = React.memo((props: Props) => {
    const [billDetail, setBillDetail] = useRecoilState(billDetailState);
    const [customer, setCustomer] = useState({FullName: "", PhoneNumber: ""});
    const [dateTime, setDateTime] = useState(new Date());
    const [paid, setPaid] = useState(0);
    const newBookNameRef = useRef<CardRef>(null);
    const importFlag = useRecoilValue(importFlagSelector);
    const booksApiUrl = useRecoilValue(apiUrlSelector("books"));
    const billsApiUrl = useRecoilValue(apiUrlSelector("bills"));
    let sellPriceMultiplier = 105 / 100;
    let sum = billDetail.length > 0 ?
        billDetail.map(book => book.ImportPrice * sellPriceMultiplier * book.Amount).
            reduce((partialSum, next) => partialSum + next) :
        0;
    sum = Number.isNaN(sum) ? 0 : sum;

    const importedBooks = useFetch<Book[]>({
        url: booksApiUrl,
        method: "GET"
    }, [importFlag]);

    useEffect(() => {
        newBookNameRef.current?.focus();
    }, [billDetail.length]);

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
            { id: newId, Name: "", Category: "", Author: "", Amount: 1, ImportPrice: 0 }
        ];
        setBillDetail(newBooks);
    };

    const handleClickCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let settings: AppConstraint | undefined = LocalStorage.get("settings");
        
        if (!settings) {
            toast.error("Hãy cài đặt qui định trước khi tạo hóa đơn", { toastId: "ERR_SETTING_NOT_FOUND" });
            return;
        }

        if (customer.FullName === "") {
            toast.error("Hãy điền họ tên khách hàng", { toastId: "BILL_BLANK_NAME" });
            return;
        }

        if (customer.PhoneNumber === "") {
            toast.error("Hãy điền SĐT khách hàng", { toastId: "BILL_BLANK_PHONE" });
            return;
        }

        if (billDetail.length === 0) {
            toast.error("Cần nhập ít nhất 1 dòng sách", { toastId: "ERR_NO_IMPORT_BOOK" });
            return;
        }

        if (billDetail.map(book => book.Name).includes("")) {
            toast.error("Hãy nhập đầy đủ tên sách", { toastId: "BILL_UNDEFINED_NAME"});
            return;
        }
        
        const amountNotValid = billDetail.filter(book => book.Amount <= 0);
        if (amountNotValid.length > 0) {
            toast.error(
                <>
                    Số lượng sách phải lớn hơn 0:
                    <ul>
                        {amountNotValid.map((book, index) => 
                            <li key={index} className="font-bold">&bull; {book.Name}</li>
                        )}
                    </ul>
                </>,
                { toastId: "BILL_INVALID_AMOUNT" }
            );
        }

        const data: BillPOST = {
            Customer: customer,
            BillDate: dateToString(dateTime) ?? "",
            BillDetails: billDetail.map(book => {
                let soldPrice = book.ImportPrice * sellPriceMultiplier;
                return {
                    Book: {
                        Name: book.Name,
                        Category: book.Category
                    },
                    Amount: book.Amount,
                    SoldPrice: Number.isNaN(soldPrice) ? 0 : soldPrice
            }}),
            TotalPrice: sum,
            Paid: paid,
            Debt: sum - paid
        };
        let response = await jsonFetch(billsApiUrl, "POST", data);
        switch (response.status) {
            case 201:
                toast.success("Lập hóa đơn thành công", { toastId: "BILL_SUCCESS" });
                break;
            case 400:
                toast.error("Server đã xảy ra sự cố", { toastId: "BILL_SERVER_ERROR" });
        }
    }

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
                    "w-full flex flex-col items-center p-3 [&>*]:my-1 [&>*]:w-7/12 [&>*]:lg:w-5/12 [&>*]:flex [&>*]:justify-between"
                )}
            >
                <Input 
                    label="Khách hàng:" 
                    inputClassName="w-36"
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
                    inputClassName="w-48"
                    type="datetime-local"
                    value={dateTimeToLocalISOString(dateTime)}
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
                                const targetBook: Book = importedBooks.data ?
                                    importedBooks.data.filter(b => b.Name === book.Name)[0] :
                                    { id: -1, Name: "", Category: "", Author: "", Amount: 0, ImportPrice: 0 };

                                const newBooks = billDetail.map((b, i) => {
                                    if (i !== index) {
                                        return b;
                                    }

                                    let newAmt = Number(e.target.value.split(",").join(""));
                                    return { ...b, Amount: newAmt < targetBook.Amount ? newAmt : targetBook.Amount }
                                });

                                setBillDetail(newBooks);
                            }}
                        />
                        <TableCell
                            readOnly
                            value={book.ImportPrice * sellPriceMultiplier}
                        />
                    </TableRow>
                )}
            </Table>

            <PlusButton onClick={handleClickAdd} />

            <div
                className={combineClassnames(
                    THEME.textHighlight,
                    "flex flex-col items-end w-11/12"
                )}
            >
                <span className="block font-bold">Tổng tiền: <output>{stringToStrNumber(sum.toString())}VNĐ</output></span>
                <label className="block flex">
                    <span>Số tiền trả:&nbsp;</span>
                    <textarea
                        value={stringToStrNumber(paid.toString())}
                        onChange={(e) => {
                            let numVal = Number(e.target.value.split(",").join(""));
                            setPaid(numVal > sum ? sum : numVal)
                        }}
                        className={combineClassnames(
                            THEME.bg,
                            THEME.borderHighLight,
                            "resize-none border"
                        )}
                        rows={1}
                        cols={paid.toString().length + 2}
                    />&nbsp;VNĐ
                </label>
                <span className="font-bold block">Còn lại: <output>{stringToStrNumber((sum - paid).toString())}VNĐ</output></span>
            </div>
            <Hr />

            <LargeButton onClick={handleClickCreate}>
                LẬP
            </LargeButton>
        </PageLayout>
    );
});

export default BillCreatePage;