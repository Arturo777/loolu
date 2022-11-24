import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Box, Stack, Typography, Chip, Button } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';

// third imports
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

// project imports
import { BrandType } from 'types/cataogue';
import { useDispatch, useSelector } from 'store';

// assets
import { gridSpacing } from 'store/constant';
import { getBrands } from 'store/slices/catalogue';
import Loader from 'ui-component/Loader';

type BransListProps = {
    filterText: string;
};

const BransList = ({ filterText }: BransListProps) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [filteredBrands, setFilteredBrands] = useState<BrandType[]>([]);
    const { brands, loading } = useSelector((state) => state.catalogue);

    useEffect(() => {
        console.log(filteredBrands);
    }, [filteredBrands]);

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

    // if (!loading) return <Loader />;

    return (
        <Box sx={{ height: 600, width: '100%' }}>
            {/* <div > */}
            <DataGrid loading={loading} rows={filteredBrands} columns={columns} pageSize={20} rowsPerPageOptions={[10, 20, 50, 100]} />
            {/* </div> */}
        </Box>
    );
};

export default BransList;

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    {
        field: 'name',
        headerName: 'Nombre',
        width: 90
    },
    {
        field: 'title',
        headerName: 'Título',
        width: 90
    },
    {
        field: 'metaTagDescription',
        headerName: 'Descripción',
        width: 90
    },
    {
        field: 'imageUrl',
        headerName: 'Imagen',
        width: 90
    }
];
