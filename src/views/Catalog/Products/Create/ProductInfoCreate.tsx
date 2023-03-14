/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Link } from 'react-router-dom';

// material-ui
import { styled } from '@mui/material/styles';
import {
    Button,
    Box,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    MenuItem,
    Radio,
    RadioGroup,
    /* Rating, */
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    TextField,
    InputLabel,
    Checkbox,
    ListItemText,
    OutlinedInput,
    IconButton,
    Switch,
    SwipeableDrawer,
    ListItemButton,
    ListItemIcon,
    Tooltip,
    Collapse,
    InputAdornment,
    Modal
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IconSearch } from '@tabler/icons';
import formatUrl from 'utils/formatUrl';
// third-party

// project imports
import Chip from 'ui-component/extended/Chip';
import { Skus } from 'types/e-commerce';
import { useDispatch, useSelector } from 'store';

// assets
import { Key, SetStateAction, useEffect, useRef, useState } from 'react';

import ProductDimensions from 'views/ProductDetails/ProductDimensions';
import { FormattedMessage, useIntl } from 'react-intl';
import { BrandType, CategoryType } from 'types/catalog';
import { getCategoriesService } from 'store/slices/catalog';
import ConfigProvider from 'config';
import filterUnitM from 'utils/unitMeasurement';
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
type Anchor = 'top' | 'left' | 'bottom' | 'right';
// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const ProductInfoCreate = ({
    tradePolicies,
    brandsInfo,
    setFlagBrand,
    flagBrand,
    setNewBrandSku,
    setFlagCategory,
    flagCategory,
    setNewCategorySku
}: {
    tradePolicies: any;
    brandsInfo: BrandType[] | undefined;
    setFlagBrand: any;
    flagBrand: boolean;
    setNewBrandSku: any;
    setFlagCategory: any;
    flagCategory: boolean;
    setNewCategorySku: any;
}) => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const wrapperRef = useRef(null);
    const [stateDrawer, setStateDrawer] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false
    });
    /* const [selectedCatId, setSelectedCatId] = useState<number>(); */
    /* const dispatch = useDispatch(); */
    /* const history = useNavigate(); */
    // info Brands
    const [button, setButton] = useState(false);
    const [display, setDisplay] = useState(false);
    const [search, setSearch] = useState({});
    const [modalBrands, setModalBrands] = useState(false);

    // info Categories
    const [searchCat, setSearchCat] = useState('');
    const { categories } = useSelector((state) => state.catalogue);

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }

        setStateDrawer({ ...stateDrawer, [anchor]: open });
    };
    const handleClickOutside = (event: { target: any }) => {
        const { current: wrap }: any = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setDisplay(false);
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

    const filterTradePolicy = (trade: number) => {
        const resultTrade: any = tradePolicies.TradePolicies.filter((tra: any) => tra.idPolicy === trade);
        return resultTrade[0]?.name;
    };
    const formatterDolar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    const customBrand = (value: SetStateAction<string>, id: number) => {
        setSearch(value);
        setDisplay(false);
    };
    const newBrand = (value: string) => {
        /*  setModalBrands(true); */
        setSearch(value);
        setFlagBrand(true);
        setNewBrandSku((prev: any) => ({ ...prev, name: value, title: value, isActive: true, metaTagDescription: '', imageUrl: '' }));
        setDisplay(false);
    };
    /* const selectTradePolicy =(idPolicy)=> {
        const res = product?.tradePolicies?.filter((tr: any) =>{
            tr
        })
    } */
    /* useEffect(() => {
        if (flagBrand) {
            setModalBrands(true);
        }
    }, [flagBrand]); */

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h2>
                    <FormattedMessage id="product-detail-title" />
                </h2>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <FormControlLabel sx={{ ml: 1 }} control={<Android12Switch />} label={<FormattedMessage id="active" />} />
                            <FormControlLabel sx={{ ml: 1 }} control={<Android12Switch />} label="Visible" />
                            <FormControlLabel sx={{ ml: 1 }} control={<Android12Switch />} label={<FormattedMessage id="e-commerce" />} />
                            <FormControlLabel
                                sx={{ ml: 1 }}
                                control={<Android12Switch name="showWithoutStock" onChange={handleChangeProd} />}
                                label={<FormattedMessage id="out_of_stock" />}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ ml: 1 }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Box
                                    sx={{
                                        '& .MuiTextField-root': { mt: 2 }
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        label={intl.formatMessage({ id: 'product_name' })}
                                        variant="outlined"
                                        name="productName"
                                        onChange={handleChangeProd}
                                    />
                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        label={intl.formatMessage({ id: 'title' })}
                                        variant="outlined"
                                        name="title"
                                        onChange={handleChangeProd}
                                    />
                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        label={intl.formatMessage({ id: 'product_url' })}
                                        variant="outlined"
                                        name="linkId"
                                        onChange={handleChangeProd}
                                    />
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                    {/* <Avatar variant="rounded" sx={{ bgcolor: 'grey.200', color: 'grey.800' }}>
                            <FavoriteBorderIcon />
                        </Avatar> */}
                </Stack>
            </Grid>
            <Grid item xs={12} sx={{ ml: 1 }}>
                <Box
                    sx={{
                        '& .MuiTextField-root': { mt: 2 }
                    }}
                >
                    <TextField
                        fullWidth
                        multiline
                        id="outlined-basic"
                        label={intl.formatMessage({ id: 'description' })}
                        variant="outlined"
                        name="description"
                        onChange={handleChangeProd}
                    />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" sx={{ ml: 1 }}>
                    <Box
                        sx={{
                            '& .MuiTextField-root': { mt: 2 }
                        }}
                    >
                        <TextField
                            multiline
                            id="outlined-basic"
                            label={intl.formatMessage({ id: 'reference_code' })}
                            variant="outlined"
                            name="productRefID"
                            onChange={handleChangeProd}
                        />
                    </Box>
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ ml: 1 }}>
                <Box
                    sx={{
                        '& .MuiTextField-root': { mt: 2 }
                    }}
                >
                    <FormControl fullWidth ref={wrapperRef} style={{ position: 'relative' }}>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label={intl.formatMessage({ id: 'brand' })}
                            variant="outlined"
                            name="brandName"
                            /* defaultValue={product?.brandName} */
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onClick={() => setDisplay(true)}
                        />
                        <BrandModal
                            setModalBrands={setModalBrands}
                            modalBrands={modalBrands}
                            search={search}
                            setSearch={setSearch}
                            newBrand={newBrand}
                            setFlagBrand={setFlagBrand}
                        />
                        {display && (
                            <div className={ConfigProvider.navType === 'dark' ? 'BrandsAutoContainerDark' : 'BrandsAutoContainerWhite'}>
                                <div className="btn-add">
                                    <TextField
                                        fullWidth
                                        sx={{ width: '80%' }}
                                        id="outlined-basic"
                                        label={intl.formatMessage({ id: 'new_brand' })}
                                        variant="outlined"
                                        /* defaultValue={product?.brandName} */
                                        onClick={() => setButton(true)}
                                        onBlur={(event) => {
                                            setModalBrands(true);
                                            setSearch(event.target.value);
                                        }}
                                    />

                                    {button && (
                                        <IconButton color="success" size="large">
                                            <AddCircleOutlineIcon />
                                        </IconButton>
                                    )}
                                </div>
                                {brandsInfo
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
                                    ))}
                            </div>
                        )}
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={12} sx={{ ml: 1 }}>
                <Box
                    sx={{
                        '& .MuiTextField-root': { mt: 2 },
                        position: 'relative'
                    }}
                >
                    <Button onClick={toggleDrawer('right', true)} variant="contained">
                        {intl.formatMessage({ id: 'edit_category' })}
                    </Button>
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
                        {categories
                            ?.filter((item) => item?.name?.toLowerCase().indexOf(searchCat.toLowerCase()) > -1)
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
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">{intl.formatMessage({ id: 'trade_policies' })}</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
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
            </Grid>
            <Grid item xs={12}>
                <Divider sx={{ mt: 2 }} />
            </Grid>

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
                                            onChange={handleRadioChange}
                                            name={intl.formatMessage({ id: 'sku' })}
                                            id="sku"
                                            sx={{ ml: 1 }}
                                            defaultValue={product?.skus[0].skuID}
                                        >
                                            {product?.skus.map((sku: any, index: Key | null | undefined) => (
                                                <FormControlLabel
                                                    key={index}
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
                                    defaultValue={skuInfo?.name}
                                    value={skuInfo?.name}
                                    onChange={handleChangeSku}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
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
                                    onChange={handleChangeSku}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Table>
                                <TableBody sx={{ '& .MuiTableCell-root': { borderBottom: 'none' } }}>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
                                                {intl.formatMessage({ id: 'Pricing' })}
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
                                                        <Typography variant="caption">{filterTradePolicy(tradePolicy)}</Typography>
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
                                <br />
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="body2">{intl.formatMessage({ id: 'quantity ' })}</Typography>
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
        </Grid>
    );
};

export default ProductInfoCreate;
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
