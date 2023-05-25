import React, { useState } from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { THEME } from "../../settings";

interface Props extends BaseProps {
    title?: string
}

const Collapse: React.FC<Props> = React.memo((props) => {
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    }

    return (
        <section
            className={combineClassnames(
                props.className,
                THEME.bgHighlight,
                THEME.textHighlight,
                "rounded-tr-xl rounded-bl-xl duration-100 rounded-sm"
            )}
        >
            <h2
                className={combineClassnames(
                    THEME.active,
                    "font-bold text-lg leading-9 pr-2 pl-4 bg-clip-border flex items-center justify-between cursor-pointer rounded-tr-xl rounded-tl-sm select-none"
                )}
                onClick={handleClick}
            >
                {props.title}
                <svg 
                    className={combineClassnames(
                        THEME.svgFill,
                        "duration-200",
                        expanded ? "rotate-180" : ""
                    )} width="24" height="24" viewBox="0 0 24 24"
                >
                    <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M6.29289 8.79289C6.68342 8.40237 7.31658 8.40237 7.70711 8.79289L12 13.0858L16.2929 8.79289C16.6834 8.40237 17.3166 8.40237 17.7071 8.79289C18.0976 9.18342 18.0976 9.81658 17.7071 10.2071L12.7071 15.2071C12.3166 15.5976 11.6834 15.5976 11.2929 15.2071L6.29289 10.2071C5.90237 9.81658 5.90237 9.18342 6.29289 8.79289Z" />
                </svg>
            </h2>
            <div
                className={combineClassnames(
                    THEME.text,
                    THEME.border,
                    THEME.bg,
                    expanded ? "p-1" : "scale-y-0 h-0 p-0",
                    "flex flex-col border border-t-0 rounded-bl-xl rounded-br-sm duration-100 origin-top"
                )}
                style={{...props.style}}
            >
                {props.children}
            </div>
        </section>
    );
});

export default Collapse;