import React from "react";
import { BasePropsPage } from "../../submodules/base-props/base-props";
import { useNavigate } from "react-router-dom";

interface Props extends BasePropsPage {}

const ErrorPage = React.memo((props: Props) => {
    const navigate = useNavigate();
    navigate("/");
    return (
        <></>
    )
});

export default ErrorPage;