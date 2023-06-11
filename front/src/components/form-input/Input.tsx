import React, { ForwardedRef, HTMLInputTypeAttribute, forwardRef } from "react";
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
    step?: string | number,
    readonly?: boolean,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onBlur?: React.FocusEventHandler<HTMLInputElement>
};

const Input = (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
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
                ref={ref}
                className={combineClassnames(
                    props.inputClassName,
                    THEME.border,
                    THEME.bg,
                    "h-min my-auto leading-8 ml-3 rounded-sm border [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:visible [&::-webkit-calendar-picker-indicator]:dark:invert-0"
                )}
                type={props.type}
                value={props.value}
                checked={props.checked}
                placeholder={props.placeholder}
                readOnly={props.readonly}
                step={props.step}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </label>
    );
};

export default React.memo(forwardRef(Input));