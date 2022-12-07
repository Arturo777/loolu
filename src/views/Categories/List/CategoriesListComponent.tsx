import React, { useMemo } from 'react';

import { ListItemButton, ListItemIcon, ListItemText, Collapse, Box, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { CategoryType } from 'types/catalogue';
import { Link } from 'react-router-dom';
import { gridSpacing } from 'store/constant';

type CategoriesListProps = {
    categories?: CategoryType[];
};

export default function CategoriesListComponent({ categories }: CategoriesListProps) {
    const renderColumns = useMemo(() => {
        const left: any[] = [];
        const right: any[] = [];

        if (categories) {
            categories.forEach((category, index) => {
                if (index % 2) {
                    right.push(<MainCategoryComponent key={`main-category-${category.id}`} category={category} />);
                } else {
                    left.push(<MainCategoryComponent key={`main-category-${category.id}`} category={category} />);
                }
            });
        }

        return (
            <>
                <Grid item xs={6}>
                    {left}
                </Grid>
                <Grid item xs={6}>
                    {right}
                </Grid>
            </>
        );
    }, [categories]);

    return (
        <Grid container spacing={gridSpacing}>
            {renderColumns}
        </Grid>
    );
}

type MainCategoryProps = {
    category: CategoryType;
};

const MainCategoryComponent = ({ category }: MainCategoryProps) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <ListItemButton>
                <ListItemIcon onClick={handleClick}>{category.hasChildren ? <AddBoxIcon /> : null}</ListItemIcon>
                <ListItemText primary={category.name} secondary={category.title} />
                <IconButton component={Link} to={`${category.id}/edit`}>
                    <EditIcon />
                </IconButton>
                {category.hasChildren ? <IconButton onClick={handleClick}>{open ? <ExpandLess /> : <ExpandMore />}</IconButton> : null}
            </ListItemButton>

            {category.hasChildren && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {category.children.map((itemA) => (
                        <Box key={`category-child-${itemA.id}`} sx={{ ml: 4 }}>
                            <MainCategoryComponent category={itemA} />
                        </Box>
                    ))}
                </Collapse>
            )}
        </>
    );
};
