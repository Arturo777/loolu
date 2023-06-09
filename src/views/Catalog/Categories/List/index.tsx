import React, { useEffect, useState } from 'react';

// mui imports
import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Box,
    Grid,
    IconButton,
    Card,
    Tooltip,
    List,
    Stack,
    CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MergeTypeIcon from '@mui/icons-material/MergeType';

// third party imports
import { useIntl } from 'react-intl';

// project imports
import { getMerchantCategoriesService } from 'store/slices/catalog';
import { useDispatch, useSelector } from 'store';

// types
import { CategoriesListProps, CategoryType } from 'types/catalog';
import { gridSpacing } from 'store/constant';

export default function CategoriesListComponent({
    filterText,
    openCreate,
    handleShowInfo,
    openAssociate,
    selectedMerchant
}: CategoriesListProps) {
    // hooks
    const dispatch = useDispatch();
    // store
    const { merchantCategories, loading, filterMerchantCategories } = useSelector((state) => state.catalogue);
    // vars
    const [filteredCategories, setFilteredCategories] = useState<CategoryType[]>([]);
    const [categories, setCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
        dispatch(getMerchantCategoriesService({ idMerchant: 1 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!merchantCategories?.length || !selectedMerchant) return;

        const merchant = merchantCategories.find((cat: any) => cat.idMerchant === selectedMerchant.merchantId);
        setCategories(merchant?.categoryList || []);
        setFilteredCategories(merchant?.categoryList || []);
    }, [merchantCategories, selectedMerchant]);

    useEffect(() => {
        if (!filterText) {
            setFilteredCategories(categories);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps

        const filtered = filterMerchantCategories(categories, filterText);
        setFilteredCategories(filtered);
    }, [filterText, categories, filterMerchantCategories]);

    return (
        <>
            <Collapse in={loading}>
                <Stack justifyContent="center" alignItems="center" sx={{ pt: 5, mb: 5 }}>
                    <CircularProgress />
                </Stack>
            </Collapse>
            <Collapse in={!loading}>
                <List component={Card} elevation={2}>
                    <Grid container spacing={gridSpacing}>
                        {filteredCategories?.map((category) => (
                            <Grid item xs={12} key={`main-category-${category.id}`}>
                                <MainCategoryComponent
                                    category={category}
                                    openCreate={openCreate}
                                    handleShowInfo={handleShowInfo}
                                    openAssociate={() => openAssociate(category)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </List>
            </Collapse>
        </>
    );
}

type MainCategoryProps = {
    category: CategoryType;
    openCreate: (catId: number) => void;
    handleShowInfo: (cat?: number) => void;
    openAssociate: () => void;
};

const MainCategoryComponent = ({ category, openCreate, handleShowInfo, openAssociate }: MainCategoryProps) => {
    // hooks
    const intl = useIntl();

    // vars
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };
    return (
        <>
            <ListItemButton sx={{ paddingY: 0 }}>
                <ListItemIcon sx={{ p: 1 }} onClick={handleOpen}>
                    {category.children?.length ? (
                        <ExpandCircleDownIcon
                            sx={{ transition: 'transform 350ms ease', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}
                        />
                    ) : null}
                </ListItemIcon>
                <ListItemText sx={{ p: 1 }} onClick={handleOpen} primary={category.name} secondary={category.title} />
                {/* FACET - CATEGORY */}
                <Tooltip title={intl.formatMessage({ id: 'associate_facet_category' })}>
                    <IconButton onClick={openAssociate}>
                        <MergeTypeIcon />
                    </IconButton>
                </Tooltip>
                {/* EDIT */}
                <Tooltip title={intl.formatMessage({ id: 'edit' })}>
                    <IconButton
                        onClick={() => {
                            handleShowInfo(category.id);
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                {/* CREATE */}
                <Tooltip title="Crear subcategoria">
                    <IconButton
                        onClick={() => {
                            openCreate(category.id);
                        }}
                    >
                        <AddBoxIcon />
                    </IconButton>
                </Tooltip>
            </ListItemButton>

            {Boolean(category.children?.length) && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {category.children.map((itemA) => (
                        <Box key={`category-child-${itemA.id}`} sx={{ ml: 2 }}>
                            <MainCategoryComponent
                                category={itemA}
                                openCreate={openCreate}
                                handleShowInfo={handleShowInfo}
                                openAssociate={openAssociate}
                            />
                        </Box>
                    ))}
                </Collapse>
            )}
        </>
    );
};
