import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, InputAdornment, Menu, MenuItem, OutlinedInput, Pagination, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// project imports
import ProfilesList from './ProfilesList';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// third-party
import { FormattedMessage, useIntl } from 'react-intl';

// assets
import { IconSearch } from '@tabler/icons';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { Link } from 'react-router-dom';

// ==============================|| USER LIST STYLE 1 ||============================== //

const ListStylePage1 = () => {
    const intl = useIntl();
    const theme = useTheme();
    const [filterText, setFilterText] = useState<string>('');
    const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);
    const handleClick = (event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
        const newString = event?.target.value;
        setFilterText(newString ?? '');
    };

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">
                            <FormattedMessage id="profiles" />
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button component={Link} to="/profiles/create" variant="contained" startIcon={<AddIcon />} sx={{ mr: 3 }}>
                            {intl.formatMessage({
                                id: 'create_profile'
                            })}
                        </Button>

                        <OutlinedInput
                            id="input-search-list-style1"
                            placeholder={intl.formatMessage({
                                id: 'search'
                            })}
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconSearch stroke={1.5} size="16px" />
                                </InputAdornment>
                            }
                            size="small"
                            value={filterText}
                            onChange={handleSearch}
                        />
                    </Grid>
                </Grid>
            }
            content={false}
        >
            <ProfilesList filterText={filterText} />
        </MainCard>
    );
};

export default ListStylePage1;
