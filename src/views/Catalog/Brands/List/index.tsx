import React, { useState, useEffect } from 'react';

// material-ui
import { Button, Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// third-party
import { FormattedMessage, useIntl } from 'react-intl';
import { IconSearch } from '@tabler/icons';
import { Link, useSearchParams } from 'react-router-dom';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useSelector } from 'store';
import Loader from 'ui-component/Loader';

import MultiMerchant from 'ui-component/MultiMerchantButton';
// assets
import BrandsList from './BrandsList';
import { MerchantType } from 'types/security';
import { BrandType, NewBrandType2 } from 'types/catalog';

// ==============================|| USER LIST STYLE 1 ||============================== //

const BrandsListPage = () => {
    // hooks
    const intl = useIntl();
    const [searchParams, setSearchParams] = useSearchParams();

    // store
    const { loading } = useSelector((state) => state.catalogue);

    // state
    const [filterText, setFilterText] = useState<string>('');
    const [selectedMerchants, setSelectedMerchants] = useState<MerchantType[] | null>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [brandData, setBrandData] = useState<BrandType>();
    useEffect(() => {
        const search = searchParams.get('search');
        setFilterText(search ?? '');
    }, [searchParams]);

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
        const newString = event?.target.value;

        setFilterText(newString ?? '');
        setSearchParams(`?search=${newString}`);
    };
    const initialBrandData: BrandType = {
        idBrand: 0,
        name: '',
        isActive: true,
        imageUrl: '',
        title: '',
        metaTagDescription: null,
        idMerchant: 0
    };

    const clearBrand = () => {
        console.log('clearBrand');
        setIsEdit(false);
        setBrandData(initialBrandData);
    };
    return (
        <MainCard
            title={
                <Grid container direction="row" alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid container alignItems="center" item md={4}>
                        <Typography variant="h3">Change Brand</Typography>
                        <MultiMerchant
                            onChange={(merchants: MerchantType[]) => setSelectedMerchants(merchants)}
                            maxShow={3}
                            justOne
                            defaultSelected={[]}
                        />
                    </Grid>
                    <Grid item>
                        {/* <Button component={Link} to="/brands/create" variant="contained" startIcon={<AddIcon />} sx={{ mr: 3 }}>
                            {intl.formatMessage({
                                id: 'create_brand'
                            })}
                        </Button> */}
                        <Button onClick={clearBrand} variant="contained" startIcon={<AddIcon />} sx={{ mr: 3 }}>
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
            {loading && <Loader />}
            <BrandsList
                brandData={brandData}
                setBrandData={setBrandData}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                selectedMerchants={selectedMerchants}
                filterText={filterText}
            />
        </MainCard>
    );
};
export default BrandsListPage;
