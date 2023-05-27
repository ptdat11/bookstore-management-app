import React, { HTMLInputTypeAttribute } from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { THEME } from "../../settings";

interface Props extends BaseProps {
    inputClassName?: string,
    label?: string,
    type?: HTMLInputTypeAttribute,
    value?: number | string,
    checked?: boolean,
    placeholder?: string,
    readonly?: boolean,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onBlur?: React.FocusEventHandler<HTMLInputElement>
};

const Input: React.FC<Props> = React.memo((props) => {
    return (
        <label
            className={combineClassnames(
                props.className,
                THEME.text
            )}
            style={{...props.style}}
        >
            <span
                className={combineClassnames(
                    THEME.textHighlight
                )}
                >
                {props.label}
            </span>
            <input
                className={combineClassnames(
                    props.inputClassName,
                    THEME.border,
                    THEME.bg,
                    "h-min my-auto leading-8 ml-3 rounded-sm border"
                )}
                type={props.type}
                value={props.value}
                checked={props.checked}
                placeholder={props.placeholder}
                readOnly={props.readonly}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </label>
    );
});

export default Input;