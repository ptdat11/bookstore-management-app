import React, { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { stringToStrNumber } from "../../submodules/string-processing/number-string";
import CardRef from "../../interfaces/refs/card-ref";

interface Props extends BaseProps {
    value?: string | number,
    disablePointerEvent?: boolean,
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
}

const TableCell = (props: Props, ref: ForwardedRef<CardRef>) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => {
            textAreaRef.current?.focus();
        }
    }));

    let val = props.value?.toString();
    if (typeof props.value === "number" && val) {
        val = stringToStrNumber(val);
    }

    const resizeTextArea = () => {
        let tArea = textAreaRef.current;
        if (tArea) {
            tArea.style.height = "0px";
            tArea.style.height = tArea.scrollHeight + "px";
        }
    }
    useEffect(resizeTextArea, [textAreaRef.current?.scrollHeight]);

    return (
        <td
            className={combineClassnames(
                props.className,
                "py-2 border-inherit"
            )}
        >
            <textarea
                ref={textAreaRef}
                className={combineClassnames(
                    props.disablePointerEvent ? "pointer-events-none"  : "",
                    "h-auto text-center bg-inherit block w-full resize-none outline-none"
                )}
                style={{...props.style}}
                value={val}
                onChange={(e) => {
                    resizeTextArea();
                    if (props.onChange)
                        props.onChange(e);
                }}
            />
        </td>
    );
};

export default React.memo(forwardRef(TableCell));