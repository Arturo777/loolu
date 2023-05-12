import { Grid } from '@mui/material';
import SkeletonProductPlaceholder from 'ui-component/cards/Skeleton/ProductPlaceholder';

// eslint-disable-next-line import/prefer-default-export
export const ProductList = ({ gridSpacing, isLoading, productResult }: { gridSpacing: any; isLoading: any; productResult: any }) => (
    <Grid container spacing={gridSpacing}>
        {isLoading
            ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <Grid key={item} item xs={12} sm={6} md={4} lg={3}>
                      <SkeletonProductPlaceholder />
                  </Grid>
              ))
            : productResult}
    </Grid>
);
