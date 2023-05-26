import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { BasePropsPage } from "../../submodules/base-props/base-props";
import PageLayout from "../../components/layout/page-layout/PageLayout";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { useRecoilState, useRecoilValue } from "recoil";
import { authorCriterionState, categoryCriterionState } from "../../states/book-states";
import FilterList from "./FilterList";
import { THEME } from "../../settings";
import Book from "../../interfaces/book";
import { jsonFetch } from "../../submodules/networking/jsonFetch";
import { BooksGET } from "../../interfaces/api-formats/books";
import Table from "../../components/table/Table";
import TableRow from "../../components/table/TableRow";
import TableCell from "../../components/table/TableCell";
import { apiUrlSelector } from "../../states/system-states";

interface Props extends BasePropsPage {}

const SearchPage = React.memo((props: Props) => {
    const [categories, setCategories] = useRecoilState(categoryCriterionState);
    const [authors, setAuthors] = useRecoilState(authorCriterionState);
    const [searchKey, setSearchKey] = useState("");
    const [resultAppeared, setResultAppeared] = useState(false);
    const [queryResult, setQueryResult] = useState<Book[]>([]);
    const booksApiUrl = useRecoilValue(apiUrlSelector("books"));
    const searchBarRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const keyEventHandler = (e: KeyboardEvent) => {
            if (e.code === "Enter") {
                handleClickSearch();
            }
        }

        searchBarRef.current?.addEventListener("keypress", keyEventHandler);
        
        return () => searchBarRef.current?.removeEventListener("keypress", keyEventHandler);
    });

    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchKey(e.target.value);
    };

    const handleClickSearch = async () => {
        const  apiObj: BooksGET = {
            Name: searchKey,
            Author: authors.join(","),
            Category: categories.join(","),
        }
        const response = await jsonFetch(booksApiUrl, "GET", apiObj);
        
        const books = await response.json();
        setResultAppeared(true);
        setQueryResult(books);
    };

    return (
        <PageLayout
            id={props.id}
            className={combineClassnames(
                props.className
            )}
            style={{...props.style}}
        >
            <div className="w-10/12 lg:w-9/12 pt-2 mx-auto">
                {/* Filter lists */}
                <FilterList
                    title="Thể loại"
                    recoilState={categoryCriterionState}
                />
                <FilterList
                    title="Tác giả"
                    recoilState={authorCriterionState}
                />

                {/* Search bar */}
                <div
                    className={combineClassnames(
                        "w-full h-10 flex items-center box-border"
                    )}
                >
                    <input 
                        ref={searchBarRef}
                        className={combineClassnames(
                            THEME.bg,
                            THEME.text,
                            "grow h-full pl-1 border border-slate-500 outline-none text-lg"
                        )}
                        type="text"
                        value={searchKey}
                        placeholder="Tên sách"
                        onChange={handleChangeSearch}
                    />
                    <button 
                        className={combineClassnames(
                            THEME.bgSemi,
                            THEME.active,
                            "h-full w-10 p-0 flex justify-center items-center border border-gray-400 dark:border-slate-500 bg-slate-300 rounded-none"
                        )}
                        onClick={handleClickSearch}
                    >
                        <svg className="stroke-gray-900 dark:stroke-slate-100" width="24" height="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="m19 19-3.5-3.5"></path><circle cx="11" cy="11" r="6" fill="none"></circle>
                        </svg>
                    </button>
                </div>
            </div>

                {/* Result table */}
                {resultAppeared &&
                    <Table
                        className="mt-3 mx-auto"
                        colWidths={[10, 30, 20, 20, 10]}
                        colNames={["STT", "Tên sách", "Thể loại", "Tác giả", "Số lượng"]}
                    >
                        {queryResult.map((res, index) => 
                            <TableRow 
                                key={index}
                                disableDeleteButton
                            >
                                <TableCell
                                    readOnly
                                    value={index + 1}
                                />
                                <TableCell
                                    readOnly
                                    value={res.Name}
                                />
                                <TableCell
                                    readOnly
                                    value={res.Category}
                                />
                                <TableCell
                                    readOnly
                                    value={res.Author}
                                />
                                <TableCell
                                    readOnly
                                    value={res.Amount}
                                />
                            </TableRow>
                        )}
                    </Table>
                }
        </PageLayout>
    );
});

export default SearchPage;