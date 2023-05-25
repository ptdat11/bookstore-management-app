import React from "react";
import { BasePropsPage } from "../../../submodules/base-props/base-props";
import Header from "../../header/Header";
import { useRecoilState } from "recoil";
import { pageState } from "../../../states/system-states";
import { PAGES } from "../../../settings";
import combineClassnames from "../../../submodules/string-processing/combine-classname";

interface Props extends BasePropsPage {}

const PageLayout = React.memo((props: Props) => {
    const [pageIndex, setPageIndex] = useRecoilState(pageState);

    return (
        <>
            <Header>
                {PAGES[pageIndex].title}
            </Header>
            <div
                id={props.id}
                className={combineClassnames(
                    props.className,
                    "w-full flex flex-col grow"
                )}
                style={{...props.style}}
            >
                {props.children}
            </div>
        </>
    );
});

export default PageLayout;