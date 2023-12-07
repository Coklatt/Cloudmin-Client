import React, { useState } from 'react';
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined,
} from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from 'state';
import profileImage from 'assets/profile.jpg';
import {
    AppBar,
    Box,
    Button,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isNonMobile = useMediaQuery('(min-width: 1000px)');

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const clickHandler = (event) => setAnchorEl(event.currentTarget);
    const closeHandler = () => setAnchorEl(null);

    return (
        <AppBar
            sx={{
                position: 'static',
                background: 'none',
                boxShadow: 'none',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* LEFT SIDE */}
                <FlexBetween>
                    <IconButton sx={{ mr: '1rem', px: '0' }} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <MenuIcon />
                    </IconButton>
                    <FlexBetween
                        backgroundColor={theme.palette.background.alt}
                        borderRadius="9px"
                        gap="3rem"
                        p="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search....." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>

                {/* RIGHT SIDE */}
                <FlexBetween gap="1.5rem">
                    {isNonMobile && (
                        <>
                            <IconButton sx={{ px: '0' }} onClick={() => dispatch(setMode())}>
                                {theme.palette.mode === 'dark' ? (
                                    <DarkModeOutlined sx={{ fontSize: '25px' }} />
                                ) : (
                                    <LightModeOutlined sx={{ fontSize: '25px' }} />
                                )}
                            </IconButton>
                            <IconButton sx={{ px: '0' }}>
                                <SettingsOutlined sx={{ fontSize: '25px' }} />
                            </IconButton>
                        </>
                    )}

                    <FlexBetween>
                        <Button
                            onClick={clickHandler}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                textTransform: 'none',
                                gap: '1rem',
                            }}
                        >
                            <Box
                                component="img"
                                alt="profile"
                                src={profileImage}
                                height="32px"
                                width="32px"
                                borderRadius="50%"
                                sx={{ objectFit: 'cover' }}
                            />
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.85rem"
                                    sx={{ color: theme.palette.secondary[100] }}
                                >
                                    {user.name}
                                </Typography>

                                <Typography fontSize="0.75rem" sx={{ color: theme.palette.secondary[200] }}>
                                    {user.occupation}
                                </Typography>
                            </Box>
                            <ArrowDropDownOutlined
                                sx={{
                                    color: theme.palette.secondary[300],
                                    fontSize: '25px',
                                }}
                            />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={closeHandler}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        >
                            <MenuItem onClick={closeHandler}>Log Out</MenuItem>
                            {!isNonMobile && (
                                <MenuItem sx={{ justifyContent: 'center' }}>
                                    <>
                                        <IconButton sx={{ px: '0' }} onClick={() => dispatch(setMode())}>
                                            {theme.palette.mode === 'dark' ? (
                                                <DarkModeOutlined sx={{ fontSize: '25px' }} />
                                            ) : (
                                                <LightModeOutlined sx={{ fontSize: '25px' }} />
                                            )}
                                        </IconButton>
                                    </>
                                </MenuItem>
                            )}
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
