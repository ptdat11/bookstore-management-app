import React from "react";
import { BaseProps } from "../submodules/base-props/base-props";
import combineClassnames from "../submodules/string-processing/combine-classname";
import { THEME } from "../settings";

interface Props extends BaseProps {}

const Hr: React.FC<Props> = React.memo((props) => {
    return (
        <hr 
            className={combineClassnames(
                props.className,
                THEME.borderHighLight,
                "w-11/12 my-2"
            )}
            style={{...props.style}}
        />
    );
});

export default Hr;