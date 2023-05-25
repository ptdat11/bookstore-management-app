import React, { useState } from "react";
import { BasePropsPage } from "../../submodules/base-props/base-props";
import PageLayout from "../../components/layout/page-layout/PageLayout";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import Collapse from "../../components/collapse/Collapse";
import Input from "../../components/form-input/Input";
import Table from "../../components/table/Table";
import Report from "../../interfaces/report";
import { jsonFetch } from "../../submodules/networking/jsonFetch";
import { urlPrefix } from "../../settings";
import { BooksPerMonthGET } from "../../interfaces/api-formats/books";
import TableRow from "../../components/table/TableRow";
import TableCell from "../../components/table/TableCell";

interface Props extends BasePropsPage {}

const MonthlyReportPage = React.memo((props: Props) => {
    const [booksReport, setBooksReport] = useState<Report[]>([]);
    const [debtReports, setDebtReport] = useState<Report[]>([]);

    return (
        <PageLayout
            id={props.id}
            className={combineClassnames(
                props.className
            )}
            style={{...props.style}}
        >
            <div className="w-full">
                <Collapse 
                    className="w-[97%] lg:w-10/12 mx-auto my-4"
                    title="Báo cáo tồn" 
                    style={{
                        alignItems: "center"
                    }}
                >
                    <Input 
                        className="my-2"
                        label="Tháng:"
                        type="month"
                        onChange={async (e) => {
                            const data: BooksPerMonthGET = {
                                month: e.target.valueAsDate?.getMonth() as number + 1,
                                year: e.target.valueAsDate?.getFullYear()
                            }

                            console.log(data);
                            let response = await jsonFetch(`${urlPrefix}/api/books-per-month/`, "GET", data);

                            const report: Report[] = await response.json();
                            setBooksReport(report);
                        }}
                    />

                    <Table
                        colWidths={[6, 35, 17, 17, 17]}
                        colNames={["STT", "Sách", "Tồn đầu", "Phát sinh", "Tồn cuối"]}
                    >
                        {booksReport.map((report, index) => {
                            return (
                                <TableRow
                                    key={index}
                                    disableDeleteButton
                                >
                                    <TableCell 
                                        value={index + 1}
                                        disablePointerEvent
                                    />

                                    <TableCell 
                                        value={report.Name}
                                        disablePointerEvent
                                    />

                                    <TableCell
                                        value={report.result_by_month?.FirstAmount}
                                        disablePointerEvent
                                    />

                                    <TableCell 
                                        value={report.result_by_month?.ImportCount}
                                        disablePointerEvent
                                    />

                                    <TableCell 
                                        value={report.result_by_month?.LastAmount}
                                        disablePointerEvent
                                    />
                                </TableRow>
                            );
                        })}
                    </Table>
                </Collapse>

                <Collapse 
                    className="w-[97%] lg:w-10/12 mx-auto my-4"
                    title="Báo cáo nợ" 
                    style={{
                        alignItems: "center"
                    }}
                >
                    <Input 
                        className="my-2"
                        label="Tháng:"
                        type="month"
                        onChange={async (e) => {
                            const data: BooksPerMonthGET = {
                                month: e.target.valueAsDate?.getMonth() as number + 1,
                                year: e.target.valueAsDate?.getFullYear()
                            }

                            console.log(data);
                            let response = await jsonFetch(`${urlPrefix}/api/customers-per-month/`, "GET", data);

                            const report: Report[] = await response.json();
                            setBooksReport(report);
                        }}
                    />

                    <Table
                        colWidths={[6, 35, 17, 17, 17]}
                        colNames={["STT", "Khách hàng", "Nợ đầu", "Phát sinh", "Nợ cuối"]}
                    >
                        {debtReports.map((report, index) => {
                            return (
                                <TableRow
                                    key={index}
                                    disableDeleteButton
                                >
                                    <TableCell 
                                        value={index + 1}
                                        disablePointerEvent
                                    />

                                    <TableCell 
                                        value={report.Name}
                                        disablePointerEvent
                                    />

                                    <TableCell
                                        value={report.result_by_month?.FirstAmount}
                                        disablePointerEvent
                                    />

                                    <TableCell 
                                        value={report.result_by_month?.ImportCount}
                                        disablePointerEvent
                                    />

                                    <TableCell 
                                        value={report.result_by_month?.LastAmount}
                                        disablePointerEvent
                                    />
                                </TableRow>
                            );
                        })}
                    </Table>
                </Collapse>
            </div>
        </PageLayout>
    );
});

export default MonthlyReportPage;