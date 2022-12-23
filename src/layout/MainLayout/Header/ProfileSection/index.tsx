import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Chip,
    ClickAwayListener,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Stack,
    Typography
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import useAuth from 'hooks/useAuth';

// assets
import { IconLogout, IconSettings, IconUserCircle } from '@tabler/icons';
import useConfig from 'hooks/useConfig';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme();
    const { borderRadius } = useConfig();
    const navigate = useNavigate();

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const { logout, user } = useAuth();
    const [open, setOpen] = useState(false);
    /**
     * anchorRef is used on different components and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef<any>(null);
    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error(err);
        }
    };

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement>, index: number, route: string = '') => {
        setSelectedIndex(index);
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event: React.MouseEvent<HTMLDivElement> | MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '30px',
                    paddingX: 2,
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0,
                        paddingRight: 0
                    }
                }}
                label={
                    <Stack
                        sx={{
                            ...theme.typography.mediumAvatar,
                            cursor: 'pointer',
                            m: 0
                        }}
                        color="inherit"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <IconUserCircle stroke={1.5} size="2rem" color={theme.palette.primary.main} />
                    </Stack>
                }
                icon={
                    <Box sx={{ ml: 10 }}>
                        <Typography
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            component="span"
                            variant="h4"
                            sx={{ fontWeight: '500' }}
                            color="inherit"
                        >
                            {user?.name}
                        </Typography>
                    </Box>
                }
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />

            <Popper
                placement="bottom"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [10, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Transitions in={open} {...TransitionProps}>
                            <Paper>
                                {open && (
                                    <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                        <Box sx={{ p: 2, pb: 0 }}>
                                            <Stack sx={{ mb: 2 }}>
                                                <Stack direction="row" spacing={0.5} alignItems="center">
                                                    <Typography variant="h4">Good Morning,</Typography>
                                                    <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                                                        {user?.name}
                                                    </Typography>
                                                </Stack>
                                                <Typography variant="subtitle2">Project Admin</Typography>
                                            </Stack>

                                            <Divider />
                                        </Box>
                                        <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                                            <Box sx={{ p: 2, pt: 0 }}>
                                                <Divider />
                                                <List
                                                    component="nav"
                                                    sx={{
                                                        width: '100%',
                                                        maxWidth: 350,
                                                        minWidth: 280,
                                                        backgroundColor: theme.palette.background.paper,
                                                        borderRadius: '10px',
                                                        [theme.breakpoints.down('md')]: {
                                                            minWidth: '100%'
                                                        },
                                                        '& .MuiListItemButton-root': {
                                                            mt: 0.5
                                                        }
                                                    }}
                                                >
                                                    <ListItemButton
                                                        sx={{ borderRadius: `${borderRadius}px` }}
                                                        selected={selectedIndex === 0}
                                                        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                                                            handleListItemClick(event, 0, '/user/account-profile/profile1')
                                                        }
                                                    >
                                                        <ListItemIcon>
                                                            <IconSettings stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
                                                    </ListItemButton>
                                                    <ListItemButton
                                                        sx={{ borderRadius: `${borderRadius}px` }}
                                                        selected={selectedIndex === 4}
                                                        onClick={handleLogout}
                                                    >
                                                        <ListItemIcon>
                                                            <IconLogout stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                                                    </ListItemButton>
                                                </List>
                                            </Box>
                                        </PerfectScrollbar>
                                    </MainCard>
                                )}
                            </Paper>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
