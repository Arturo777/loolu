import React, { useState, useEffect, useRef } from 'react';

// material-ui
import { Button, Collapse, Fade, Grid, InputAdornment, OutlinedInput, Typography, useMediaQuery, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// third-party
import { useIntl } from 'react-intl';

// assets
import { IconSearch } from '@tabler/icons';
import { useSearchParams } from 'react-router-dom';
import CategoriesListComponent from '../List';
import CreateCategoryPage from '../Create';
import EditCategoryComponent from '../Edit';
import AsociateFacetCategoryComponent from '../AsociateFacetCategory';
import { CategoryType } from 'types/catalog';

// ==============================|| FACETS LIST ||============================== //

const CategoriesListPage = () => {
    // hooks
    const theme = useTheme();
    const upMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    // ===== vars
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterText, setFilterText] = useState<string>('');
    const mainCardRef = useRef<null | HTMLDivElement>(null);
    // associate
    const [openAssociateDrawer, setOpenAssociateDrawer] = useState<boolean>(false);
    const [categoryAssociate, setCategoryAssociate] = useState<CategoryType | null>(null);

    // create
    const [openCreate, setOpenCreate] = useState<boolean>(false); // show or hide create form
    const [selectedCatId, setSelectedCatId] = useState<number>(); // short cut to select in create form

    // show info -- edit
    const [selectedCategory, setSelectedCategory] = useState<number>(); // id to show info (right side)
    const [showInfo, setShowInfo] = useState<boolean>(false); // show or hide info (right side)

    // set route params
    useEffect(() => {
        const newSearchParam = `&search=${filterText}`;
        setSearchParams(newSearchParam);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterText]);

    // get route params
    useEffect(() => {
        const search = searchParams.get('search');
        setFilterText(search ?? '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreateForm = () => {
        setOpenCreate((prev) => !prev);
    };

    const openCreateFormById = (catId?: number) => {
        if (upMediumScreen && mainCardRef && mainCardRef.current) {
            mainCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // open form from categories list
        setSelectedCatId(catId);
        setOpenCreate(true);
    };

    // close edit
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
        const newString = event?.target.value;
        setFilterText(newString ?? '');
    };

    const handleShowInfo = (cat?: number) => {
        setShowInfo(false);
        if (cat) {
            if (upMediumScreen) {
                console.log('UP');
            }
            setTimeout(() => {
                setSelectedCategory(cat);
                setShowInfo(true);
            }, 100);
        }
    };

    const handleCancelEdit = () => {
        setSelectedCategory(undefined);
        setShowInfo(false);
    };

    const handleToggleAssociateDrawer = (category: CategoryType | undefined) => {
        if (category) {
            setOpenAssociateDrawer(true);
            setCategoryAssociate(category);
        } else {
            setCategoryAssociate(null);
        }
    };

    return (
        <MainCard
            ref={mainCardRef}
            title={
                // TOP - Create form and header
                <CustomPageHeader
                    handleSearch={handleSearch}
                    filterText={filterText}
                    openCreate={openCreate}
                    toggleForm={handleCreateForm}
                    selectedCatId={selectedCatId}
                />
            }
            content={false}
            sx={{ overflow: 'initial' }}
        >
            <Grid container spacing={gridSpacing} p={2}>
                {/* LIST  */}
                <Grid item xs={12} sm={8} md={4}>
                    <CategoriesListComponent
                        openAssociate={handleToggleAssociateDrawer}
                        filterText={filterText}
                        openCreate={openCreateFormById}
                        handleShowInfo={handleShowInfo}
                    />
                </Grid>
                {/* INFO  */}
                <Grid item xs={12} sm={4} md={8}>
                    <EditCategoryComponent
                        openAssociate={handleToggleAssociateDrawer}
                        selectedCategory={selectedCategory}
                        show={showInfo}
                        onCancel={handleCancelEdit}
                    />
                </Grid>
            </Grid>
            <AsociateFacetCategoryComponent
                open={openAssociateDrawer}
                toggleDrawer={() => {
                    setOpenAssociateDrawer((prev) => !prev);
                    setCategoryAssociate(null);
                }}
                category={categoryAssociate}
            />
        </MainCard>
    );
};

export default CategoriesListPage;

type CustomPageHeaderProps = {
    handleSearch: (e: any) => void;
    filterText: string;
    toggleForm: () => void;
    openCreate: boolean;
    selectedCatId?: number;
};

// Create form and header

const CustomPageHeader = ({ handleSearch, filterText, toggleForm, openCreate, selectedCatId }: CustomPageHeaderProps) => {
    // hooks
    const intl = useIntl();

    return (
        <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
                <Typography variant="h3">
                    {intl.formatMessage({
                        id: 'categories'
                    })}
                </Typography>
            </Grid>
            <Grid item>
                <Fade in={!openCreate}>
                    <Button onClick={toggleForm} variant="contained" startIcon={<AddIcon />} sx={{ mr: 3 }}>
                        {intl.formatMessage({
                            id: 'create_category'
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

            <Grid item xs={12} sx={{ p: 0, mt: 3 }}>
                <Collapse in={openCreate} collapsedSize={0}>
                    <CreateCategoryPage handleClose={toggleForm} selectedCatId={selectedCatId} />
                </Collapse>
            </Grid>
        </Grid>
    );
};
