import React, { useState, useEffect } from 'react';

// material-ui
import { Button, Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// third-party
import { FormattedMessage, useIntl } from 'react-intl';

// assets
import { IconSearch } from '@tabler/icons';
import { Link, useSearchParams } from 'react-router-dom';
import BransList from './BrandsList';

// ==============================|| USER LIST STYLE 1 ||============================== //

const BrandsListPage = () => {
    const intl = useIntl();
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterText, setFilterText] = useState<string>('');

    useEffect(() => {
        const search = searchParams.get('search');
        setFilterText(search ?? '');
    }, [searchParams]);

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
        const newString = event?.target.value;

        setFilterText(newString ?? '');
        setSearchParams(`?search=${newString}`);
    };

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">
                            <FormattedMessage id="brands" />
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button component={Link} to="/brands/create" variant="contained" startIcon={<AddIcon />} sx={{ mr: 3 }}>
                            {intl.formatMessage({
                                id: 'create_brand'
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
            <BransList filterText={filterText} />
        </MainCard>
    );
};

export default BrandsListPage;
