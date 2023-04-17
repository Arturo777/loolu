import { Grid, Box, Drawer } from '@mui/material';
import { ProductListContainer } from '../components/ProductListContainer';
import ProductFilterView from '../components/ProductFilterView';
import { ProductList } from '../List/ProductList';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ProductFilter from '../components/ProductFilter';
import { initialState } from '../utils/initialStateProductsFilter';

// eslint-disable-next-line import/prefer-default-export
const ProductMain = ({
    open,
    filter,
    filterIsEqual,
    handelFilter,
    gridSpacing,
    isLoading,
    productResult,
    matchDownLG,
    appDrawerWidth,
    borderRadius,
    handleDrawerOpen
}: {
    open: any;
    filter: any;
    filterIsEqual: any;
    handelFilter: any;
    gridSpacing: any;
    isLoading: any;
    productResult: any;
    matchDownLG: any;
    appDrawerWidth: any;
    borderRadius: any;
    handleDrawerOpen: any;
}) => (
    <Grid item xs={12}>
        <Box sx={{ display: 'flex' }}>
            <ProductListContainer open={open}>
                <ProductFilterView filter={filter} filterIsEqual={filterIsEqual} handelFilter={handelFilter} initialState={initialState} />

                {/* Lista de productos */}
                <ProductList gridSpacing={gridSpacing} isLoading={isLoading} productResult={productResult} />
            </ProductListContainer>
            <Drawer
                sx={{
                    ml: open ? 3 : 0,
                    height: matchDownLG ? '100vh' : 'auto',
                    flexShrink: 0,
                    zIndex: { xs: 1200, lg: open ? 0 : -1 },
                    overflowX: 'hidden',
                    width: appDrawerWidth,
                    '& .MuiDrawer-paper': {
                        height: 'auto',
                        width: appDrawerWidth,
                        position: matchDownLG ? 'fixed' : 'relative',
                        border: 'none',
                        borderRadius: matchDownLG ? 0 : `${borderRadius}px`
                    }
                }}
                variant={matchDownLG ? 'temporary' : 'persistent'}
                anchor="right"
                open={open}
                ModalProps={{ keepMounted: true }}
                onClose={handleDrawerOpen}
            >
                {open && (
                    <PerfectScrollbar component="div">
                        <ProductFilter filter={filter} handelFilter={handelFilter} />
                    </PerfectScrollbar>
                )}
            </Drawer>
        </Box>
    </Grid>
);

export default ProductMain;
