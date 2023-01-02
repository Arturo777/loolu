import { Typography } from '@mui/material';
import React from 'react';
import { FilterCategoryType } from 'types/catalogue';

const CategoryOptions = ({ flatCat }: { flatCat: FilterCategoryType }) => {
    if (flatCat.grandFatherName && flatCat.fatherName) {
        return <Typography>{`${flatCat.grandFatherName} (Padre) > ${flatCat.fatherName} > ${flatCat.name}`}</Typography>;
    }
    if (flatCat.fatherName) {
        return <Typography> {`${flatCat.fatherName} (Padre) > ${flatCat.name}`} </Typography>;
    }
    return <Typography variant="body2" className="categoryOption" sx={{ pl: 2, pt: 1, pb: 1 }}>{`${flatCat.name} (Padre)`}</Typography>;
};
export default CategoryOptions;
