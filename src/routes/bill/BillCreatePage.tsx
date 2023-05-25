import React from "react";
import { BasePropsPage } from "../../submodules/base-props/base-props";
import PageLayout from "../../components/layout/page-layout/PageLayout";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { THEME, urlPrefix } from "../../settings";
import Input from "../../components/form-input/Input";
import { useRecoilState } from "recoil";
import { billDetailState } from "../../states/book-states";
import useFetch from "../../hooks/useFetch";
import Book from "../../interfaces/book";

interface Props extends BasePropsPage {}

const BillCreatePage = React.memo((props: Props) => {
    const [billDetail, setBillDetail] = useRecoilState(billDetailState);

    const importedBooks = useFetch<Book[]>({
        url: `${urlPrefix}/api/books/`,
        method: "GET"
    });

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
                   placeholder="Họ tên"
                />
            </form>
        </PageLayout>
    );
});

export default BillCreatePage;