import { useEffect, useMemo, useState } from "react";
import { DriveLayoutEnum } from "../models/DriveLayoutEnum";
import { LayoutProviderCtx, LayoutContextProps } from "./contexts/Layout.Provider.Ctx";

interface LayoutProviderProp {
    children: React.ReactNode
}

const Ctx = LayoutProviderCtx

const LayoutProvider = ({ children }: LayoutProviderProp) => {
    const [layout, setLayout] = useState<DriveLayoutEnum>(DriveLayoutEnum.Card)

    //Component did mount
    useEffect(() => {
        let storedLayout: string | null = localStorage.getItem("layout")

        if (storedLayout != null) {
            let driveLayoutEnum: DriveLayoutEnum = storedLayout as DriveLayoutEnum
            setLayout(driveLayoutEnum);
        }
    }, []);

    //When _layout changes
    useEffect(() => {
        localStorage.setItem("layout", layout.toString())
    }, [layout]);

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