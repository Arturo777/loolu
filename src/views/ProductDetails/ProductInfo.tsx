/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Link } from 'react-router-dom';

// material-ui
import { styled } from '@mui/material/styles';
import {
    Box,
    Checkbox,
    Collapse,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputLabel,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { IconSearch } from '@tabler/icons';
// import formatUrl from 'utils/formatUrl';
// third-party

// project imports
import Chip from 'ui-component/extended/Chip';
import { Products, Skus } from 'types/e-commerce';
import { useDispatch } from 'store';

// assets
import { Key, SetStateAction, useEffect, useRef, useState } from 'react';

import ProductDimensions from './ProductDimensions';
import { FormattedMessage, useIntl } from 'react-intl';
import { getCategoriesService } from 'store/slices/catalog';
import ConfigProvider from 'config';
import filterUnitM from 'utils/unitMeasurement';

import { FieldEditingHolder, RowStack } from 'ui-component/MultiMerchant/drawer';
import ObjectModal from './Modals/ObjectModal';

// types
import { InputType, SelectOptionType } from 'ui-component/MultiMerchant/MerchantsForm/InputComponent';
import { BrandType, CategoryType, FlatCategoryType } from 'types/catalog';
import { gridSpacing } from 'store/constant';

// product size
const sizeOptions = [8, 10, 12, 14, 16, 18, 20];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};
const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main)
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main)
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12
        }
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2
    }
}));

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const ProductInfo = ({
    product,
    setValueSku,
    valueSku,
    setActive,
    active,
    productInfo,
    setProductInfo,
    tradePolicies,
    skuInfo,
    setSkuInfo,
    brandsInfo,
    categoriesInfo,
    setFlagBrand,
    flagBrand,
    setNewBrandSku,
    setFlagCategory,
    flagCategory,
    setNewCategorySku,
    allMerchantsProductData,
    saveMultiChange,
    handleDrawer,
    productSkus,
    showMulti = true
}: {
    active: boolean;
    allMerchantsProductData: { [key: string]: any }[];
    brandsInfo: BrandType[] | undefined;
    categoriesInfo: FlatCategoryType[] | undefined;
    flagBrand: boolean;
    flagCategory: boolean;
    product: any;
    productInfo: Products;
    saveMultiChange: (newData: { [key: string]: any }[]) => void;
    setActive: any;
    setFlagBrand: any;
    setFlagCategory: any;
    setNewBrandSku: any;
    setNewCategorySku: any;
    setProductInfo: any;
    setSkuInfo: any;
    setValueSku: any;
    skuInfo: Skus | undefined;
    tradePolicies: any;
    valueSku: any;
    productSkus: Skus[] | null;
    showMulti?: boolean;
    handleDrawer: (options: {
        accessor: string;
        intlLabel: string;
        data?: { [key: string]: any }[];
        options?: null | SelectOptionType[];
        type: InputType;
    }) => void;
}) => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const wrapperRef = useRef(null);

    // const [multiFormProps, setMultiFormProps] = useState<MultiMerchantFormProps>(defaultMerchantProps);

    // info Brands
    const [brandsDisplay, setBrandsDisplay] = useState(false);
    const [brandSearch, setBrandSearch] = useState(product?.brandName);
    const [modalBrands, setModalBrands] = useState(false);

    // info Categories
    const [categoriesDisplay, setCategoriesDisplay] = useState(false);
    const [categorySearch, setCategorySearch] = useState(product?.categoryName ?? String(product?.categoryId) ?? '');
    const [modalCategories, setModalCategories] = useState(false);

    const handleClickOutside = (event: { target: any }) => {
        const { current: wrap }: any = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setBrandsDisplay(false);
            setCategoriesDisplay(false);
        }
    };

    useEffect(() => {
        dispatch(getCategoriesService({ idMerchant: 1 }));
    }, [dispatch]);

    useEffect(() => {
        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        let filterSku: Skus[] = productSkus ? productSkus.filter((itemSku) => Number(itemSku.skuID) === Number(valueSku)) : [];

        filterSku = filterSku.map((itemSku: Skus) => ({ ...itemSku, measurementUnit: filterUnitM(itemSku?.measurementUnit) }));

        if (filterSku.length > 0) {
            const skufFiltUnit: Skus = filterSku[0];

            setSkuInfo(skufFiltUnit);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product?.skus, setSkuInfo, valueSku]);

    const handleRadioChange = (event: { target: { value: any } }) => {
        setValueSku(event.target.value);
    };

    const handleChangeProd = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.type === 'checkbox') {
            setProductInfo((prev: any) => ({ ...prev, [event.target.name]: event.target.checked }));
        } else {
            setProductInfo((prev: any) => ({ ...prev, [event.target.name]: event.target.value }));
        }
    };

    const handleChangeSku = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.type === 'checkbox') {
            setSkuInfo((prev: any) => ({ ...prev, [event.target.name]: event.target.checked }));
        } else {
            setSkuInfo((prev: any) => ({ ...prev, [event.target.name]: event.target.value }));
        }
    };

    const filterTradePolicy = (trade: number) => {
        const resultTrade: any = tradePolicies.TradePolicies.filter((tra: any) => tra.idPolicy === trade);
        return resultTrade[0]?.name;
    };

    const formatterDolar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    const customizeBrand = (value: SetStateAction<string>, id: number) => {
        setBrandSearch(value);
        setProductInfo((prev: any) => ({ ...prev, idBrand: id, brandName: value }));
        setBrandsDisplay(false);
    };

    const customizeCategory = (value: SetStateAction<string>, id: number) => {
        setCategorySearch(value);
        setProductInfo((prev: any) => ({ ...prev, idBrand: id, brandName: value }));
        setCategoriesDisplay(false);
    };

    const newBrand = (value: string) => {
        setBrandSearch(value);
        setFlagBrand(true);
        setNewBrandSku((prev: any) => ({ ...prev, name: value, title: value, isActive: true, metaTagDescription: '', imageUrl: '' }));
        setBrandsDisplay(false);
    };

    const newCategory = (value: string) => {
        setCategorySearch(value);
        setFlagCategory(true);
        setNewCategorySku((prev: any) => ({ ...prev, name: value, title: value, isActive: true, metaTagDescription: '', imageUrl: '' }));
        setCategoriesDisplay(false);
    };

    return (
        <Grid container rowSpacing={gridSpacing}>
            <Grid item xs={12}>
                <Typography variant="h2">{intl.formatMessage({ id: 'product-detail-title' })}</Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Grid container rowSpacing={gridSpacing}>
                        <Grid item xs={12}>
                            {active ? (
                                <>
                                    <FieldEditingHolder
                                        showMulti={showMulti}
                                        onEditClick={() =>
                                            handleDrawer({ accessor: 'isActive', intlLabel: 'active', type: InputType.switch })
                                        }
                                        displayValue="inline-flex"
                                    >
                                        <FormControlLabel
                                            sx={{ ml: 1 }}
                                            checked={productInfo?.isActive}
                                            control={
                                                <Android12Switch
                                                    checked={productInfo?.isActive}
                                                    onChange={handleChangeProd}
                                                    name="isActive"
                                                />
                                            }
                                            label={<FormattedMessage id="active" />}
                                        />
                                    </FieldEditingHolder>
                                    <FieldEditingHolder
                                        showMulti={showMulti}
                                        onEditClick={() =>
                                            handleDrawer({
                                                accessor: 'isEcommerce',
                                                intlLabel: 'e-commerce',
                                                type: InputType.switch
                                            })
                                        }
                                        displayValue="inline-flex"
                                    >
                                        <FormControlLabel
                                            sx={{ ml: 1 }}
                                            checked={productInfo?.isEcommerce}
                                            control={
                                                <Android12Switch
                                                    checked={productInfo?.isEcommerce}
                                                    onChange={handleChangeProd}
                                                    name="isEcommerce"
                                                />
                                            }
                                            label={<FormattedMessage id="e-commerce" />}
                                        />
                                    </FieldEditingHolder>

                                    <FieldEditingHolder
                                        showMulti={showMulti}
                                        onEditClick={() =>
                                            handleDrawer({
                                                accessor: 'showWithoutStock',
                                                intlLabel: 'out_of_stock',
                                                type: InputType.switch
                                            })
                                        }
                                        displayValue="inline-flex"
                                    >
                                        <FormControlLabel
                                            sx={{ ml: 1 }}
                                            checked={productInfo?.showWithoutStock}
                                            control={
                                                <Android12Switch
                                                    checked={productInfo?.showWithoutStock}
                                                    onChange={handleChangeProd}
                                                    name="showWithoutStock"
                                                />
                                            }
                                            label={<FormattedMessage id="out_of_stock" />}
                                        />
                                    </FieldEditingHolder>
                                </>
                            ) : (
                                <>
                                    <Chip
                                        size="small"
                                        label={intl.formatMessage({ id: product?.isActive ? 'active' : 'inactive' })}
                                        chipcolor={product?.isActive ? 'success' : 'error'}
                                        sx={{ ml: 1, borderRadius: '4px', textTransform: 'capitalize' }}
                                    />
                                    <Chip
                                        sx={{ ml: 2 }}
                                        size="small"
                                        label={intl.formatMessage({ id: product?.isVisible ? 'visible' : 'hidden' })}
                                        chipcolor="primary"
                                        variant="outlined"
                                    />
                                    <Chip
                                        sx={{ ml: 2 }}
                                        size="small"
                                        label={product?.isEcommerce ? 'e-commerce' : 'No e-commerce'}
                                        chipcolor="primary"
                                        variant="outlined"
                                    />
                                    <Chip
                                        sx={{ ml: 2 }}
                                        size="small"
                                        label={intl.formatMessage({ id: product?.showWithoutStock ? 'out_of_stock' : 'stock' })}
                                        chipcolor="primary"
                                        variant="outlined"
                                    />
                                </>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction="row" alignItems="center">
                                {active ? (
                                    <Box
                                        sx={{
                                            width: 1,
                                            '& .MuiTextField-root': { mt: 2 }
                                        }}
                                    >
                                        <FieldEditingHolder
                                            showMulti={showMulti}
                                            onEditClick={() =>
                                                handleDrawer({
                                                    accessor: 'productName',
                                                    intlLabel: 'product_name',
                                                    type: InputType.textField
                                                })
                                            }
                                        >
                                            <TextField
                                                fullWidth
                                                id="outlined-basic"
                                                label={intl.formatMessage({ id: 'product_name' })}
                                                variant="outlined"
                                                name="productName"
                                                // defaultValue={product?.productName}
                                                value={productInfo?.productName}
                                                onChange={handleChangeProd}
                                            />
                                        </FieldEditingHolder>
                                        <FieldEditingHolder
                                            showMulti={showMulti}
                                            onEditClick={() =>
                                                handleDrawer({
                                                    accessor: 'title',
                                                    intlLabel: 'title',
                                                    type: InputType.textField
                                                })
                                            }
                                        >
                                            <TextField
                                                fullWidth
                                                id="outlined-basic"
                                                label={intl.formatMessage({ id: 'title' })}
                                                variant="outlined"
                                                name="title"
                                                value={productInfo?.title}
                                                onChange={handleChangeProd}
                                            />
                                        </FieldEditingHolder>
                                        <FieldEditingHolder
                                            showMulti={showMulti}
                                            onEditClick={() =>
                                                handleDrawer({
                                                    accessor: 'linkId',
                                                    intlLabel: 'product_url',
                                                    type: InputType.textField
                                                })
                                            }
                                        >
                                            <TextField
                                                fullWidth
                                                id="outlined-basic"
                                                label={intl.formatMessage({ id: 'product_url' })}
                                                variant="outlined"
                                                name="linkId"
                                                value={productInfo?.linkId}
                                                onChange={handleChangeProd}
                                            />
                                        </FieldEditingHolder>
                                    </Box>
                                ) : (
                                    <Typography variant="h3">{product?.productName}</Typography>
                                )}
                            </Stack>
                        </Grid>
                    </Grid>
                    {/* <Avatar variant="rounded" sx={{ bgcolor: 'grey.200', color: 'grey.800' }}>
                            <FavoriteBorderIcon />
                        </Avatar> */}
                </Stack>
            </Grid>

            <Grid item xs={12}>
                {!active && (
                    <RowStack>
                        <Typography variant="body1">ID: {product?.productID} </Typography>
                        <Typography variant="body2">RefID: {product?.productRefID}</Typography>
                    </RowStack>
                )}
                {active && (
                    <RowStack sx={{ justifyContent: 'space-between' }}>
                        <TextField
                            multiline
                            id="outlined-basic"
                            label={intl.formatMessage({ id: 'product_id' })}
                            variant="outlined"
                            name="productID"
                            // defaultValue={product?.productRefID}
                            value={productInfo?.productID}
                            // onChange={handleChangeProd}
                            disabled
                            sx={{ mt: 1 }}
                        />
                        <FieldEditingHolder
                            showMulti={showMulti}
                            onEditClick={() =>
                                handleDrawer({ accessor: 'productRefID', intlLabel: 'reference_code', type: InputType.textField })
                            }
                        >
                            <TextField
                                multiline
                                id="outlined-basic"
                                label={intl.formatMessage({ id: 'reference_code' })}
                                variant="outlined"
                                name="productRefID"
                                // defaultValue={product?.productRefID}
                                value={productInfo?.productRefID}
                                onChange={handleChangeProd}
                            />
                        </FieldEditingHolder>
                    </RowStack>
                )}
            </Grid>
            {/* <Grid item xs={12}>
                <RowStack>
                    <Typography variant="body1" sx={{ ml: 1 }}>
                        ID: {product?.productID}{' '}
                    </Typography>
                    {active ? (
                        <FieldEditingHolder showMulti={showMulti}
                            onEditClick={() =>
                                handleDrawer({ accessor: 'productRefID', intlLabel: 'reference_code', type: InputType.textarea })
                            }
                        >
                            <TextField
                                multiline
                                id="outlined-basic"
                                label={intl.formatMessage({ id: 'reference_code' })}
                                variant="outlined"
                                name="productRefID"
                                // defaultValue={product?.productRefID}
                                value={productInfo?.productRefID}
                                onChange={handleChangeProd}
                            />
                        </FieldEditingHolder>
                    ) : (
                        <Typography variant="body2">RefID: {product?.productRefID}</Typography>
                    )}
                </RowStack>
            </Grid> */}
            <Grid item xs={12}>
                {active ? (
                    <Box
                        sx={{
                            '& .MuiTextField-root': { mt: 2 }
                        }}
                    >
                        {/* TODO: copiar  */}
                        <FormControl fullWidth ref={wrapperRef} style={{ position: 'relative' }}>
                            <FieldEditingHolder
                                showMulti={showMulti}
                                onEditClick={() =>
                                    handleDrawer({
                                        accessor: 'brandId',
                                        intlLabel: 'brand',
                                        type: InputType.brandSelect
                                    })
                                }
                            >
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label={intl.formatMessage({ id: 'brand' })}
                                    variant="outlined"
                                    name="brandName"
                                    /* defaultValue={product?.brandName} */
                                    value={brandSearch}
                                    onChange={(e) => setBrandSearch(e.target.value)}
                                    onClick={() => setBrandsDisplay(!showMulti)}
                                    InputProps={{
                                        readOnly: showMulti
                                    }}
                                />
                            </FieldEditingHolder>
                            <ObjectModal
                                setModal={setModalBrands}
                                modal={modalBrands}
                                search={brandSearch}
                                setSearch={setBrandSearch}
                                newObject={newBrand}
                                setFlag={setFlagBrand}
                            />
                            {brandsDisplay && (
                                <div className={ConfigProvider.navType === 'dark' ? 'BrandsAutoContainerDark' : 'BrandsAutoContainerWhite'}>
                                    {brandsInfo
                                        ?.filter(({ name }) => name.toLowerCase().indexOf(brandSearch.toLowerCase()) > -1)
                                        .map((v: BrandType, i: Key): any => (
                                            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                                            <Typography
                                                variant="body2"
                                                className="brandsOption"
                                                sx={{ pl: 2, pt: 1, pb: 1 }}
                                                key={i}
                                                onClick={() => customizeBrand(v.name, v.idBrand)}
                                            >
                                                {v.name}
                                            </Typography>
                                        ))}
                                </div>
                            )}
                        </FormControl>
                    </Box>
                ) : (
                    <Typography variant="h4">{product?.brandName}</Typography>
                )}
            </Grid>
            {/* xxx componente que recibirá el merchant seleccionado */}
            <Grid item xs={12} sx={{ ml: 1 }}>
                {active ? (
                    <Box
                        sx={{
                            '& .MuiTextField-root': { mt: 2 }
                        }}
                    >
                        {/* TODO: copiar  */}
                        <FormControl fullWidth ref={wrapperRef} style={{ position: 'relative' }}>
                            <FieldEditingHolder
                                showMulti={showMulti}
                                onEditClick={() =>
                                    handleDrawer({
                                        accessor: 'categoryId',
                                        intlLabel: 'category',
                                        type: InputType.categorySelect
                                    })
                                }
                            >
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label={intl.formatMessage({ id: 'category' })}
                                    variant="outlined"
                                    name="categoryName"
                                    /* defaultValue={product?.brandName} */
                                    value={categorySearch}
                                    onChange={(e) => setCategorySearch(e.target.value)}
                                    onClick={() => setCategoriesDisplay(!showMulti)}
                                    InputProps={{
                                        readOnly: showMulti
                                    }}
                                />
                            </FieldEditingHolder>
                            <ObjectModal
                                setModal={setModalCategories}
                                modal={modalCategories}
                                search={categorySearch}
                                setSearch={setCategorySearch}
                                newObject={newCategory}
                                setFlag={setFlagCategory}
                            />
                            {categoriesDisplay && (
                                <div className={ConfigProvider.navType === 'dark' ? 'BrandsAutoContainerDark' : 'BrandsAutoContainerWhite'}>
                                    {categoriesInfo?.length &&
                                        categoriesInfo
                                            ?.filter(({ name }) => name.toLowerCase().indexOf(categorySearch.toLowerCase()) > -1)
                                            .map((v: FlatCategoryType, i: Key): any => (
                                                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                                                <Typography
                                                    variant="body2"
                                                    className="brandsOption"
                                                    sx={{ pl: 2, pt: 1, pb: 1 }}
                                                    key={i}
                                                    onClick={() => customizeCategory(v.name, v.id)}
                                                >
                                                    {v.name}
                                                </Typography>
                                            ))}
                                </div>
                            )}
                        </FormControl>
                    </Box>
                ) : (
                    <Typography variant="h4">{String(product?.categoryId)}</Typography>
                )}
            </Grid>
            <Grid item xs={12} sx={{ ml: 1 }}>
                {active ? (
                    <Box
                        sx={{
                            '& .MuiTextField-root': { mt: 2 },
                            position: 'relative'
                        }}
                    >
                        {/* TODO cOPIAR */}
                        {/* <Button onClick={toggleDrawer('right', true)} variant="contained">
                            {intl.formatMessage({ id: 'edit_category' })}
                        </Button>
                        <Typography variant="body2">
                            {intl.formatMessage({ id: 'selected_category' })}: {searchCat}
                        </Typography> */}
                        {/* <SwipeableDrawer
                            sx={{ width: '600px', display: 'flex', alignItems: 'flex-start' }}
                            anchor="right"
                            open={stateDrawer.right}
                            onClose={toggleDrawer('right', false)}
                            onOpen={toggleDrawer('right', true)}
                        >
                            <OutlinedInput
                                sx={{ ml: 3, mt: 3, width: '90%' }}
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
                                value={searchCat}
                                onChange={(e) => {
                                    setSearchCat(e.target.value);
                                }}
                            />
                            {Boolean(categories && categories.length) &&
                                categories
                                    ?.filter((item) => item?.name?.toLowerCase().indexOf(searchCat?.toLowerCase()) > -1)
                                    .map((category) => (
                                        <Grid item xs={12} key={`main-category-${category.id}`}>
                                            <MainCategoryComponent
                                                category={category}
                                                setSearchCat={setSearchCat}
                                                setProductInfo={setProductInfo}
                                                setFlagCategory={setFlagCategory}
                                                setNewCategorySku={setNewCategorySku}
                                            />
                                        </Grid>
                                    ))}
                        </SwipeableDrawer> */}
                    </Box>
                ) : (
                    <Typography variant="h4">{product?.categoryName}</Typography>
                )}
            </Grid>
            <Grid item xs={12}>
                {active ? (
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-checkbox-label">{intl.formatMessage({ id: 'trade_policies' })}</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            defaultValue={product?.tradePolicies
                                .filter(({ isSelected }: { isSelected: boolean }) => isSelected)
                                .map(({ tradePolicyName }: { tradePolicyName: string }) => tradePolicyName)}
                            /* value={filterTradePolicy(product.tradePolicies[0].idPolicy)} */
                            onChange={(event) => {
                                setProductInfo(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);
                            }}
                            name="tradePolicy"
                            input={<OutlinedInput label="Trade Policies" />}
                            renderValue={(selected: any) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {product?.tradePolicies?.map(
                                (tr: {
                                    isSelected: boolean | undefined;
                                    idPolicy: Key | null | undefined;
                                    tradePolicyName: string | number | readonly string[] | undefined;
                                }) => (
                                    <MenuItem key={tr.idPolicy} value={tr.tradePolicyName}>
                                        <Checkbox checked={tr.isSelected} />
                                        <ListItemText primary={tr.tradePolicyName} />
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                ) : (
                    <Typography variant="h5" sx={{ ml: 1 }}>
                        {intl.formatMessage({ id: 'trade_policy' })}:
                        {product?.tradePolicies?.map(
                            (trade: {
                                isSelected: boolean | undefined;
                                tradePolicyName: string | number | readonly string[] | undefined;
                                // eslint-disable-next-line consistent-return, array-callback-return
                            }) => {
                                if (trade?.isSelected) return <>{trade?.tradePolicyName}, </>;
                            }
                        )}
                    </Typography>
                )}
            </Grid>
            <Grid item xs={12}>
                <Divider sx={{ mt: 2 }} />
            </Grid>

            {productSkus && productSkus?.length && (
                <Grid item xs={12}>
                    <h2 style={{ marginBottom: '-10px', marginTop: '0px' }}>{intl.formatMessage({ id: 'sku_information' })}:</h2>
                    <Grid container spacing={1}>
                        <Grid item xs={12} lg={10}>
                            <Table>
                                <TableBody sx={{ '& .MuiTableCell-root': { borderBottom: 'none' } }}>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {intl.formatMessage({ id: 'variants' })}
                                                <Typography color="error" component="span">
                                                    *
                                                </Typography>
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <RadioGroup
                                                row
                                                value={valueSku}
                                                onChange={handleRadioChange}
                                                name={intl.formatMessage({ id: 'sku' })}
                                                id="sku"
                                                sx={{ ml: 1 }}
                                                // defaultValue={productSkus?.length ? productSkus[0].skuID : ''}
                                            >
                                                {productSkus &&
                                                    productSkus?.map((sku: Skus, index: Key | null | undefined) => (
                                                        <FormControlLabel
                                                            key={`product-sku-radio-${sku.skuID}`}
                                                            value={sku?.skuID}
                                                            control={<Radio />}
                                                            label={sku?.skuID}
                                                            disabled={active}
                                                        />
                                                    ))}
                                            </RadioGroup>
                                            {/* {errors.color && (
                                                    <FormHelperText error id="standard-label-color">
                                                        {errors.color}
                                                    </FormHelperText>
                                                )} */}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Grid item xs={12}>
                                {active ? (
                                    <Box
                                        sx={{
                                            '& .MuiTextField-root': { mt: 2 }
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            multiline
                                            id="outlined-basic"
                                            label={intl.formatMessage({ id: 'sku_name' })}
                                            variant="outlined"
                                            name="name"
                                            // defaultValue={skuInfo?.name}
                                            value={skuInfo?.name}
                                            onChange={handleChangeSku}
                                        />
                                    </Box>
                                ) : (
                                    skuInfo !== undefined && (
                                        <Typography variant="h3" sx={{ ml: 2 }}>
                                            {skuInfo?.name}
                                        </Typography>
                                    )
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                {active ? (
                                    <Box
                                        sx={{
                                            '& .MuiTextField-root': { mt: 2 }
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            multiline
                                            id="outlined-basic"
                                            label="EAN/UPC"
                                            variant="outlined"
                                            name="ean"
                                            // defaultValue={skuInfo?.ean}
                                            value={skuInfo?.ean}
                                            onChange={handleChangeSku}
                                        />
                                    </Box>
                                ) : (
                                    skuInfo !== undefined && (
                                        <Typography variant="body2" sx={{ ml: 2 }}>
                                            EAN/UPC: {skuInfo?.ean}
                                        </Typography>
                                    )
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <Table>
                                    <TableBody sx={{ '& .MuiTableCell-root': { borderBottom: 'none' } }}>
                                        <TableRow>
                                            <TableCell>
                                                <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
                                                    {intl.formatMessage({ id: 'pricing' })}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                {skuInfo?.prices?.map(
                                                    ({
                                                        price,
                                                        priceDiscount,
                                                        tradePolicy
                                                    }: {
                                                        // eslint-disable-next-line react/no-unused-prop-types
                                                        price: number;
                                                        // eslint-disable-next-line react/no-unused-prop-types
                                                        priceDiscount: number;
                                                        // eslint-disable-next-line react/no-unused-prop-types
                                                        tradePolicy: number;
                                                    }) => (
                                                        <Stack direction="row" alignItems="center" spacing={1} sx={{ ml: 1 }}>
                                                            {active ? (
                                                                <>
                                                                    <Box
                                                                        sx={{
                                                                            '& .MuiTextField-root': { mt: 2 }
                                                                        }}
                                                                    >
                                                                        <TextField
                                                                            fullWidth
                                                                            multiline
                                                                            id="outlined-basic"
                                                                            label={intl.formatMessage({ id: 'discount_price' })}
                                                                            variant="outlined"
                                                                            name="priceDiscount"
                                                                            defaultValue={priceDiscount}
                                                                        />
                                                                    </Box>
                                                                    <Box
                                                                        sx={{
                                                                            '& .MuiTextField-root': { mt: 2 }
                                                                        }}
                                                                    >
                                                                        <TextField
                                                                            fullWidth
                                                                            multiline
                                                                            id="outlined-basic"
                                                                            label={intl.formatMessage({ id: 'price' })}
                                                                            variant="outlined"
                                                                            name="price"
                                                                            defaultValue={price}
                                                                        />
                                                                    </Box>
                                                                    <Typography variant="caption">
                                                                        {filterTradePolicy(tradePolicy)}
                                                                    </Typography>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Typography variant="h2" color="primary">
                                                                        {formatterDolar.format(priceDiscount)}
                                                                    </Typography>
                                                                    <Typography variant="body1" sx={{ textDecoration: 'line-through' }}>
                                                                        {formatterDolar.format(price)}
                                                                    </Typography>
                                                                    <Typography variant="caption">
                                                                        {filterTradePolicy(tradePolicy)}
                                                                    </Typography>
                                                                </>
                                                            )}
                                                        </Stack>
                                                    )
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Grid>
                            <Table>
                                <TableBody sx={{ '& .MuiTableCell-root': { borderBottom: 'none' } }}>
                                    <TableRow>
                                        <TableCell>
                                            <Stack>
                                                <Typography variant="body2">
                                                    {intl.formatMessage({ id: 'size' })}
                                                    <Typography color="error" component="span">
                                                        *
                                                    </Typography>
                                                </Typography>
                                                <Typography variant="caption" color="primary" component={Link} to="#">
                                                    {intl.formatMessage({ id: 'size_chart' })}?
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="left">
                                            <FormControl sx={{ minWidth: 120 }}>
                                                <Select
                                                    id="size"
                                                    name="size"
                                                    /* value={values.size}
                                                    onChange={handleChange} */
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {sizeOptions.map((option, index) => (
                                                        <MenuItem sx={{ p: 1.25 }} key={index} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            {/* {errors.size && (
                                                    <FormHelperText error id="standard-label-size">
                                                        {errors.size}
                                                    </FormHelperText>
                                                )} */}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="body2">{intl.formatMessage({ id: 'dimensions' })}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <ProductDimensions skuFilter={skuInfo} setSkuInfo={setSkuInfo} active={active} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="body2">{intl.formatMessage({ id: 'quantity' })}</Typography>
                                        </TableCell>
                                        <TableCell align="left" />
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

export default ProductInfo;
type MainCategoryProps = {
    category: CategoryType;
    setSearchCat: any;
    setProductInfo: any;
    setFlagCategory: any;
    setNewCategorySku: any;
    /* openCreate: (catId: number) => void; */
};
const MainCategoryComponent = ({ category, setSearchCat, setProductInfo, setFlagCategory, setNewCategorySku }: MainCategoryProps) => {
    // hooks
    const intl = useIntl();

    // vars
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };
    const customCategory = (value: string, id: number) => {
        setSearchCat(value);
        setProductInfo((prev: any) => ({ ...prev, categoryId: id, categoryName: value, departmentId: id }));
    };

    return (
        <>
            <ListItemButton sx={{ paddingY: 0, width: '600px' }}>
                <ListItemIcon sx={{ p: 1 }} onClick={handleOpen}>
                    {category.children?.length ? <ExpandCircleDownIcon /> : null}
                </ListItemIcon>
                <ListItemText sx={{ p: 1 }} onClick={handleOpen} primary={category.name} secondary={category.title} />
                <Tooltip title={intl.formatMessage({ id: 'select_category' })}>
                    <IconButton>
                        <CheckCircleIcon onClick={() => customCategory(category.name, category.id)} />
                    </IconButton>
                </Tooltip>
                {/* CREATE */}
                <Tooltip title={intl.formatMessage({ id: 'create_subcategory' })}>
                    <IconButton>
                        <AddBoxIcon />
                    </IconButton>
                </Tooltip>
            </ListItemButton>

            {Boolean(category.children?.length) && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {category.children.map((itemA) => (
                        <Box key={`category-child-${itemA.id}`} sx={{ ml: 1 }}>
                            <MainCategoryComponent
                                category={itemA}
                                setSearchCat={setSearchCat}
                                /* openCreate={openCreate} */ setProductInfo={setProductInfo}
                                setFlagCategory={setFlagCategory}
                                setNewCategorySku={setNewCategorySku}
                            />
                        </Box>
                    ))}
                </Collapse>
            )}
        </>
    );
};
