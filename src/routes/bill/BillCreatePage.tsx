import React, { useState, useEffect } from "react";
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
import Table from "../../components/table/Table";
import TableRow from "../../components/table/TableRow";
import TableCell from "../../components/table/TableCell";
import suggestWords from "../../submodules/string-processing/word-suggest";

interface Props extends BasePropsPage {}

const BillCreatePage = React.memo((props: Props) => {
    const [billDetail, setBillDetail] = useRecoilState(billDetailState);
    const [customer, setCustomer] = useState({FullName: "", PhoneNumber: ""});
    const [dateTime, setDateTime] = useState(new Date());
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

    const handleChangeDateTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newDateTime = new Date(e.target.value);
        setDateTime(newDateTime);
    };

    return (
        <PageLayout
            id={props.id}
            className={combineClassnames(
                props.className
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
                    className="w-7/12 flex justify-between pointer-events-none"
                    inputClassName="w-48"
                    type="datetime-local"
                    value={dateTime.toISOString().slice(0,16)}
                    onChange={handleChangeDateTime}
                />
            </form>

            <Table
                className="mx-auto"
                colNames={["STT", "Sách", "Thể loại", "Số lượng", "Đơn giá bán"]}
                colWidths={[9, 35, 20, 12, 24]}
            >
                {billDetail.map((book, index) => 
                    <TableRow
                        key={index}
                    >
                        <TableCell
                            disablePointerEvent
                            value={index + 1}
                        />
                        <TableCell
                            value={book.Name}
                        />
                        <TableCell
                            disablePointerEvent
                            value={book.Category}
                        />
                        <TableCell
                            value={book.Amount}
                        />
                        <TableCell
                            disablePointerEvent
                            value={book.ImportPrice}
                        />
                    </TableRow>
                )}
            </Table>
        </PageLayout>
    );
});

export default BillCreatePage;