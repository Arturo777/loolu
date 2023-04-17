import { useEffect, useState } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import {
    Box,
    Button,
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
    Select,
    Stack,
    Switch,
    TextField,
    Tooltip
} from '@mui/material';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// project imports
import { useDispatch, useSelector } from 'store';

// assets
import AddBoxIcon from '@mui/icons-material/AddBox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { FormattedMessage, useIntl } from 'react-intl';
import { getSuppliers, getBrands2, getMerchantCategoriesService } from 'store/slices/catalog';
import { CategoryType, SupplierType } from 'types/catalog';
import { getTradePolicies } from 'store/slices/product';

import MultiMerchantForm, { MultiMerchantFormProps } from 'ui-component/MultiMerchant/MerchantsForm';
import { InputType } from 'ui-component/MultiMerchant/MerchantsForm/InputComponent';
import { MerchantType } from 'types/security';
import ProductPrices from './ProductPrices';

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
    const dispatch = useDispatch();

    console.log(productInfo);
    console.log(typeof productInfo.created);

    const { suppliers, merchantCategories } = useSelector((state) => state.catalogue);
    const [categorySearch, setCategorySearch] = useState('');

    useEffect(() => {
        console.log({ selectedMerchants });

        if (!selectedMerchants.length) return;
        dispatch(getBrands2(selectedMerchants[0].merchantId));
        // pasar este dispatch a las categorias dispatch(getCategoriesService({ idMerchant: 1 }));
        dispatch(getMerchantCategoriesService({ idMerchant: selectedMerchants[0].merchantId }));
        dispatch(getSuppliers());
        dispatch(getTradePolicies());
    }, [selectedMerchants, dispatch]);

    useEffect(() => {
        console.log({ merchantCategories });
    }, [merchantCategories]);

    const defaultMerchantProps: MultiMerchantFormProps = {
        isOpen: false,
        data: [],
        accessor: '',
        // data: { [key: string]: any }[];
        inputLabel: 'label',
        toggleDrawer: (e) => {
            // console.log('TOGLLE');
            setMultiFormProps((prev) => ({ ...prev, isOpen: e }));
            // resetDrawer();
        },
        onSave: (data: any) => console.log(data),
        type: InputType.textField
        // options?: null | SelectOptionType[];
    };

    const [multiFormProps, setMultiFormProps] = useState<MultiMerchantFormProps>(defaultMerchantProps);

    const handleSetCategoriesMultiFormProps = () => {
        if (!merchantCategories) return;
        const data = selectedMerchants.map((merchant: MerchantType) => ({
            merchantId: merchant.merchantId,
            merchantName: merchant.name,
            detailProduct: {
                categories: []
            }
        }));
        setMultiFormProps((prev) => ({
            ...prev,
            isOpen: true,
            type: InputType.categorySelect,
            data,
            inputLabel: 'categories',
            accessor: 'categories'
        }));
    };

    const handleSetMultiFormProps = (type: any, accessor: any) => {
        const data = selectedMerchants.map((merchant: MerchantType) => ({
            merchantId: merchant.merchantId,
            merchantName: merchant.name,
            detailProduct: {
                categories: [],
                brands: [],
                tradePolicies: []
            }
        }));
        setMultiFormProps((prev) => ({
            ...prev,
            isOpen: true,
            type,
            data,
            label: '',
            accessor
        }));
    };

    console.log(productInfo.isActive);

    const handleChange = (event: any) => {
        setProductInfo({ ...productInfo, [event.target.name]: event.target.value });
    };

    const handleSwitches = (event: any) => {
        setProductInfo({ ...productInfo, [event.target.name]: event.target.checked });
    };

    const handleChangeVendor = (event: any) => {
        console.log(event);
        setProductInfo({ ...productInfo, vendor: event.target.value });
    };

    const generateLinkId = (str: string) => {
        setProductInfo({ ...productInfo, linkId: str.replace(/\s+/g, '-') });
    };

    const changeDate = (date: any) => {
        const newDate = new Date(date);
        setProductInfo({ ...productInfo, created: newDate });
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
                                onChange={handleSwitches}
                            />
                            <FormControlLabel
                                sx={{ ml: 1 }}
                                control={<Android12Switch name="isVisible" />}
                                label="Visible"
                                onChange={handleSwitches}
                            />
                            <FormControlLabel
                                sx={{ ml: 1 }}
                                control={<Android12Switch name="isEcommerce" />}
                                label={<FormattedMessage id="e-commerce" />}
                                onChange={handleSwitches}
                            />
                            <FormControlLabel
                                sx={{ ml: 1 }}
                                control={<Android12Switch name="showWithoutStock" />}
                                label={<FormattedMessage id="out_of_stock" />}
                                onChange={handleSwitches}
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
                            <Button
                                onClick={(e) => {
                                    console.log(e);
                                    handleSetMultiFormProps(InputType.brandSelectCreate, 'brands');
                                }}
                                variant="contained"
                            >
                                {intl.formatMessage({ id: 'select_brand' })}
                            </Button>
                            <MultiMerchantForm {...multiFormProps} />
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
                                onChange={(e) => setCategorySearch(e.target.value)}
                                // onClick={() =>
                                // }
                                InputProps={{
                                    readOnly: true
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    '& .MuiTextField-root': { mt: 2 },
                                    position: 'relative'
                                }}
                            >
                                <Button onClick={handleSetCategoriesMultiFormProps} variant="contained">
                                    {intl.formatMessage({ id: 'select_category' })}
                                </Button>

                                <MultiMerchantForm {...multiFormProps} />
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
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Vendor" onChange={handleChangeVendor}>
                        {suppliers?.map((sup: SupplierType) => (
                            <MenuItem value={(sup?.idProvider, sup?.name)}>{sup?.name}</MenuItem>
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
                    <Button
                        onClick={(e) => {
                            handleSetMultiFormProps(InputType.policies, 'tradePolicies');
                        }}
                        variant="contained"
                    >
                        {intl.formatMessage({ id: 'select_trade_policies' })}
                    </Button>
                    <MultiMerchantForm {...multiFormProps} />
                    {/* <Autocomplete
                        multiple
                        id="checkboxes-tags-demo"
                        options={policies}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                                {option.name}
                            </li>
                        )}
                        style={{ width: 500 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={intl.formatMessage({ id: 'trade_policies' })}
                                placeholder={intl.formatMessage({ id: 'trade_policies' })}
                            />
                        )}
                    /> */}
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
                <ProductPrices />
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
