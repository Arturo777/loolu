import React, { useEffect, useMemo, useState } from 'react';

// mui imports
import { Box, Chip, Fade, Pagination, Stack, useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDispatch } from 'store';
import { getProductsThunk } from 'store/slices/product';
import { FormattedMessage } from 'react-intl';

// types

import { Products } from 'types/e-commerce';
import { userSearchParams } from './commons';

type MassiLoadResultsProps = {
    searchParams: userSearchParams;
    currentPage: number;
    setCurrentPage: (page: number) => void;
};

export default function MassiLoadResults({ searchParams, currentPage, setCurrentPage }: MassiLoadResultsProps) {
    // hooks
    const dispatch = useDispatch();
    const theme = useTheme();

    //  store

    // consts
    const [products, setProducts] = useState<Products[]>([]);

    const [maxPage, setMaxPage] = useState(2);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        dispatch(
            getProductsThunk({
                idMerchant: 1,
                page: currentPage,
                ...searchParams
            })
        )
            .then((resp) => {
                // console.log(resp.payload);
                const { response } = resp.payload;

                setProducts(response);
                if (response.length) {
                    setMaxPage(response[0].totalPages);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [dispatch, currentPage, searchParams]);

    const columns: GridColDef[] = useMemo(
        () => [
            { field: 'IdProducto', headerName: 'ID Product', flex: 1 },
            { field: 'IdSku', headerName: 'ID SKU', flex: 1 },
            { field: 'NombreSku', headerName: 'Name', flex: 4 },
            { field: 'NombreProducto', headerName: 'Product', flex: 4 },
            { field: 'Marca', headerName: 'Brand', flex: 2 },
            {
                field: 'Estatus',
                headerName: 'Status',
                flex: 2,
                renderCell(params) {
                    return (
                        <Chip
                            label={<FormattedMessage id={params.row.Estatus ? 'active' : 'inactive'} />}
                            size="small"
                            sx={
                                params.row.Estatus
                                    ? {
                                          bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : 'success.light',
                                          color: 'success.dark'
                                      }
                                    : {
                                          bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : 'error.light',
                                          color: 'error.dark'
                                      }
                            }
                        />
                    );
                }
            }
        ],
        [theme.palette.dark.dark, theme.palette.mode]
    );

    const handlePage = (_: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <Box>
            <DataGrid
                loading={isLoading}
                autoHeight
                disableSelectionOnClick
                rows={products}
                getRowId={(row) => `${row.IdProducto}-${row.IdSku}`}
                columns={columns}
                pageSize={10}
                hideFooterPagination
            />

            <Fade in={Boolean(!isLoading || products.length)}>
                <Stack justifyContent="flex-end" direction="row">
                    <Pagination count={maxPage} page={currentPage} onChange={handlePage} siblingCount={1} boundaryCount={1} />
                </Stack>
            </Fade>
        </Box>
    );
}
