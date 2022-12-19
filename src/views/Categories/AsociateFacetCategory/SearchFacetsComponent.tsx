import React, { useEffect, useState } from 'react';

// mui imports
import { Box, TextField, Fade, Card, Typography, Divider, CircularProgress, Stack, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// project imports
import { useDispatch, useSelector } from 'store';
import { getFacetsService } from 'store/slices/catalogue';

export default function SearchFacetsComponent() {
    // hooks
    const dispatch = useDispatch();

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

    const addToProduct = (id: number) => {
        console.log('product', id);
    };

    const addToSKU = (id: number) => {
        console.log('sku', id);
    };

    return (
        <Box sx={{ ml: 2, mr: 2, mb: 2, position: 'relative' }}>
            <TextField
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                sx={{ zIndex: 6 }}
                type="search"
                fullWidth
                label="Buscar facets"
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
                                <Box sx={{ p: 1 }}>
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
                                                onClick={() => addToProduct(item.id)}
                                                sx={{ mr: 1 }}
                                                color="success"
                                            >
                                                Producto
                                            </Button>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                startIcon={<AddIcon />}
                                                onClick={() => addToSKU(item.id)}
                                            >
                                                SKU
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
