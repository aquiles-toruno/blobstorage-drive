import { useMemo, useState } from "react";
import { DriveLayoutEnum } from "../models/DriveLayoutEnum";
import { LayoutProviderCtx, LayoutContextProps } from "./contexts/Layout.Provider.Ctx";

interface LayoutProviderProp {
    children: React.ReactNode
}

const Ctx = LayoutProviderCtx

const LayoutProvider = ({ children }: LayoutProviderProp) => {
    const [layout, setLayout] = useState<DriveLayoutEnum>(DriveLayoutEnum.Card)
    
    const value: LayoutContextProps = {
        layout,
        setLayout: (layout: DriveLayoutEnum) => {
            setLayout(layout)
        }
    }

    return <Ctx.Provider value={value}>
        {children}
    </Ctx.Provider>
}

export default LayoutProvider;