import React from "react";
import { THEME } from "../../settings";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import PlusButton from "../button/PlusButton";

interface Props extends BaseProps {
    title?: string,
    onClickPlus?: React.MouseEventHandler<HTMLButtonElement>
}

const CardList: React.FC<Props> = React.memo((props) => {
    return (
        <section
            className={combineClassnames(
                props.className,
                THEME.text,
                "flex flex-wrap items-center"
            )}
            style={{...props.style}}
        >
            {props.title}: 
            {props.children}
            <PlusButton 
                className="ml-1"
                onClick={props.onClickPlus} 
            />
        </section>
    );
});

export default CardList;