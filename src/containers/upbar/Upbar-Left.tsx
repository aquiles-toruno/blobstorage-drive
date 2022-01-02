interface UpbarLeftProps {
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