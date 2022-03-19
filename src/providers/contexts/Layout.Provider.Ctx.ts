import { createContext } from "react";
import { DriveLayoutEnum } from "../../models/DriveLayoutEnum";

export interface LayoutContextProps {
    layout: DriveLayoutEnum,
    setLayout(layout: DriveLayoutEnum): void
}

export const LayoutProviderCtx = createContext<LayoutContextProps>({
    layout: DriveLayoutEnum.Card,
    setLayout: (layout: DriveLayoutEnum) => {
        console.log(`layout.provider.ctx ${layout}`)
    }
})