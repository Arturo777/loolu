import React, { useEffect, useState } from 'react';

import { styled, useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Card,
    Chip,
    CircularProgress,
    Collapse,
    Fade,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Menu,
    MenuItem,
    Typography
} from '@mui/material';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { getSecondLevelProducts } from 'store/slices/healthContent';
import { DefaultRootStateProps } from 'types';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.secondary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background:
            theme.palette.mode === 'dark'
                ? `linear-gradient(210.04deg, ${theme.palette.secondary.dark} -50.94%, rgba(144, 202, 249, 0) 95.49%)`
                : theme.palette.secondary[800],
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background:
            theme.palette.mode === 'dark'
                ? `linear-gradient(140.9deg, ${theme.palette.secondary.dark} -14.02%, rgba(144, 202, 249, 0) 85.50%)`
                : theme.palette.secondary[800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

const Products = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [secondLevel, setSecondLevel] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [open, setOpen] = React.useState(true);

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { secondLevelProducts } = useSelector((state: DefaultRootStateProps) => state.healthContent);

    const handleClick = () => {
        setOpen(!open);
    };
    useEffect(() => {
        setIsLoading(true);
        dispatch(getSecondLevelProducts());
    }, [dispatch]);

    useEffect(() => {
        setSecondLevel(secondLevelProducts);
        setIsLoading(false);
    }, [secondLevelProducts]);

    console.log(secondLevel);

    return (
        <>
            {isLoading ? (
                <Fade in={isLoading}>
                    <Box component={Typography} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 10 }}>
                        <CircularProgress />
                    </Box>
                </Fade>
            ) : (
                <>
                    <CardWrapper border={false} content={false} sx={{ mb: 2 }}>
                        <Box sx={{ p: 2.25 }}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                                Products
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Avatar
                                                sx={{
                                                    cursor: 'pointer',
                                                    ...theme.typography.smallAvatar,
                                                    backgroundColor: theme.palette.secondary[400],
                                                    color: theme.palette.secondary.dark
                                                }}
                                            >
                                                <ArrowUpwardIcon fontSize="inherit" />
                                            </Avatar>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sx={{ mb: 1.25 }}>
                                    <Typography
                                        sx={{
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            color:
                                                theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.secondary[200]
                                        }}
                                    >
                                        Total Earning
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardWrapper>
                    <Grid container spacing={1}>
                        <Grid item xs={3}>
                            <Card>
                                <List
                                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    subheader={
                                        <ListSubheader
                                            component="div"
                                            id="nested-list-subheader"
                                            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1, pb: 1 }}
                                        >
                                            <Typography variant="h3">Buena</Typography>
                                            <Chip label="99%" color="success" variant="outlined" />
                                        </ListSubheader>
                                    }
                                >
                                    <ListItemButton onClick={handleClick} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        {open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                        <ListItem>
                                            {/* <ListItemIcon>
                                                    <StarBorder />
                                                </ListItemIcon> */}
                                            <ListItemText primary="Starred" />
                                        </ListItem>
                                    </Collapse>
                                </List>
                            </Card>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
};

export default Products;
