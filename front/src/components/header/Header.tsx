import React from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { THEME } from "../../settings";
import ThemeButton from "./ThemeButton";

interface Props extends BaseProps {}

const Header: React.FC<Props> = React.memo((props) => {

    return (
        <header 
            className={combineClassnames(
                props.className,
                THEME.bg,
                THEME.border,
                "w-full h-14 p-2 flex items-center top-0 border-b"
            )}
            style={{...props.style}}
        >
            <span
                className={combineClassnames(
                    THEME.textHighlight,
                    "font-bold text-xl grow text-center select-none"
                )}
            >
                {props.children}
            </span>
            <ThemeButton />
        </header>
    );
});

export default Header;