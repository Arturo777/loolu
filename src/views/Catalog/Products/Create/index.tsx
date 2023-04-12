import { useEffect, useState, SyntheticEvent } from 'react';
import { Link, useParams } from 'react-router-dom';

// material-ui
import { Box, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';

// project imports
/* import ProductDescription from './ProductDescription';
import ProductReview from './ProductReview';
import RelatedProducts from './RelatedProducts'; */
import MainCard from 'ui-component/cards/MainCard';
import Chip from 'ui-component/extended/Chip';
import MultiMerchant from 'ui-component/MultiMerchantButton';
import { DefaultRootStateProps, TabsProps } from 'types';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { getProduct } from 'store/slices/product';
import { resetCart } from 'store/slices/cart';
import ProductImagesCreate from './ProductImagesCreate';
import ProductInfoCreate from './ProductInfoCreate';
import ProductDescriptionCreate from './ProductDescriptionCreate';
import { Products } from 'types/e-commerce';
import Image from './image/Image';
import ProductWerehouses from './ProductWerehouses';

function TabPanel({ children, value, index, ...other }: TabsProps) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`product-details-tabpanel-${index}`}
            aria-labelledby={`product-details-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `product-details-tab-${index}`,
        'aria-controls': `product-details-tabpanel-${index}`
    };
}

const CreateProduct = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    // images
    const [imagesToUpload, setImagesToUpload] = useState<any>([]);

    // product description tabs
    const [merchs, setMerchs] = useState<any>([{}]);
    const [value, setValue] = useState(0);
    const [productInfo, setProductInfo] = useState<Products>({
        image: '',
        id: '',
        created: new Date(),
        productID: '',
        departmentId: 0,
        categoryId: 0,
        productGlobalCategoryID: null,
        nameComplete: '',
        merchantId: 0,
        releaseDate: '',
        lastDateUpdate: new Date(),
        brandId: '',
        productStatus: false,
        syncStatusVTEX: false,
        skuName: '',
        cscIdentification: null,
        informationSource: null,
        kit: false,
        transported: false,
        inventoried: false,
        giftCardRecharge: false,
        productName: '',
        title: '',
        linkId: '',
        productRefID: '',
        taxCode: '',
        name: '',
        tradePolicies: [
            {
                idPolicy: 0,
                name: '',
                isSelected: false,
                __typename: ''
            }
        ],
        provider: '',
        categoryName: '',
        brandName: '',
        descriptionShort: '',
        description: '',
        metaTagDescription: '',
        keyWords: '',
        isEcommerce: true,
        isActive: false,
        isVisible: true,
        showWithoutStock: true,
        preventa: {
            Isactive: false
        },
        sobrePedido: {
            Isactive: false
        },
        groupName: ''
    });

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // images

    const handleAddImages = (event: any) => {
        const newUploadImages = [...imagesToUpload, ...event.target.files];
        setImagesToUpload(newUploadImages);
    };

    const handleRemoveImages = (ids: any) => {
        const newUploadImages = imagesToUpload.filter((_: any, index: any) => index !== ids);
        setImagesToUpload(newUploadImages);
    };

    useEffect(() => {
        // getProduct();
        /* dispatch(getProduct(id)); */
        // clear cart if complete order
    }, []);

    /* const { product } = useSelector((state) => state.product); */

    return (
        <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
            <Grid item xs={12} lg={10}>
                <MultiMerchant
                    // justOne
                    // readOnly
                    onChange={(merchants) => setMerchs(merchants)}
                    maxShow={4}
                    defaultSelected={[]}
                />
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={6}>
                            <div className="column is-full">
                                {/* <p className="is-size-5 has-text-info has-text-weight-bold my-5">IMÁGENES</p> */}
                                <Image uploadedImages={imagesToUpload} removeImages={handleRemoveImages} uploadImages={handleAddImages} />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ProductInfoCreate setProductInfo={setProductInfo} productInfo={productInfo} merchs={merchs} />
                        </Grid>
                        <Grid item xs={12}>
                            <Tabs
                                value={value}
                                indicatorColor="primary"
                                onChange={handleChange}
                                sx={{}}
                                aria-label="product description tabs example"
                                variant="scrollable"
                            >
                                <Tab component={Link} to="#" label="Product Aditional Info" {...a11yProps(0)} />
                                <Tab
                                    component={Link}
                                    to="#"
                                    label={
                                        <Stack direction="row" alignItems="center">
                                            Werehouses
                                        </Stack>
                                    }
                                    {...a11yProps(1)}
                                />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                <ProductDescriptionCreate
                                    setProductInfo={setProductInfo}
                                    merchantMulti={merchs}
                                    productInfo={productInfo}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Grid container justifyContent="space-between">
                                    {merchs.map((item: any) => (
                                        <Grid item xs={12 / merchs.length - 0.1}>
                                            <ProductWerehouses merchs={item.merchantId} namemerch={item.name} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </TabPanel>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            <Grid item xs={12} lg={10} sx={{ mt: 3 }}>
                <Typography variant="h2">Related Products</Typography>
            </Grid>
            <Grid item xs={11} lg={10}>
                {/* <RelatedProducts id={id} /> */}
            </Grid>
        </Grid>
    );
};

export default CreateProduct;
