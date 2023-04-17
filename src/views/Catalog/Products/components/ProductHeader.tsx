import { Button, Grid, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SortOptions from '../utils/SortOptions';

// eslint-disable-next-line import/prefer-default-export
export const ProductHeader = ({
    matchDownMD,
    matchDownSM,
    spacingMD,
    handleDrawerOpen,
    filter,
    setFilter
}: {
    matchDownMD: any;
    matchDownSM: any;
    spacingMD: any;
    handleDrawerOpen: any;
    filter: any;
    setFilter: any;
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const openSort = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: string) => {
        setFilter({ ...filter, sort: index });
        setAnchorEl(null);
    };
    const intl = useIntl();
    const sortLabel = SortOptions.filter((items) => items.value === filter.sort);

    return (
        <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between" spacing={matchDownMD ? 0.5 : 2}>
                <Grid item>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="h4">{intl.formatMessage({ id: 'products' })}</Typography>
                        <IconButton size="large">
                            <ArrowForwardIosIcon sx={{ width: '0.875rem', height: '0.875rem', fontWeight: 500, color: 'grey.500' }} />
                        </IconButton>
                    </Stack>
                </Grid>
                <Grid item>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={matchDownSM ? 0.5 : spacingMD}>
                        <Typography component={Link} to="/products/create-product" variant="subtitle2" sx={{ textDecoration: 'none' }}>
                            <Button
                                disableRipple
                                onClick={handleDrawerOpen}
                                variant="contained"
                                startIcon={<AddIcon sx={{ fontWeight: 500, color: 'success' }} />}
                            >
                                {intl.formatMessage({ id: 'create-product' })}
                            </Button>
                        </Typography>
                        <Button
                            disableRipple
                            onClick={handleDrawerOpen}
                            color="secondary"
                            startIcon={<FilterAltIcon sx={{ fontWeight: 500, color: 'secondary.200' }} />}
                        >
                            {intl.formatMessage({ id: 'filter' })}
                        </Button>

                        <Typography sx={{ display: { xs: 'none', sm: 'flex' }, fontSize: '1rem', color: 'grey.500', fontWeight: 400 }}>
                            |
                        </Typography>
                        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                            <Typography variant="h5">Ordenar por: </Typography>
                            <Button
                                id="demo-positioned-button"
                                aria-controls="demo-positioned-menu"
                                aria-haspopup="true"
                                aria-expanded={openSort ? 'true' : undefined}
                                onClick={handleClickListItem}
                                sx={{ color: 'grey.500', fontWeight: 400 }}
                                endIcon={<KeyboardArrowDownIcon />}
                            >
                                {sortLabel.length > 0 && sortLabel[0].label}
                            </Button>
                            <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={openSort}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                            >
                                {SortOptions.map((option, index) => (
                                    <MenuItem
                                        sx={{ p: 1.5 }}
                                        key={index}
                                        selected={option.value === filter.sort}
                                        onClick={(event) => handleMenuItemClick(event, option.value)}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    );
};
