import React, { useState } from 'react';

// material-ui
import { Button, Fade, Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';
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
import CreateFacetComponent from '../Create';
import EditFacetComponent from '../Edit';

// ==============================|| FACETS LIST ||============================== //

const FacetsMainPage = () => {
    // hooks
    const intl = useIntl();

    // variables
    const [rightSide, setRightSide] = useState<'CREATE' | 'EDIT' | null>(null);
    const [selectedFacetId, setSelectedFacetId] = useState<number | null>(null);

    // pagination and search
    const [filterText, setFilterText] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
        const newString = event?.target.value;
        setFilterText(newString ?? '');
        setCurrentPage(1);
    };

    const handleClickEdit = (id: number) => {
        setSelectedFacetId(id);
        handleToggle('EDIT');
    };

    const handleToggle = (newVal: 'CREATE' | 'EDIT') => {
        setRightSide(null);

        if (newVal) {
            setTimeout(() => {
                setRightSide(newVal);
            }, 100);
        }
    };

    return (
        <MainCard
            sx={{
                overflow: 'initial'
            }}
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">FACETS</Typography>
                    </Grid>
                    <Grid item>
                        <Fade in={rightSide !== 'CREATE'}>
                            <Button
                                onClick={() => {
                                    handleToggle('CREATE');
                                }}
                                variant="contained"
                                startIcon={<AddIcon />}
                                sx={{ mr: 3 }}
                            >
                                {intl.formatMessage({
                                    id: 'create_facet'
                                })}
                            </Button>
                        </Fade>

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
                    {rightSide === 'EDIT' && (
                        <EditFacetComponent
                            show={rightSide === 'EDIT'}
                            handleCancel={() => {
                                setRightSide(null);
                            }}
                            facetId={selectedFacetId}
                        />
                    )}
                    {rightSide === 'CREATE' && (
                        <CreateFacetComponent
                            show={rightSide === 'CREATE'}
                            handleCancel={() => {
                                setRightSide(null);
                            }}
                        />
                    )}
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default FacetsMainPage;
