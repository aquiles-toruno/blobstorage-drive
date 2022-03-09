import React, { useEffect } from "react";
import UpbarLeft from "./Upbar-Left";
import UpbarRight from "./Upbar-Right";

interface UpbarProps {
    children: React.ReactNode
};

const Upbar = ({ children }: UpbarProps) => {
    useEffect(() => {
        validateChildren()
    }, [])

    const validateChildren = () => {
        React.Children.forEach(children, (child, index) => {
            let isValidElement = React.isValidElement(child)
            let childAsReactElement = child as React.ReactElement<any>
            let _type = childAsReactElement.type
            console.log(childAsReactElement)

            if (!isValidElement)
            throw new Error(`[${_type}] is not a valid child. All component children of <Upbar> must be a <UpbarLeft> or <UpbarRight>`);

            if (_type === UpbarLeft || _type === UpbarRight)
                return;

            throw new Error(`[${_type}] is not a valid child. All component children of <Upbar> must be a <UpbarLeft> or <UpbarRight>`);
        })
    }

    return (
        <div style={{ display: "flex", flexGrow: 1, justifyContent: "space-between", alignItems: "center", height: "35px", width: "100%", borderBottom: "1px solid rgb(170, 174, 176)" }}>
            {children}
        </div>
    )
}

export default Upbar;