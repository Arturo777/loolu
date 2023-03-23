import React, { useEffect, useState, useMemo } from 'react';

// material-ui
import { Box, Button, CircularProgress, Collapse, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';

// third imports
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

// project imports
import { BrandType, BrandType2 } from 'types/catalog';
import { useDispatch, useSelector } from 'store';

// assets
import { getBrands, getBrands2 } from 'store/slices/catalog';

type BransListProps = {
    filterText: string;
    selectedMerchants: any;
};

const BrandsList = ({ selectedMerchants, filterText }: BransListProps) => {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();

    // store
    const { brands2, brands, loading } = useSelector((state) => state.catalogue);
    // merchants
    // state
    const [pageSize, setPageSize] = useState<number>(10);
    const [filteredBrands, setFilteredBrands] = useState<BrandType[] | undefined>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [idMerchant, setIdMerchant] = useState<number>(0);
    // setIdMerchant(selectedMerchants[0].merchantId);
    useEffect(() => {
        // dispatch(getBrands());
        if (!selectedMerchants?.length) {
            return;
        }
        setIsLoading(true);
        selectedMerchants && dispatch(getBrands2(selectedMerchants[0].merchantId));
        // dispatch(getBrands2(1));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMerchants]);
    const marcas = useMemo(() => {
        if (!selectedMerchants?.length) {
            return null;
        }
        console.log('selectedMerchants', selectedMerchants);
        // console.log('brands2', brands2);
        const marcas2 = brands2.filter((marca: any) => marca?.merchantId === selectedMerchants[0]?.merchantId);
        setIsLoading(false);
        // console.log('marcas2', marcas2);
        return marcas2[0];
    }, [brands2, selectedMerchants]);

    // console.log('marcas', marcas);

    useEffect(() => {
        if (filterText?.length === 0) {
            setFilteredBrands(marcas?.brands);
        } else {
            const filtered = marcas?.brands.filter(
                (brand: BrandType) =>
                    JSON.stringify(brand)
                        .toLowerCase()
                        .indexOf(filterText?.toLowerCase() ?? '') > -1
            );

            setFilteredBrands(filtered);
        }
        // console.log('filteredBrands', filteredBrands);
    }, [filterText, marcas]);
    const columns: GridColDef[] = [
        // { field: 'idBrand', headerName: 'ID', width: 80 },
        {
            field: 'name',
            headerName: intl.formatMessage({
                id: 'name'
            }),
            width: 150
        },
        {
            field: 'title',
            headerName: intl.formatMessage({
                id: 'title'
            }),
            width: 150
        },
        {
            field: 'metaTagDescription',
            headerName: intl.formatMessage({
                id: 'description'
            }),
            width: 150
        },
        {
            field: 'imageUrl',
            headerName: intl.formatMessage({
                id: 'image'
            }),
            width: 220
        },
        {
            field: 'idBrand',
            headerName: '',
            renderCell: (params) => (
                <Box>
                    <Button component={Link} to={`${params.row.idBrand}/edit`} size="small" startIcon={<EditIcon />} variant="outlined">
                        {intl.formatMessage({ id: 'edit' })}
                    </Button>
                </Box>
            ),
            width: 120
        }
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={!loading}>
                {!isLoading && (
                    <DataGrid
                        loading={loading}
                        rows={filteredBrands ?? []}
                        // eslint-disable-next-line @typescript-eslint/no-shadow
                        getRowId={(row: any) => `${row.idBrand}`}
                        columns={columns}
                        pageSize={pageSize}
                        rowsPerPageOptions={[10, 20, 50, 100]}
                        onPageSizeChange={setPageSize}
                        autoHeight
                        disableSelectionOnClick
                    />
                )}
            </Collapse>
            <Collapse in={loading}>
                <Stack justifyContent="center" alignItems="center" p={5}>
                    <CircularProgress />
                </Stack>
            </Collapse>
        </Box>
    );
};

export default BrandsList;
