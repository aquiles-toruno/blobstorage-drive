import { Backdrop, CircularProgress } from "@mui/material";
import React, { useState } from "react";

interface WithLoadingProp {
    // loading?: boolean
}

export function withLoading<T extends WithLoadingProp>(WrappedComponent: React.ComponentType<T>) {
    const ComponentWithLoading = (props: T) => {
        const [loading, setLoading] = useState(false)

        const toggleLoading = (isLoading: boolean) => {
            setLoading(isLoading)
        }

        return <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <WrappedComponent {...props} onLoadingChange={toggleLoading} />
        </>
    }

    return ComponentWithLoading;
}