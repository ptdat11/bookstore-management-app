import React, { ForwardedRef, forwardRef, useImperativeHandle, useRef } from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { THEME } from "../../settings";
import CardRef from "../../interfaces/refs/card-ref";

interface Props extends BaseProps {
    value?: string,
    onClickX?: React.MouseEventHandler<SVGSVGElement>,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const Card = (props: Props, ref?: ForwardedRef<CardRef>) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const focused = useRef(false);
    let childrenLen = props.value?.length === 0 ? 1 : props.value?.length;

    useImperativeHandle(ref, () => ({
        focus: () => {
            const input = inputRef.current;
            if (input && (!focused.current || input.value === "")) {
                input.focus();
                focused.current = true;
            }
        }
    }));

    return (
        <span
            className={combineClassnames(
                props.className,
                THEME.bgSemi,
                "h-fit p-1 m-1 flex items-center rounded"
            )}
            style={{...props.style}}
        >
            <svg 
                className="cursor-pointer mr-1"
                onClick={props.onClickX}
                xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path 
                    className={combineClassnames(
                        THEME.svgStroke
                    )} 
                    d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                />
            </svg>
            <input 
                ref={inputRef}
                className={combineClassnames(
                    THEME.bgSemi,
                    "border-none outline-none"
                )}
                value={props.value}
                size={childrenLen}
                onChange={props.onChange}
            />
        </span>
    );
};

export default React.memo(forwardRef(Card));