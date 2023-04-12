import { JSXElementConstructor, Key, ReactElement, SetStateAction, useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Box,
    Button,
    ButtonBase,
    ButtonGroup,
    Checkbox,
    Collapse,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Modal,
    OutlinedInput,
    Radio,
    RadioGroup,
    Rating,
    Select,
    Stack,
    SwipeableDrawer,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    TextFieldProps,
    Tooltip,
    Typography
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// third-party
import { useFormik, Form, FormikProvider, useField, FieldHookConfig } from 'formik';
import * as yup from 'yup';

// project imports
import Chip from 'ui-component/extended/Chip';
import Avatar from 'ui-component/extended/Avatar';
import ColorOptions from '../ColorOptions';
import { ColorsOptionsProps, Policy, Products } from 'types/e-commerce';
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch, useSelector } from 'store';
import { addProduct } from 'store/slices/cart';

// assets
import AddBoxIcon from '@mui/icons-material/AddBox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { IconSearch } from '@tabler/icons';
import CircleIcon from '@mui/icons-material/Circle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import StarBorderTwoToneIcon from '@mui/icons-material/StarBorderTwoTone';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { FormattedMessage, useIntl } from 'react-intl';
import { getCategoriesService, getSuppliers, getBrands2, getMerchantCategoriesService } from 'store/slices/catalog';
import { BrandType, BrandType2, CategoryType, MerchantCategoryType, SupplierType } from 'types/catalog';
import { getTradePolicies } from 'store/slices/product';

import ConfigProvider from 'config';
import { MerchantType } from 'types/security';

// product color select
function getColor(color: string) {
    return ColorOptions.filter((item) => item.value === color);
}
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
// product size
const sizeOptions = [8, 10, 12, 14, 16, 18, 20];

const validationSchema = yup.object({
    color: yup.string().required('Color selection is required'),
    size: yup.number().required('Size selection is required.')
});

// ==============================|| COLORS OPTION ||============================== //

const Colors = ({ checked, colorsData }: { checked?: boolean; colorsData: ColorsOptionsProps[] }) => {
    const theme = useTheme();
    return (
        <Grid item>
            <Tooltip title={colorsData[0].label}>
                <ButtonBase sx={{ borderRadius: '50%' }}>
                    <Avatar
                        color="inherit"
                        size="badge"
                        sx={{
                            bgcolor: colorsData[0].bg,
                            color: theme.palette.mode === 'light' ? 'grey.50' : 'grey.800'
                        }}
                    >
                        {checked && (
                            <CircleIcon sx={{ color: theme.palette.mode === 'light' ? 'grey.50' : 'grey.800', fontSize: '0.75rem' }} />
                        )}
                        {!checked && <CircleIcon sx={{ color: colorsData[0].bg, fontSize: '0.75rem' }} />}
                    </Avatar>
                </ButtonBase>
            </Tooltip>
        </Grid>
    );
};

/* const Increment = (props: string | FieldHookConfig<any>) => {
    const [field, , helpers] = useField(props);

    const { value } = field;
    const { setValue } = helpers;
    return (
        <ButtonGroup size="large" variant="text" color="inherit" sx={{ border: '1px solid', borderColor: 'grey.400' }}>
            <Button
                key="three"
                disabled={value <= 1}
                onClick={() => setValue(value - 1)}
                sx={{ pr: 0.75, pl: 0.75, minWidth: '0px !important' }}
            >
                <RemoveIcon fontSize="inherit" />
            </Button>
            <Button key="two" sx={{ pl: 0.5, pr: 0.5 }}>
                {value}
            </Button>
            <Button key="one" onClick={() => setValue(value + 1)} sx={{ pl: 0.75, pr: 0.75, minWidth: '0px !important' }}>
                <AddIcon fontSize="inherit" />
            </Button>
        </ButtonGroup>
    );
}; */
interface Props {
    label: string;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
};

