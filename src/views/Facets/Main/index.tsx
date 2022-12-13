import React, { useState } from 'react';

// material-ui
import { Button, Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// third-party
import { useIntl } from 'react-intl';

// assets
import { IconSearch } from '@tabler/icons';

// import FacetsListComponent from '.';
import FacetsListComponent from '../List';

// ==============================|| FACETS LIST ||============================== //

const FacetsMainPage = () => {
    // hooks
    const intl = useIntl();

    // variables
    const [rightSide, setRightSide] = useState<'CREATE' | 'EDIT'>();

    // pagination and search
    const [filterText, setFilterText] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
        const newString = event?.target.value;
        setFilterText(newString ?? '');
        setCurrentPage(1);
    };

    const handleClickEdit = (id: number) => {
        console.log('Id');
        setRightSide('EDIT');
    };

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">FACETS</Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={() => {
                                setRightSide('CREATE');
                            }}
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{ mr: 3 }}
                        >
                            {intl.formatMessage({
                                id: 'create_facet'
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
            <Grid container spacing={gridSpacing} p={2}>
                <Grid item xs={12} sm={8} md={4}>
                    <FacetsListComponent
                        handleEdit={handleClickEdit}
                        filterText={filterText}
                        setFilterText={setFilterText}
                        handleSearch={handleSearch}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={8}>
                    {rightSide === 'EDIT' && <Typography>EDITAR</Typography>}
                    {rightSide === 'CREATE' && <Typography>CREATE</Typography>}
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default FacetsMainPage;
