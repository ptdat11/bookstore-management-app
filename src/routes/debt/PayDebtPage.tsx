import React from "react";
import { BasePropsPage } from "../../submodules/base-props/base-props";
import PageLayout from "../../components/layout/page-layout/PageLayout";
import combineClassnames from "../../submodules/string-processing/combine-classname";

interface Props extends BasePropsPage {}

const PayDebtPage = React.memo((props: Props) => {
    return (
        <PageLayout
            id={props.id}
            className={combineClassnames(
                props.className
            )}
            style={{...props.style}}
        >

        </PageLayout>
    );
});

export default PayDebtPage;