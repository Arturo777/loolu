import React, { useEffect, useState } from 'react';

// mui imports
import { ListItemButton, ListItemIcon, ListItemText, Collapse, Box, Grid, IconButton, Card, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MergeTypeIcon from '@mui/icons-material/MergeType';

// third party imports
import { useIntl } from 'react-intl';

// project imports
import { getCategoriesService } from 'store/slices/catalog';
import { useDispatch, useSelector } from 'store';

// types
import { CategoryType } from 'types/catalog';
import { gridSpacing } from 'store/constant';

type CategoriesListProps = {
    filterText: string;
    openCreate: (catId: number) => void;
    handleShowInfo: (cat?: number) => void;
    openAssociate: (cat: CategoryType | undefined) => void;
};

export default function CategoriesListComponent({ filterText, openCreate, handleShowInfo, openAssociate }: CategoriesListProps) {
    // hooks
    const dispatch = useDispatch();
    // store
    const { categories } = useSelector((state) => state.catalogue);
    // vars
    const [filteredCategories, setFilteredCategories] = useState<CategoryType[]>();

    useEffect(() => {
        dispatch(getCategoriesService({ idMerchant: 1 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setFilteredCategories(categories);
    }, [categories]);

    useEffect(() => {
        const filtered =
            filterText.length >= 2
                ? categories.filter(
                      (item) =>
                          JSON.stringify(item)
                              .toLowerCase()
                              .indexOf(filterText?.toLowerCase() ?? '') > -1
                  )
                : categories;

        setFilteredCategories(filtered);
    }, [filterText, categories]);

    return (
        <Card sx={{ boxShadow: 2 }}>
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
            </Grid>{' '}
        </Card>
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
                    {category.children?.length ? <ExpandCircleDownIcon /> : null}
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
