import { useContext } from "react"
import { LayoutProviderCtx } from "../providers/contexts/Layout.Provider.Ctx"

export const useLayout = () => {
    const { layout, setLayout } = useContext(LayoutProviderCtx)

    return { layout, setLayout };
}