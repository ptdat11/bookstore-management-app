import React, { useRef, useState, ForwardedRef, forwardRef, useImperativeHandle } from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import suggestWords from "../../submodules/string-processing/word-suggest";
import AutoCompleteRef from "../../interfaces/refs/autocomplete-ref";
import { THEME } from "../../settings";

interface Props extends BaseProps {
    value?: string | number | readonly string[],
    readOnly?: boolean,
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
    suggestFrom?: string[],
    onClickSuggestion?: React.MouseEventHandler<HTMLLIElement>
}

const AutoComplete = ((props: Props, ref?: ForwardedRef<AutoCompleteRef>) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [focusing, setFocusing] = useState(false);

    useImperativeHandle(ref, () => ({
        scrollHeight: () => textAreaRef.current?.scrollHeight,
        focus: () => textAreaRef.current?.focus(),
        setHeight: (height: string) => {
            if (textAreaRef.current) {
                textAreaRef.current.style.height = height;
            }
        }
    }));

    let suggestionList: string[] | undefined;
    if (textAreaRef.current && props.suggestFrom)
        suggestionList = suggestWords(textAreaRef.current.value, props.suggestFrom);

    return (
        <>
            <textarea
                ref={textAreaRef}
                className={combineClassnames(
                    props.className
                )}
                style={{...props.style}}
                value={props.value}
                readOnly={props.readOnly}
                onChange={props.onChange}
                onBlur={() => setFocusing(false)}
                onFocus={() => setFocusing(true)}
            />
            {
                (suggestionList && focusing) &&
                <ul
                    className={combineClassnames(
                        THEME.bg,
                        THEME.border,
                        "absolute overflow-y-scroll max-h-36 z-[2] w-full border top-10 [&>*]:p-[0.3rem] [&>*]:border [&>*]:cursor-pointer"
                    )}
                >
                    {suggestionList.map((key, index) => 
                        <li
                            key={index}
                            className={combineClassnames(
                                THEME.border,
                                THEME.hover,
                                index === 0 ? "border-t" : undefined
                            )}
                            onMouseDown={props.onClickSuggestion}
                        >
                            {key}
                        </li>
                    )}
                </ul>
            }
        </>
    );
});

export default React.memo(forwardRef(AutoComplete));