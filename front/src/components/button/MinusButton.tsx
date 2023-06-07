import React from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { THEME } from "../../settings";

interface Props extends BaseProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const MinusButton: React.FC<Props> = React.memo((props) => {
    return (
        <button
            className={combineClassnames(
                props.className,
                "p-0 block m-auto rounded-full border-none"
            )}
            style={{...props.style}}
            onClick={props.onClick}
        >
            <svg
                className={combineClassnames(
                    THEME.bgSemi,
                    THEME.active,
                    THEME.svgStroke,
                    "rounded-full duration-75"
                )}
                width="25"
                viewBox="0 0 23 23"
            >
                <path xmlns="http://www.w3.org/2000/svg" d="M7 12L17 12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> 
            </svg>
        </button>
    )
});

export default MinusButton;