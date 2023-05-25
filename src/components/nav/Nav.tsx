import React, { ForwardedRef, forwardRef, useImperativeHandle, useRef } from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { THEME } from "../../settings";
import NavRef from "../../interfaces/refs/nav-ref";

interface Props extends BaseProps {}

const Nav = (props: Props, ref: ForwardedRef<NavRef>) => {
    const navRef = useRef<HTMLElement>(null);

    useImperativeHandle(ref, () => ({
        getHeight: () => {
            if (navRef.current)
                return navRef.current.offsetHeight;
            return 0;
        }
    }));

    return (
        <nav
            ref={navRef}
            className={combineClassnames(
                props.className,
                THEME.border,
                THEME.bg,
                "text-lg w-full h-14 lg:h-screen lg:w-[12rem] flex max-lg:border-t fixed bottom-0 lg:left-0 lg:bottom-auto lg:flex-col lg:items-start lg:border-r"
            )}
            style={{...props.style}}
        >
            {props.children}
        </nav>
    )
};

export default React.memo(forwardRef(Nav));