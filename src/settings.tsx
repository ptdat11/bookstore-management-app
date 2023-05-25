import React from "react";
import { ThemeSettings } from "./submodules/theme/theme-type";

export const urlPrefix = "https://qlns.dipicorp.com";

export const THEME: ThemeSettings = {
    bg: "bg-white dark:bg-slate-800",
    bgSemi: "bg-gray-300 dark:bg-slate-700",
    bgHighlight: "bg-gray-400 dark:bg-slate-500",
    hover: "hover:bg-gray-300 dark:hover:bg-slate-700",
    active: "active:bg-gray-500 dark:active:bg-slate-500",
    
    textHighlight: "text-gray-900 dark:text-slate-200",
    text: "text-gray-600 dark:text-slate-400",

    border: "border-slate-400 dark:border-slate-600",
    borderHighLight: "border-slate-500 dark:border-slate-500",

    svgFill: "fill-gray-900 dark:fill-slate-200 ",
    svgStroke: "stroke-gray-900 dark:stroke-slate-200"
}

export const PAGES: {
    title: string, 
    href: string
    svg: React.JSX.Element
}[] = [
    {
        title: "Nhập sách",
        href: "/import",
        svg: 
            <svg width={25} viewBox="-3.5 -3.5 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className={THEME.svgStroke} xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 16v3m0 3v-3m0 0h3m-3 0h-3"/>
                <path className={THEME.svgFill} xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" d="M6 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h7.803A6 6 0 0 1 21 13.341V5a3 3 0 0 0-3-3H6zm2 10V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7l-2.293-2.293a1 1 0 0 0-1.414 0L8 12z" clipRule="evenodd"/>
            </svg>
    },
    {
        title: "Lập hóa đơn",
        href: "/bill",
        svg: 
            <svg className={THEME.svgFill} aria-hidden="true" width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M7.5 4C6.67157 4 6 4.67157 6 5.5V18.5C6 19.3284 6.67157 20 7.5 20H16.5C17.3284 20 18 19.3284 18 18.5V5.5C18 4.67157 17.3284 4 16.5 4H7.5ZM14.3536 8.35355C14.5488 8.15829 14.5488 7.84171 14.3536 7.64645C14.1583 7.45118 13.8417 7.45118 13.6464 7.64645L9.64645 11.6464C9.45118 11.8417 9.45118 12.1583 9.64645 12.3536C9.84171 12.5488 10.1583 12.5488 10.3536 12.3536L14.3536 8.35355ZM11.5 8.5C11.5 9.05228 11.0523 9.5 10.5 9.5C9.94772 9.5 9.5 9.05228 9.5 8.5C9.5 7.94772 9.94772 7.5 10.5 7.5C11.0523 7.5 11.5 7.94772 11.5 8.5ZM13.5 12.5C14.0523 12.5 14.5 12.0523 14.5 11.5C14.5 10.9477 14.0523 10.5 13.5 10.5C12.9477 10.5 12.5 10.9477 12.5 11.5C12.5 12.0523 12.9477 12.5 13.5 12.5ZM8.5 15C8.5 14.7239 8.72386 14.5 9 14.5H15C15.2761 14.5 15.5 14.7239 15.5 15C15.5 15.2761 15.2761 15.5 15 15.5H9C8.72386 15.5 8.5 15.2761 8.5 15ZM9 16.5C8.72386 16.5 8.5 16.7239 8.5 17C8.5 17.2761 8.72386 17.5 9 17.5H15C15.2761 17.5 15.5 17.2761 15.5 17C15.5 16.7239 15.2761 16.5 15 16.5H9Z" />
            </svg>
    },
    {
        title: "Báo cáo tháng",
        href: "/report",
        svg:
            <svg className={THEME.svgFill} width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M5.5 18C5.5 17.7239 5.72386 17.5 6 17.5H18C18.2761 17.5 18.5 17.7239 18.5 18C18.5 18.2761 18.2761 18.5 18 18.5H6C5.72386 18.5 5.5 18.2761 5.5 18Z" />
                <rect xmlns="http://www.w3.org/2000/svg" x="6.5" y="11.5" width="3" height="7" rx="0.5" />
                <rect xmlns="http://www.w3.org/2000/svg" x="10.5" y="5.5" width="3" height="13" rx="0.5" />
                <rect xmlns="http://www.w3.org/2000/svg" x="14.5" y="8.5" width="3" height="10" rx="0.5" />
            </svg> 
    },
    {
        title: "Tra cứu sách",
        href: "/search",
        svg:
            <svg className={THEME.svgStroke} width={25} height={25} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m19 19-3.5-3.5"></path><circle cx="11" cy="11" r="6" fill="none"></circle>
            </svg>
    },
    {
        title: "Thanh toán nợ",
        href: "/debt",
        svg:
            <svg className={THEME.svgFill} width={25} viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg">
                <g xmlns="http://www.w3.org/2000/svg" id="_x34__5_">
                    <path d="M17.6,41.9v53h102.3v-53H17.6z M37.5,87.6h-12v-12h2.4v9.6h9.6V87.6z M37.5,51.5h-9.6v9.6h-2.4v-12h12V51.5z M68.8,87.6   c-10.6,0-19.3-8.6-19.3-19.3c0-10.6,8.6-19.3,19.3-19.3s19.3,8.6,19.3,19.3C88.1,79,79.4,87.6,68.8,87.6z M113.3,87.6h-12v-2.4h9.6   v-9.6h2.4V87.6z M113.3,61.1h-2.4v-9.6h-9.6v-2.4h12V61.1z"/>
                </g>
                <path xmlns="http://www.w3.org/2000/svg" d="M76.7,73c0-3.2-1.9-5.4-6-6.9c-3-1.1-4.3-1.8-4.3-3.2c0-1.2,1.1-2.2,3.3-2.2c2.3,0,3.9,0.6,4.8,1.1l1.2-4.2  c-1-0.5-2.3-0.9-4-1.1v-3.4h-5.9v4c-2.9,1.1-4.6,3.4-4.6,6.2c0,3.3,2.5,5.5,6.3,6.8c2.8,1,3.9,1.8,3.9,3.2c0,1.5-1.3,2.5-3.6,2.5  c-2.2,0-4.4-0.7-5.8-1.4l-1.1,4.3c1,0.6,2.9,1.1,4.9,1.3v3.3h5.9v-3.8C75.1,78.4,76.7,75.9,76.7,73z"/>
                <polygon xmlns="http://www.w3.org/2000/svg" points="115.1,37 12.8,37 12.8,89.4 15.2,89.4 15.2,39.5 115.1,39.5 "/>
                <polygon xmlns="http://www.w3.org/2000/svg" points="110.3,32.2 8,32.2 8,84.6 10.4,84.6 10.4,34.6 110.3,34.6 "/>
            </svg>
    },
    {
        title: "Cài đặt",
        href: "/settings",
        svg:
            <svg width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className={THEME.svgFill} xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M17.6527 10.3496L19.7085 10.6856C19.8769 10.713 20.0003 10.8584 20 11.0289V12.9419C20 13.1106 19.8789 13.2553 19.7123 13.2845L17.6537 13.6459C17.5344 14.0584 17.3706 14.4557 17.1643 14.8313L18.3811 16.5207C18.4809 16.6591 18.4653 16.8494 18.3449 16.9701L16.9924 18.3235C16.8728 18.4428 16.6849 18.4598 16.5465 18.3621L14.8402 17.1652C14.4639 17.3746 14.0642 17.5416 13.6471 17.6643L13.2836 19.713C13.2544 19.879 13.11 20 12.9413 20H11.0281C10.858 20 10.7129 19.8772 10.6855 19.7099L10.3459 17.6713C9.92956 17.551 9.52778 17.385 9.14758 17.176L7.45352 18.3624C7.31542 18.4595 7.12723 18.4428 7.00791 18.3235L5.65545 16.9701C5.53544 16.8494 5.51978 16.6598 5.61858 16.5217L6.81555 14.8477C6.6044 14.4657 6.43673 14.0626 6.31533 13.6442L4.28698 13.2845C4.12105 13.255 4 13.1106 4 12.9419V11.0289C4 10.8591 4.12314 10.7137 4.29081 10.6859L6.31916 10.3482C6.44126 9.9287 6.60892 9.52557 6.81938 9.1447L5.63701 7.45322C5.53996 7.31513 5.55666 7.1273 5.67597 7.008L7.02809 5.656C7.1488 5.536 7.33768 5.52 7.47648 5.61913L9.15662 6.81913C9.53405 6.61252 9.93478 6.448 10.3522 6.328L10.6848 4.29183C10.7122 4.12348 10.8576 4 11.0281 4H12.9413C13.1104 4 13.2547 4.12174 13.2839 4.288L13.6426 6.3353C14.0576 6.456 14.4576 6.62226 14.8364 6.83165L16.5211 5.62087C16.6595 5.52104 16.8495 5.5367 16.9702 5.65704L18.323 7.00904C18.4423 7.1287 18.459 7.31687 18.3619 7.45496L17.1618 9.16522C17.3678 9.54052 17.5323 9.93704 17.6527 10.3496ZM9.56501 12C9.56501 13.3447 10.6552 14.4348 12 14.4348C13.3448 14.4348 14.435 13.3447 14.435 12C14.435 10.6553 13.3448 9.56522 12 9.56522C10.6552 9.56522 9.56501 10.6553 9.56501 12Z" />
            </svg>
    }
]