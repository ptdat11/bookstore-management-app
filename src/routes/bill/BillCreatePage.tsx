import React, { useState } from "react";
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

interface Props extends BasePropsPage {}

const BillCreatePage = React.memo((props: Props) => {
    const [billDetail, setBillDetail] = useRecoilState(billDetailState);
    const [customer, setCustomer] = useState({FullName: "", PhoneNumber: ""});
    const importFlag = useRecoilValue(importFlagSelector);
    const booksApiUrl = useRecoilValue(apiUrlSelector("books"));
    const billsApiUrl = useRecoilValue(apiUrlSelector("bills"));

    const importedBooks = useFetch<Book[]>({
        url: booksApiUrl,
        method: "GET"
    }, [importFlag]);

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
                    "w-full flex flex-col items-centers"
                )}
            >
                <Input 
                   label="Khách hàng" 
                   type="text"
                   placeholder="Họ tên"
                />
                <Input
                    label="Số điện thoại"
                    type="tel"
                />
            </form>
        </PageLayout>
    );
});

export default BillCreatePage;