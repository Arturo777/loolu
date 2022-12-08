import React, { useState, useEffect } from 'react';

// material-ui
import { Button, Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useSelector, useDispatch } from 'store';

// third-party
import { useIntl } from 'react-intl';

// assets
import { IconSearch } from '@tabler/icons';
import { Link, useSearchParams } from 'react-router-dom';
import { getCategoriesService } from 'store/slices/catalogue';
import CategoriesListComponent from './CategoriesListComponent';
import { CategoryType } from 'types/catalogue';

// ==============================|| FACETS LIST ||============================== //

const CategoriesListPage = () => {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();

    // variables
    const [filteredCategories, setFilteredCategories] = useState<CategoryType[]>();
    const { categories } = useSelector((state) => state.catalogue);
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterText, setFilterText] = useState<string>('');

    useEffect(() => {
        dispatch(getCategoriesService({ idMerchant: 1 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setFilteredCategories(categories);
    }, [categories]);

    useEffect(() => {
        const newSearchParam = `&search=${filterText}`;
        setSearchParams(newSearchParam);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterText]);

    useEffect(() => {
        const search = searchParams.get('search');
        setFilterText(search ?? '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
        const newString = event?.target.value;
        setFilterText(newString ?? '');
    };

    useEffect(() => {
        const filtered = categories.filter(
            (item) =>
                JSON.stringify(item)
                    .toLowerCase()
                    .indexOf(filterText?.toLowerCase() ?? '') > -1
        );

        setFilteredCategories(filtered);
    }, [filterText, categories]);

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">
                            {' '}
                            {intl.formatMessage({
                                id: 'categories'
                            })}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button component={Link} to="create" variant="contained" startIcon={<AddIcon />} sx={{ mr: 3 }}>
                            {intl.formatMessage({
                                id: 'create_category'
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
            <CategoriesListComponent categories={filteredCategories} />
        </MainCard>
    );
};

export default CategoriesListPage;
