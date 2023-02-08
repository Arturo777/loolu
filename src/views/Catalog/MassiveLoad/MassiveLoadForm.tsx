import React, { FormEvent, useState } from 'react';

// mui imports
import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// third-party imports
import { useIntl } from 'react-intl';

// projects imports
import { gridSpacing } from 'store/constant';
import { userSearchParams } from './commons';
import BrandSelect from 'ui-component/selects/BrandSelect';
import CategorySelect from 'ui-component/selects/CategorySelect';

type MassiveLoadFormProps = {
    handleSearch: (e: any) => void;
    setCurrentPage: (page: number) => void;
};

export default function MassiveLoadForm({ handleSearch, setCurrentPage }: MassiveLoadFormProps) {
    // hooks
    const intl = useIntl();

    const [params, setParams] = useState<userSearchParams>({
        productName: '',
        idSKU: '',
        idBrand: '',
        idCategory: ''
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearch(params);
        setCurrentPage(1);
    };

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setParams({ ...params, [name]: value });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={6} lg={2}>
                    <TextField
                        fullWidth
                        label={intl.formatMessage({
                            id: 'sku'
                        })}
                        name="idSKU"
                        type="search"
                        onChange={handleChangeText}
                    />
                </Grid>

                <Grid item xs={12} sm={6} lg={3}>
                    <TextField
                        fullWidth
                        label={intl.formatMessage({
                            id: 'product_name'
                        })}
                        name="productName"
                        type="search"
                        onChange={handleChangeText}
                    />
                </Grid>

                <Grid item xs={12} sm={6} lg={3}>
                    <BrandSelect
                        onChange={(brandId) => {
                            setParams((value) => ({ ...value, idBrand: brandId }));
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6} lg={4}>
                    <CategorySelect
                        onChange={(categoryId) => {
                            setParams((value) => ({ ...value, idCategory: categoryId }));
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="flex-end" alignItems="center">
                        <Button startIcon={<SearchIcon />} variant="contained" type="submit">
                            {intl.formatMessage({
                                id: 'search'
                            })}
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}
