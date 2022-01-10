import { WithBreadcrumbsProps } from "../../hoc/withBreadcrumbs";

interface UpbarLeftProps extends WithBreadcrumbsProps {
    children?: JSX.Element | JSX.Element[]
}

const UpbarLeft = ({ children }: UpbarLeftProps) => {
    return (
        <div style={{ order: 1 }}>
            {children}
        </div>
    )
}

export default UpbarLeft;