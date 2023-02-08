import React, { useEffect, useState } from 'react';

// material-ui
import { Box, Button, CircularProgress, Collapse, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';

// third imports
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

// project imports
import { BrandType } from 'types/catalog';
import { useDispatch, useSelector } from 'store';

// assets
import { getBrands } from 'store/slices/catalog';

type BransListProps = {
    filterText: string;
};

const BrandsList = ({ filterText }: BransListProps) => {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();

    // store
    const { brands, loading } = useSelector((state) => state.catalogue);

    // state
    const [pageSize, setPageSize] = useState<number>(10);
    const [filteredBrands, setFilteredBrands] = useState<BrandType[]>([]);

    useEffect(() => {
        dispatch(getBrands());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (filterText?.length === 0) {
            setFilteredBrands(brands);
        } else {
            const filtered = brands.filter(
                (brand: BrandType) =>
                    JSON.stringify(brand)
                        .toLowerCase()
                        .indexOf(filterText?.toLowerCase() ?? '') > -1
            );

            setFilteredBrands(filtered);
        }
    }, [filterText, brands]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 80 },
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
                <DataGrid
                    loading={loading}
                    rows={filteredBrands}
                    columns={columns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[10, 20, 50, 100]}
                    onPageSizeChange={setPageSize}
                    autoHeight
                    disableSelectionOnClick
                />
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
