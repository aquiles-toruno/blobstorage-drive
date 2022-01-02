interface UpbarProps {
    children?: JSX.Element | JSX.Element[]
};

const Upbar = ({ children }: UpbarProps) => {
    return (
        <div style={{ display: "flex", flexGrow: 1, justifyContent: "space-between", alignItems: "center", height: "35px", width: "100%", borderBottom: "1px solid rgb(170, 174, 176)" }}>
            {children}
        </div>
    )
}

export default Upbar;