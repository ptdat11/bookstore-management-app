import React, { ForwardedRef, forwardRef } from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { THEME } from "../../settings";

interface Props extends BaseProps {
    textAreaClassName?: string,
    label?: string,
    value?: string | number | readonly string[]
    rows?: number,
    cols?: number,
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>,
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>
}

const TextArea = (props: Props, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return (
        <label
            className={combineClassnames(
                props.className,
                THEME.text
            )}
        >
            <span
                className={combineClassnames(
                    THEME.textHighlight
                )}
            >
                {props.label}
            </span>

            <textarea
                ref={ref}
                className={combineClassnames(
                    props.textAreaClassName,
                    THEME.border,
                    THEME.bg,
                    "h-min my-auto leading-8 ml-3 rounded-sm border"
                )}
                value={props.value}
                rows={props.rows}
                cols={props.cols}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </label>
    );
};

export default React.memo(forwardRef(TextArea))