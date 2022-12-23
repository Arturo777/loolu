import React, { useEffect, useState } from 'react';

// mui imports
import { Box, TextField, Fade, Card, Typography, Divider, CircularProgress, Stack, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// third-part imports
import { useIntl } from 'react-intl';

// project imports
import { useDispatch, useSelector } from 'store';
import { getFacetsService } from 'store/slices/catalogue';

// types
import { FacetType, SpecificationValuesType } from 'types/catalogue';

type SearchFacetsComponentProps = {
    handleAddFacet: (facet: FacetType, mode: SpecificationValuesType) => void;
};

export default function SearchFacetsComponent({ handleAddFacet }: SearchFacetsComponentProps) {
    // hooks
    const dispatch = useDispatch();
    const intl = useIntl();

    // store
    const {
        facetsInfo: { facets },
        loading
    } = useSelector((state) => state.catalogue);

    // vars
    const [searchText, setSearchText] = useState<string>('');
    const [isFocus, setIsFocus] = useState<boolean>(false);

    useEffect(() => {
        if (searchText.length > 2) {
            dispatch(getFacetsService({ idMerchant: 1, page: 1, term: searchText }));
        }
    }, [dispatch, searchText]);

    const onchangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setSearchText(value);
    };

    const addToProduct = (facet: FacetType) => {
        handleAddFacet(facet, SpecificationValuesType.PRODUCT);
    };

    const addToSKU = (facet: FacetType) => {
        handleAddFacet(facet, SpecificationValuesType.SKU);
    };

    return (
        <Box sx={{ ml: 2, mr: 2, mb: 2, position: 'relative' }}>
            <TextField
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                sx={{ zIndex: 6 }}
                type="search"
                fullWidth
                label={intl.formatMessage({ id: 'search_facets' })}
                value={searchText}
                onChange={onchangeText}
            />
            <Fade in={Boolean(searchText.length > 2 && isFocus)}>
                <Card elevation={2} sx={cardStyles}>
                    {/* LOADER */}
                    {loading && (
                        <Stack justifyContent="center" alignItems="center" sx={{ p: 2 }}>
                            <CircularProgress />
                        </Stack>
                    )}
                    {/* ELEMENTS */}
                    {!loading &&
                        Boolean(facets.length) &&
                        facets.map((item, index) => {
                            const isTheLastOne = Number(index) === facets.length - 1;
                            return (
                                <Box sx={{ p: 1 }} key={`facets-list-item-${item.id}`}>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        sx={{ p: 0, mb: isTheLastOne ? 0 : 2 }}
                                    >
                                        <Typography variant="body2">{item.name}</Typography>
                                        <Box>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                startIcon={<AddIcon />}
                                                onClick={() => addToProduct(item)}
                                                sx={{ mr: 1 }}
                                                color="success"
                                            >
                                                {intl.formatMessage({ id: 'product' })}
                                            </Button>
                                            <Button size="small" variant="outlined" startIcon={<AddIcon />} onClick={() => addToSKU(item)}>
                                                {intl.formatMessage({ id: 'sku' })}
                                            </Button>
                                        </Box>
                                    </Stack>

                                    {!isTheLastOne && <Divider />}
                                </Box>
                            );
                        })}
                    {/* No data */}
                    {!loading && searchText.length > 2 && !facets.length && (
                        <Box sx={{ p: 2, pb: 0, textAlign: 'center' }}>
                            <Typography sx={{ mb: 2 }} color="grey[300]">
                                Sin coincidencias
                            </Typography>
                        </Box>
                    )}
                </Card>
            </Fade>
        </Box>
    );
}

const cardStyles = {
    position: 'absolute',
    top: '120%',
    p: 1,
    left: 0,
    zIndex: 5,
    minHeight: 20,
    maxHeight: 250,
    overflowY: 'scroll',
    width: 1,
    '&::-webkit-scrollbar': {
        width: 5
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1'
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888'
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#555'
    }
};
