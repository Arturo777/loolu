import React, { useEffect, useState } from 'react';

import { ListItemButton, ListItemIcon, ListItemText, Collapse, Box, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { CategoryType } from 'types/catalogue';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { getCategoriesService } from 'store/slices/catalogue';

type CategoriesListProps = {
    filterText: string;
    openCreate: (catId: number) => void;
    handleShowInfo: (cat?: number) => void;
};

export default function CategoriesListComponent({ filterText, openCreate, handleShowInfo }: CategoriesListProps) {
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
        <Grid container spacing={gridSpacing}>
            {filteredCategories?.map((category) => (
                <Grid item xs={12} key={`main-category-${category.id}`}>
                    <MainCategoryComponent category={category} openCreate={openCreate} handleShowInfo={handleShowInfo} />
                </Grid>
            ))}
        </Grid>
    );
}

type MainCategoryProps = {
    category: CategoryType;
    openCreate: (catId: number) => void;
    handleShowInfo: (cat?: number) => void;
};

const MainCategoryComponent = ({ category, openCreate, handleShowInfo }: MainCategoryProps) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };
    return (
        <>
            <ListItemButton sx={{ paddingY: 0 }}>
                <ListItemIcon sx={{ p: 1 }} onClick={handleOpen}>
                    {category.hasChildren ? <ExpandCircleDownIcon /> : null}
                </ListItemIcon>
                <ListItemText sx={{ p: 1 }} onClick={handleOpen} primary={category.name} secondary={category.title} />
                {/* EDIT */}
                <IconButton
                    onClick={() => {
                        handleShowInfo(category.id);
                    }}
                >
                    <EditIcon />
                </IconButton>
                {/* CREATE */}
                <IconButton
                    onClick={() => {
                        openCreate(category.id);
                    }}
                >
                    <AddBoxIcon />
                </IconButton>
            </ListItemButton>

            {category.hasChildren && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {category.children.map((itemA) => (
                        <Box key={`category-child-${itemA.id}`} sx={{ ml: 4 }}>
                            <MainCategoryComponent category={itemA} openCreate={openCreate} handleShowInfo={handleShowInfo} />
                        </Box>
                    ))}
                </Collapse>
            )}
        </>
    );
};
