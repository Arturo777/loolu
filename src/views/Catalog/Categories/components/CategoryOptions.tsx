import { Typography, Box } from '@mui/material';
import React from 'react';
import { FilterCategoryType } from 'types/catalog';

const CategoryOptions = ({ flatCat, customCategory }: { flatCat: FilterCategoryType; customCategory: () => void }) => {
    if (flatCat.grandFatherName && flatCat.fatherName) {
        return (
            <Box onClick={customCategory}>
                <Typography variant="body2">{`${flatCat.name} (Padre) > ${flatCat.fatherName} > ${flatCat.name}`}</Typography>
            </Box>
        );
    }
    if (flatCat.fatherName) {
        return (
            <Box onClick={customCategory}>
                <Typography variant="body2"> {`${flatCat.fatherName} (Padre) > ${flatCat.name}`} </Typography>
            </Box>
        );
    }
    return (
        <Box onClick={customCategory}>
            <Typography variant="body2">{`${flatCat.name} (Padre)`}</Typography>
        </Box>
    );
};
export default CategoryOptions;
