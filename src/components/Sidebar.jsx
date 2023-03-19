import React from 'react';
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from '@mui/material';
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronLeftOutlined,
    ChevronRightOutlined,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import profileImage from 'assets/profile.jpg';
import navItem from './navItem.js';

const Sidebar = ({ user, drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState('');
    const navigate = useNavigate();
    const theme = useTheme();

    const navigateMenu = (text) => {
        return () => {
            navigate(`/${text}`);
            setActive(text);
        };
    };

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        '& ::-webkit-scrollbar': {
                            width: '14px',
                        },
                        '& ::-webkit-scrollbar-track': {
                            backgroundColor: 'transparent',
                        },
                        '& ::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(168, 187, 191, 0.5)',
                            borderRadius: '30px',
                            // border: '6px solid transparent',
                            backgroundClip: 'padding-box',
                            border: '4px transparent solid',
                            // borderLeft: '4px white solid',
                        },
                        '& ::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: 'rgba(214, 222, 225, 0.8)',
                        },
                        '& .MuiDrawer-paper': {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: 'border-box',
                            borderWidth: isNonMobile ? 0 : '2px',
                            width: drawerWidth,
                            overflow: 'hidden',
                        },
                        '& .MuiDrawer-paper:hover': {
                            overflowY: 'overlay',
                            //     overflowY: 'scroll',
                        },
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant="h4" fontWeight="bold">
                                        Cloudmin
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItem.map(({ text, icon }) => {
                                if (!icon) {
                                    return (
                                        <Typography
                                            key={text}
                                            sx={{ m: '2.25rem 0 1rem 1.5rem', fontWeight: 'bold' }}
                                        >
                                            {text}
                                        </Typography>
                                    );
                                }
                                const lcText = text.toLowerCase();

                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={navigateMenu(lcText)}
                                            sx={{
                                                backgroundColor:
                                                    active === lcText
                                                        ? theme.palette.secondary[300]
                                                        : 'transparent',
                                                color:
                                                    active === lcText
                                                        ? theme.palette.primary[600]
                                                        : theme.palette.secondary[200],
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: '1rem',
                                                    color:
                                                        active === lcText
                                                            ? theme.palette.primary[600]
                                                            : theme.palette.secondary[200],
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcText && (
                                                <ChevronRightOutlined sx={{ ml: 'auto' }} />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                        <Box mb="2rem">
                            <Divider />
                            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                                <Box
                                    component="img"
                                    alt="profile"
                                    src={profileImage}
                                    height="40px"
                                    width="40px"
                                    borderRadius="50%"
                                    sx={{ objectFit: 'cover' }}
                                />
                                <Box textAlign="left">
                                    <Typography
                                        fontWeight="bold"
                                        fontSize="0.9rem"
                                        sx={{ color: theme.palette.secondary[100] }}
                                    >
                                        {user.name}
                                    </Typography>

                                    <Typography
                                        fontSize="0.8rem"
                                        sx={{ color: theme.palette.secondary[200] }}
                                    >
                                        {user.occupation}
                                    </Typography>
                                </Box>
                                <SettingsOutlined
                                    sx={{ color: theme.palette.secondary[300], fontSize: '25px' }}
                                />
                            </FlexBetween>
                        </Box>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;
