import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";
import DriveItemOptions from "../containers/DriveItemOptions";
import Upbar from "../containers/upbar/Upbar";
import UpbarLeft from "../containers/upbar/Upbar-Left";
import UpbarRight from "../containers/upbar/Upbar-Right";
import { withBreadcrumbs } from "../hoc/withBreadcrumbs";
import { DriveLayoutEnum } from "../models/DriveLayoutEnum";

interface LayoutProps {
    layout: DriveLayoutEnum
    onChangeLayout?(layout: DriveLayoutEnum): void
}

const Layout = ({ layout, onChangeLayout }: LayoutProps) => {
    const onOptionClickedHandle = (optCode: string, args?: any) => {
        switch (optCode) {
            case "changeLayout":
                if (onChangeLayout === undefined)
                    break;

                onChangeLayout(args)
                break;
            default:
                break;
        }
    }

    let { rid } = useParams()

    if (rid === undefined)
        rid = "0"

    let locationRid: number = +rid;

    let LeftUpbarWithBreadcrumbsComponent = withBreadcrumbs(UpbarLeft, locationRid)

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
                        Sidebar goes here
                    </Grid>
                    <Grid item xs={10}>
                        <Upbar>
                            <LeftUpbarWithBreadcrumbsComponent />
                            <UpbarRight>
                                <DriveItemOptions layout={layout} onOptionClicked={onOptionClickedHandle} />
                            </UpbarRight>
                        </Upbar>
                        <Outlet />
                    </Grid>
                </Grid>
            </main>
        </>
    )
}

export default Layout;