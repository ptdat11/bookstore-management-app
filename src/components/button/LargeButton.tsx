import React from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { THEME } from "../../settings";

interface Props extends BaseProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const LargeButton: React.FC<Props> = React.memo((props) => {
    return (
        <button
            className={combineClassnames(
                THEME.bgSemi,
                THEME.active,
                THEME.textHighlight,
                "px-3 leading-5 w-fit duration-75"
            )}
            style={{...props.style}}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
});

export default LargeButton;