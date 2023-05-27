import React from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import { Link } from "react-router-dom";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { THEME } from "../../settings";

interface Props extends BaseProps {
    href?: string,
    title?: string,
    onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

const NavItem: React.FC<Props> = React.memo((props) => {
    return (
        <Link
            onClick={props.onClick}
            className={combineClassnames(
                props.className,
                THEME.border,
                THEME.hover,
                THEME.active,
                "group h-1/12 lg:w-full lg:py-3 lg:pl-2 lg:border-b flex items-center max-lg:grow max-lg:justify-center duration-100"
            )}
            style={{...props.style}}
            to={props.href ?? ""}
        >
            <span 
                className={combineClassnames(
                    THEME.bgSemi,
                    THEME.textHighlight,
                    "mb-1 max-lg:group-hover:block hidden absolute z-10 px-3 py-1 bottom-14 whitespace-nowrap rounded-lg"
                )}
            >
                {props.title}
            </span>
            {props.children}
            <span 
                className={combineClassnames(
                    THEME.textHighlight,
                    "max-lg:hidden font-bold text-md lg:ml-3 break-keep"
                )}
            >
                {props.title}
            </span>
        </Link>
    );
});

export default NavItem;