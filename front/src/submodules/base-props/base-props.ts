export interface BaseProps {
    className?: string,
    style?: React.CSSProperties,
    children?: React.ReactNode
};

export interface BasePropsPage extends BaseProps {
    id?: string
};