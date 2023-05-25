import React, { useState } from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { THEME } from "../../settings";
import MinusButton from "../button/MinusButton";

interface Props extends BaseProps {
    onClickMinusButton?: React.MouseEventHandler<HTMLButtonElement>,
    disableDeleteButton?: boolean
}

const TableRow: React.FC<Props> = React.memo((props) => {
    const [delBtnAppears, setDelBtnAppears] = useState(false);
    const children = React.Children.toArray(props.children);

    return (
        <tr
            onMouseEnter={() => setDelBtnAppears(true)}
            onMouseLeave={() => setDelBtnAppears(false)}
            className={combineClassnames(
                props.className,
                THEME.border,
                `[&>*:nth-child(even)]:border-x`,
                `border-b`
            )}
            style={{...props.style}}
        >
            {
                (delBtnAppears && !props.disableDeleteButton) &&
                <td className="py-2">
                    <MinusButton onClick={props.onClickMinusButton} />
                </td>
            }
            {children.slice(delBtnAppears && !props.disableDeleteButton ? 1 : 0)}
        </tr>
    );
});

export default TableRow;