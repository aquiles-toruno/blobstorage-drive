import { AppBar, Avatar, Box, Grid, IconButton, Menu, MenuItem, Typography, Toolbar, Tooltip, Divider } from "@mui/material";
import React from "react";
import { Outlet, useParams } from "react-router-dom";
import DriveItemOptions from "../containers/DriveItemOptions";
import Sidebar from "../containers/Sidebar";
import Upbar from "../containers/upbar/Upbar";
import UpbarLeft from "../containers/upbar/Upbar-Left";
import UpbarRight from "../containers/upbar/Upbar-Right";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { Link } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LayoutProvider from "../providers/Layout.Provider";
import { useAuth0 } from "@auth0/auth0-react";
import { useFilePicker } from "../hooks/useFilePicker";

interface LayoutProps {
}

const Layout = ({ }: LayoutProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    let { getAccessTokenSilently, user, logout } = useAuth0()

    let { rid } = useParams()

    if (rid === undefined)
        rid = "0"

    let locationRid: number = + rid;

    const settings = [{
        id: 1,
        title: 'Logout',
        action: logout
    }];

    const getToken = async () => {
        let token = await getAccessTokenSilently()
        return token;
    }

    const { isLoadingCrumbs, crumbs } = useBreadcrumbs(locationRid, getToken)

    const [openFilePicker, { plainFiles }] = useFilePicker({
        accept: '.txt',
        multiple: true
    })

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

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleUploadFile = () => {
        openFilePicker()
    }

    return (
        <LayoutProvider>
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Drives
                        </Typography>
                        <Box>
                            <Tooltip title="Profile">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Aquiles" src={user?.picture} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem>
                                    <Typography>{user?.email}</Typography>
                                </MenuItem>
                                <Divider />
                                {settings.map((setting) => (
                                    <MenuItem key={setting.id} onClick={() => {
                                        handleCloseUserMenu()
                                        setting.action({
                                            returnTo: window.location.origin
                                        })
                                    }}>
                                        <Typography textAlign="center">{setting.title}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
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
                                    Location
                                </MenuItem>
                                <MenuItem onClick={handleUploadFile}>
                                    Upload file
                                </MenuItem>
                                <MenuItem>
                                    Upload location
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
                                <DriveItemOptions />
                            </UpbarRight>
                        </Upbar>
                        <Outlet />
                    </Grid>
                </Grid>
            </main>
        </LayoutProvider>
    )
}

export default Layout;