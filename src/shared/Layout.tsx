import { AppBar, Avatar, Box, Grid, IconButton, Menu, MenuItem, Typography, Toolbar } from "@mui/material";
import React from "react";
import { Outlet, useParams } from "react-router-dom";
import DriveItemOptions from "../containers/DriveItemOptions";
import Sidebar from "../containers/Sidebar";
import Upbar from "../containers/upbar/Upbar";
import UpbarLeft from "../containers/upbar/Upbar-Left";
import UpbarRight from "../containers/upbar/Upbar-Right";
import { DriveLayoutEnum } from "../models/DriveLayoutEnum";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { Link } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';

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
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let { rid } = useParams()

    if (rid === undefined)
        rid = "0"

    let locationRid: number = +rid;

    const { isLoadingCrumbs, crumbs } = useBreadcrumbs(locationRid)

    const generateLinks = () => {
        if (crumbs.length === 0)
            return <Typography color="text.primary" fontSize={18}>Mi unidad</Typography>

        return crumbs.map(({ file_Location_Rid, fileLocationName, isRoot }, i) => {
            if (i + 1 === crumbs.length) {
                return <Typography key={file_Location_Rid} fontSize={18} color="text.primary">{fileLocationName}</Typography>
            }
            else {
                let relativeUri = isRoot ? "/" : `/location/${file_Location_Rid}`
                return <Link key={file_Location_Rid} color="inherit" to={relativeUri} >
                    {fileLocationName}
                </Link>
            }
        });
    }

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
                        <Sidebar>
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                                </IconButton>
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem>
                                    <Avatar /> Profile
                                </MenuItem>
                                <MenuItem>
                                    <Avatar /> My account
                                </MenuItem>
                                <MenuItem>
                                    Add another account
                                </MenuItem>
                                <MenuItem>
                                    Settings
                                </MenuItem>
                                <MenuItem>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Sidebar>
                    </Grid>
                    <Grid item xs={10}>
                        <Upbar>
                            <UpbarLeft>
                                <Breadcrumbs aria-label="breadcrumb">
                                    {
                                        generateLinks()
                                    }
                                </Breadcrumbs>
                            </UpbarLeft>
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