import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";
import Upbar from "../components/upbar/Upbar";

interface LayoutProps {
    children?: JSX.Element | JSX.Element[]
}

const Layout = () => {
    let { rid } = useParams()

    if (rid === undefined)
        rid = "0"

    let locationRid: number = +rid;

    return (
        <>
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Drives
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <main style={{ padding: "10px" }}>
                <Grid container spacing={0.5}>
                    <Grid item xs={2}>
                        Sidebar
                    </Grid>
                    <Grid item xs={10}>
                        <Upbar currentLocationRid={locationRid} />
                        <Outlet />
                    </Grid>
                </Grid>
            </main>
        </>
    )
}

export default Layout;