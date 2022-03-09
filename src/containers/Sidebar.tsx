interface SidebarProps {
    children?: JSX.Element | JSX.Element[]
}

const Sidebar = ({ children }: SidebarProps) => {
    return (
        <div style={{ order: 1 }}>
            {children}
        </div>
    )
}

export default Sidebar;