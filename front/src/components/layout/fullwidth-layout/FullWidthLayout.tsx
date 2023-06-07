import React, { useEffect, useRef } from "react";
import { BasePropsPage } from "../../../submodules/base-props/base-props";
import combineClassnames from "../../../submodules/string-processing/combine-classname";
import Nav from "../../nav/Nav";
import NavItem from "../../nav/NavItem";
import { PAGES, THEME } from "../../../settings";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { pageState } from "../../../states/system-states";
import NavRef from "../../../interfaces/refs/nav-ref";

interface Props extends BasePropsPage {}

const FullWidthLayout = React.memo((props: Props) => {
    const [pageIndex, setPageIndex] = useRecoilState(pageState);
    const containerRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<NavRef>(null);
    const added = useRef(false);

    const handleWindowResize = () => {
        let winHeight = window.innerHeight;
        const container = containerRef.current;
        const nav = navRef.current;

        if (container && nav) {
            if (nav.getHeight() < winHeight)
                container.style.height = winHeight - nav.getHeight() + "px";
            else container.style.height = nav.getHeight() + "px";
        }
    }

    if (!added.current) {
        added.current = true;
        window.addEventListener("resize", handleWindowResize);
    }
    useEffect(() => {
        handleWindowResize();
    }, [window.innerHeight]);

    return (
        <div
            id={props.id}
            className={combineClassnames(
                props.className,
                "w-screen h-screen flex justify-end overflow-y-hidden"
            )}
            style={{...props.style}}
        >
            <Nav
                ref={navRef}
            >
                {PAGES.map((page, index) => {
                    const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                        setPageIndex(index);
                    }
                    return <NavItem 
                        key={index}
                        href={page.href} 
                        title={page.title}
                        onClick={onClick}
                    >
                        {page.svg}
                    </NavItem>;
                })}
            </Nav>
            <div
                ref={containerRef}
                className={combineClassnames(
                    THEME.bg,
                    "w-full h-fit lg:ml-[12rem] flex flex-col items-center overflow-y-scroll"
                )}
            >
               <Outlet /> 
            </div>
        </div>
    )
});

export default FullWidthLayout;