interface UpbarRightProps {
    children?: JSX.Element | JSX.Element[]
}

const UpbarRight = ({ children }: UpbarRightProps) => {
    return (
        <div style={{ order: 2 }}>
            {children}
        </div>
    )
}

export default UpbarRight;