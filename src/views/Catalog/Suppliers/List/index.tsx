import React, { useState, useEffect } from 'react';

// material-ui
import { Button, Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// third-party
import { FormattedMessage, useIntl } from 'react-intl';
import { IconSearch } from '@tabler/icons';
import { Link, useSearchParams } from 'react-router-dom';

// assets
import ProvidersList from './ProvidersList';
import { useSelector } from 'store';
import Loader from 'ui-component/Loader';
import MultiMerchant from 'ui-component/MultiMerchantButton';
import { MerchantType } from 'types/security';

// ==============================|| USER LIST STYLE 1 ||============================== //

const ProvidersListPage = () => {
    // hooks
    const intl = useIntl();
    const [searchParams, setSearchParams] = useSearchParams();

    // store
    const { loading } = useSelector((state) => state.catalogue);

    // vars
    const [filterText, setFilterText] = useState<string>('');
    const [selectedMerchants, setSelectedMerchants] = useState<MerchantType[] | null>([]);
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
                    <Grid container alignItems="center" item md={4}>
                        <Typography variant="h3">
                            <FormattedMessage id="suppliers" />
                        </Typography>
                        <MultiMerchant
                            onChange={(merchants: MerchantType[]) => setSelectedMerchants(merchants)}
                            maxShow={3}
                            justOne
                            defaultSelected={[]}
                        />
                    </Grid>
                    <Grid item>
                        <Button component={Link} to="/suppliers/create" variant="contained" startIcon={<AddIcon />} sx={{ mr: 3 }}>
                            {intl.formatMessage({
                                id: 'create_supplier'
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
            {loading && <Loader />}
            {selectedMerchants && <ProvidersList selectedMerchants={selectedMerchants} filterText={filterText} />}
        </MainCard>
    );
};

export default ProvidersListPage;
