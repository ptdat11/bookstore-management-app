import React, { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { stringToStrNumber } from "../../submodules/string-processing/number-string";
import CardRef from "../../interfaces/refs/card-ref";
import AutoComplete from "../form-input/AutoComplete";
import AutoCompleteRef from "../../interfaces/refs/autocomplete-ref";

interface Props extends BaseProps {
    value?: string | number,
    readOnly?: boolean,
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>,
    suggestFrom?: string[],
    onClickSuggestion?: React.MouseEventHandler<HTMLLIElement>
}

const TableCell = (props: Props, ref: ForwardedRef<CardRef>) => {
    const textAreaRef = useRef<AutoCompleteRef>(null);

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
            tArea.setHeight("0px");
            tArea.setHeight(tArea.scrollHeight() + "px");
        }
    }
    useEffect(resizeTextArea, [textAreaRef.current?.scrollHeight()]);

    return (
        <td
            className={combineClassnames(
                props.className,
                "relative py-2 border-inherit"
            )}
        >
            <AutoComplete 
                ref={textAreaRef}
                className={combineClassnames(
                    "h-auto text-center bg-inherit block w-full resize-none outline-none"
                )}
                style={{...props.style}}
                value={val}
                readOnly={props.readOnly}
                suggestFrom={props.suggestFrom}
                onClickSuggestion={props.onClickSuggestion}
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