function BrandModal({
    setModalBrands,
    modalBrands,
    search,
    setSearch,
    newBrand,
    setFlagBrand
}: {
    setModalBrands: any;
    modalBrands: boolean;
    search: string;
    setSearch: any;
    newBrand: any;
    setFlagBrand: any;
}) {
    const handleClose = (value: string) => {
        newBrand(value);
        setModalBrands(false);
    };
    const handleReject = () => {
        setFlagBrand(false);
        setModalBrands(false);
        setSearch('');
    };

    return (
        <>
            <Modal
                hideBackdrop
                open={modalBrands}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 500 }}>
                    <h2 id="child-modal-title">Confirmar Creación de Marca</h2>
                    <p id="child-modal-description">
                        Por favor, confirma que el nombre <span style={{ fontWeight: 'bold' }}>{search}</span> asignado a tu Marca es
                        correcto.
                    </p>
                    <Button onClick={handleReject} variant="outlined" sx={{ mr: 2 }}>
                        Revisar
                    </Button>
                    <Button onClick={() => handleClose(search)} variant="contained">
                        Confirmar
                    </Button>
                </Box>
            </Modal>
        </>
    );
}

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

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const ProductInfoCreate = ({
    setProductInfo,
    productInfo,
    selectedMerchants,
    setProductCreateCategories,
    productCreateCategories
}: {
    setProductInfo: any;
    productInfo: any;
    selectedMerchants: MerchantType[];
    setProductCreateCategories: any;
    productCreateCategories: any;
}) => {
    const intl = useIntl();
    const history = useNavigate();
    const dispatch = useDispatch();

    console.log(productInfo);
    console.log(typeof productInfo.created);

    const { suppliers, brands2, merchantCategories } = useSelector((state) => state.catalogue);
    const { product } = useSelector((state) => state.product);
    const { tradePolicies } = useSelector((state) => state.product);
    const [brandSearch, setBrandSearch] = useState('');
    const [categorySearch, setCategorySearch] = useState('');
    const [display, setDisplay] = useState(false);
    const [button, setButton] = useState(false);
    const [modalBrands, setModalBrands] = useState(false);
    const [brandsInfo, setBrandsInfo] = useState<BrandType2[]>([]);
    const [stateDrawer, setStateDrawer] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false
    });
    const [searchCat, setSearchCat] = useState(product?.categoryName ?? '');
    const [flagCategory, setFlagCategory] = useState(false);
    const [newCategorySku, setNewCategorySku] = useState<CategoryType>();
    const [categoriesOnDrawer, setCategoriesOnDrawer] = useState<CategoryType[]>([]);

    const handleChangeProd = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.type === 'checkbox') {
            setProductInfo((prev: any) => ({ ...prev, [event.target.name]: event.target.checked }));
        } else {
            setProductInfo((prev: any) => ({ ...prev, [event.target.name]: event.target.value }));
        }
    };
    /* const handleChangeSku = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.type === 'checkbox') {
            setSkuInfo((prev: any) => ({ ...prev, [event.target.name]: event.target.checked }));
        } else {
            setSkuInfo((prev: any) => ({ ...prev, [event.target.name]: event.target.value }));
        }
    }; */

    const newBrand = (value: string) => {
        /*  setModalBrands(true); */
        setBrandSearch(value);
        setDisplay(false);
    };

    useEffect(() => {
        console.log({ selectedMerchants });

        if (!selectedMerchants.length) return;
        dispatch(getBrands2(selectedMerchants[0].merchantId));
        // pasar este dispatch a las categorias dispatch(getCategoriesService({ idMerchant: 1 }));
        dispatch(getMerchantCategoriesService({ idMerchant: selectedMerchants[0].merchantId }));
        dispatch(getSuppliers());
        dispatch(getTradePolicies());
    }, [selectedMerchants]);

    useEffect(() => {
        if (brands2?.length) {
            setBrandsInfo(brands2);
        }
    }, [brands2]);

    useEffect(() => {
        console.log({ merchantCategories });
    }, [merchantCategories]);

    /* const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: product.id,
            name: product.name,
            image: product.image,
            salePrice: product.salePrice,
            offerPrice: product.offerPrice,
            color: '',
            size: '',
            quantity: 1
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Submit Success',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );

            history('/e-commerce/checkout');
        }
    }); */

    /* const { values, errors, handleSubmit, handleChange } = formik; */

    /* const addCart = () => {
        values.color = values.color ? values.color : 'primaryDark';
        values.size = values.size ? values.size : '8';
        dispatch(
            openSnackbar({
                open: true,
                message: 'Add To Cart Success',
                variant: 'alert',
                alert: {
                    color: 'success'
                },
                close: false
            })
        );
    }; */

    const handleChange = (event: any) => {
        setProductInfo({ ...productInfo, [event.target.name]: event.target.value });
    };
    const generateLinkId = (str: string) => {
        setProductInfo({ ...productInfo, linkId: str.replace(/\s+/g, '-') });
    };

    const changeDate = (date: any) => {
        const newDate = new Date(date);
        setProductInfo({ ...productInfo, created: newDate });
    };

    const customBrand = (value: SetStateAction<string>, id: number) => {
        setBrandSearch(value);
        setProductInfo((prev: any) => ({ ...prev, idBrand: id, brandName: value }));
        setDisplay(false);
    };

    type Anchor = 'top' | 'left' | 'bottom' | 'right';

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setStateDrawer({ ...stateDrawer, [anchor]: open });
    };

    const handleToggleDrawer = (merchant: MerchantType) => {
        if (!merchantCategories) return;

        const categories = merchantCategories.find(
            (merchantB: MerchantCategoryType) => merchantB.idMerchant === merchant.merchantId
        )?.categoryList;

        toggleDrawer('right', true);
        setCategoriesOnDrawer(categories || []);
    };

    if (!selectedMerchants.length || !merchantCategories) return null;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <FormControlLabel
                                sx={{ ml: 1 }}
                                control={<Android12Switch name="isActive" />}
                                label={<FormattedMessage id="active" />}
                            />
                            <FormControlLabel sx={{ ml: 1 }} control={<Android12Switch name="isVisible" />} label="Visible" />
                            <FormControlLabel
                                sx={{ ml: 1 }}
                                control={<Android12Switch name="isEcommerce" />}
                                label={<FormattedMessage id="e-commerce" />}
                            />
                            <FormControlLabel
                                sx={{ ml: 1 }}
                                control={<Android12Switch name="showWithoutStock" />}
                                label={<FormattedMessage id="out_of_stock" />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label={intl.formatMessage({ id: 'product_name' })}
                                variant="outlined"
                                name="productName"
                                onChange={handleChange}
                                onBlur={(event) => generateLinkId(event.target.value)}
                                value={productInfo.productName}
                            />
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label={intl.formatMessage({ id: 'title' })}
                                variant="outlined"
                                name="title"
                                onChange={handleChange}
                                value={productInfo.title}
                            />
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label={intl.formatMessage({ id: 'product_url' })}
                                variant="outlined"
                                name="linkId"
                                disabled
                                value={productInfo.linkId}
                            />
                            <TextField
                                multiline
                                id="outlined-basic"
                                label={intl.formatMessage({ id: 'reference_code' })}
                                variant="outlined"
                                name="productRefID"
                                onChange={handleChange}
                                value={productInfo.productRefID}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label={intl.formatMessage({ id: 'brand' })}
                                variant="outlined"
                                name="brandName"
                                /* defaultValue={product?.brandName} */
                                value={brandSearch}
                                onChange={(e) => setBrandSearch(e.target.value)}
                                onClick={() => setDisplay(false)}
                            />
                            {/* <BrandModal
                                setModalBrands={setModalBrands}
                                modalBrands={modalBrands}
                                search={search}
                                setSearch={setSearch}
                                newBrand={newBrand}
                                setFlagBrand={setFlagBrand}
                            /> */}
                            {display && (
                                <Box boxShadow={2} sx={{ height: '200px' }}>
                                    <PerfectScrollbar>
                                        <div
                                            className={
                                                ConfigProvider.navType === 'dark' ? 'BrandsAutoContainerDark' : 'BrandsAutoContainerWhite'
                                            }
                                        >
                                            {/* {brandsInfo
                                                ?.filter(({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) > -1)
                                                .map((v: BrandType, i: Key): any => (
                                                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                                                    <Typography
                                                        variant="body2"
                                                        className="brandsOption"
                                                        sx={{ pl: 2, pt: 1, pb: 1 }}
                                                        key={i}
                                                        onClick={() => customBrand(v.name, v.idBrand)}
                                                    >
                                                        {v.name}
                                                    </Typography>
                                                ))} */}
                                        </div>
                                    </PerfectScrollbar>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label={intl.formatMessage({ id: 'category' })}
                                variant="outlined"
                                name="categoryName"
                                /* defaultValue={product?.brandName} */
                                value={categorySearch}
                                onChange={(e) => setBrandSearch(e.target.value)}
                                // onClick={() =>
                                // }
                                InputProps={{
                                    readOnly: true
                                }}
                            />
                            {display && (
                                <Box boxShadow={2} sx={{ height: '200px' }}>
                                    <PerfectScrollbar>
                                        <div
                                            className={
                                                ConfigProvider.navType === 'dark' ? 'BrandsAutoContainerDark' : 'BrandsAutoContainerWhite'
                                            }
                                        >
                                            {/* {brandsInfo
                                                ?.filter(({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) > -1)
                                                .map((v: BrandType, i: Key): any => (
                                                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                                                    <Typography
                                                        variant="body2"
                                                        className="brandsOption"
                                                        sx={{ pl: 2, pt: 1, pb: 1 }}
                                                        key={i}
                                                        onClick={() => customBrand(v.name, v.idBrand)}
                                                    >
                                                        {v.name}
                                                    </Typography>
                                                ))} */}
                                        </div>
                                    </PerfectScrollbar>
                                </Box>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    '& .MuiTextField-root': { mt: 2 },
                                    position: 'relative'
                                }}
                            >
                                {selectedMerchants.map((merchant: MerchantType) => (
                                    <Button
                                        onClick={() => {
                                            handleToggleDrawer(merchant);
                                            toggleDrawer('right', true);
                                        }}
                                        variant="contained"
                                    >
                                        {`${intl.formatMessage({ id: 'select_category' })} - ${merchant.name}`}
                                    </Button>
                                ))}
                                <Typography variant="body2">
                                    {intl.formatMessage({ id: 'selected_category' })}: {searchCat}
                                </Typography>
                                <SwipeableDrawer
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
                                    {categoriesOnDrawer
                                        .filter((item) => item?.name?.toLowerCase().indexOf(searchCat.toLowerCase()) > -1)
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
                                </SwipeableDrawer>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label={intl.formatMessage({ id: 'create_Date' })} onChange={changeDate} />
                            </LocalizationProvider>
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker disabled label={intl.formatMessage({ id: 'update_Date' })} />
                            </LocalizationProvider> */}
                        </Grid>
                    </Grid>
                </Stack>
            </Grid>
            {/* <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    id="outlined-basic"
                    label={intl.formatMessage({ id: 'description' })}
                    variant="outlined"
                    name="description"
                />
            </Grid> */}
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        <FormattedMessage id="select_vendor" />
                    </InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Vendor" /* onChange={handleChangeVendor} */>
                        {suppliers?.map((sup: SupplierType) => (
                            <MenuItem value={sup?.idProvider}>{sup?.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="h2" color="primary">
                        ${product.offerPrice}
                    </Typography>
                    <Typography variant="body1" sx={{ textDecoration: 'line-through' }}>
                        ${product.salePrice}
                    </Typography>
                    <Typography variant="caption">(Inclusive of all taxes)</Typography>
                </Stack> */}
            </Grid>
            <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">{intl.formatMessage({ id: 'trade_policies' })}</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        name="tradePolicy"
                        input={<OutlinedInput label="Trade Policies" />}
                        renderValue={(selected: any) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {/* {tradePolicies?.TradePolicies?.map((tr: Policy) => (
                            <MenuItem key={tr.idPolicy} value={tr.idPolicy}>
                                <Checkbox checked={productInfo.tradePolicies.idPolicy} />
                                <ListItemText primary={tr.name} />
                            </MenuItem>
                        ))} */}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                {/* <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">{intl.formatMessage({ id: 'trade_policies' })}</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={filterTradePolicy(product.tradePolicies[0].idPolicy)}
                        onChange={(event) => {
                            setProductInfo(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);
                        }}
                        name="tradePolicy"
                        input={<OutlinedInput label="Trade Policies" />}
                        renderValue={(selected: any) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {tradePolicies?.TradePolicies?.map((tr: Policy) => (
                            <MenuItem key={tr.idPolicy} value={tr.idPolicy}>
                                <Checkbox checked={productInfo.tradePolicies} />
                                <ListItemText primary={tr.name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl> */}
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {/* <Grid item xs={12} lg={10}>
                        <Table>
                            <TableBody sx={{ '& .MuiTableCell-root': { borderBottom: 'none' } }}>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="body2">
                                            Colors{' '}
                                            <Typography color="error" component="span">
                                                *
                                            </Typography>
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left" />
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Stack>
                                            <Typography variant="body2">
                                                Size{' '}
                                                <Typography color="error" component="span">
                                                    *
                                                </Typography>
                                            </Typography>
                                            <Typography variant="caption" color="primary" component={Link} to="#">
                                                Size Chart?
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="left">
                                        <FormControl sx={{ minWidth: 120 }}>
                                            <Select id="size" name="size" displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
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
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="body2">Quantity</Typography>
                                    </TableCell>
                                    <TableCell align="left">{}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid> */}
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Button fullWidth color="primary" variant="contained" size="large">
                                    {intl.formatMessage({ id: 'save' })}
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button type="submit" fullWidth color="secondary" variant="contained" size="large">
                                    Buy Now
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductInfoCreate;
