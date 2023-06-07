import React from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { THEME } from "../../settings";

interface Props extends BaseProps {
    colWidths?: number[],
    colNames?: string[]
}

const Table: React.FC<Props> = React.memo((props) => {
    return (
        <table
            className={combineClassnames(
                props.className,
                THEME.text,
            )}
            style={{...props.style}}
        >
            <colgroup>
                {props.colWidths?.map((width, index) => {
                    return (
                        <col
                            key={index}
                            style={{width: `${width}%`}}
                            span={1}
                        />        
                );})}
            </colgroup>
            <thead>
                <tr
                    className={combineClassnames(
                        THEME.borderHighLight,
                        THEME.textHighlight,
                        THEME.bgSemi,
                        "w-full lg:w-11/12 border-b"
                    )}
                >
                    {props.colNames?.map((name, index) => 
                        <th
                            key={index}
                            className={combineClassnames(
                                THEME.borderHighLight,
                                index === (props.colNames as string[]).length - 1 ? "" : "border-r",
                            )}
                        >
                            <div className="min-h-[3rem] flex items-center justify-center">
                                {name}
                            </div>
                        </th>
                    )}
                </tr>
            </thead>
            
            <tbody>
                {props.children}
            </tbody>
        </table>
    );
});

export default Table;