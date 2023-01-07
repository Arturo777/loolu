import React, { useState } from 'react';

// mui imports
import { Button, Divider, Grid, Typography, Box, Collapse } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

// third-party imports
import { FormattedMessage } from 'react-intl';

// components
import MainCard from 'ui-component/cards/MainCard';
import MassiveLoadForm from './MassiveLoadForm';
import MassiLoadResults from './MassiveLoadResults';

// projects imports
import { gridSpacing } from 'store/constant';
import { userSearchParams } from './commons';
import AttachFileButton from 'views/Catalog/MassiveLoad/AttachFileButton';

export default function MassiveLoadPage() {
    // hooks

    // refs

    // consts
    const [params, setParams] = useState<userSearchParams>({ productName: '', idBrand: '', idSKU: '', idCategory: '' });
    const [currentPage, setCurrentPage] = useState(1);
    // const [file, setFile] = useState<string>('');

    const handlePage = (page: number) => setCurrentPage(page);

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">
                            <FormattedMessage id="massive_load" />
                        </Typography>
                    </Grid>
                    <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                        <AttachFileButton />
                    </Grid>
                </Grid>
            }
        >
            <MassiveLoadForm handleSearch={(fields) => setParams(fields)} setCurrentPage={handlePage} />
            <Box sx={{ marginY: 3 }}>
                <Divider />
            </Box>
            <MassiLoadResults searchParams={params} currentPage={currentPage} setCurrentPage={handlePage} />
        </MainCard>
    );
}
