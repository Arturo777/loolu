import { JSXElementConstructor, Key, ReactElement, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Button,
    ButtonBase,
    ButtonGroup,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Radio,
    RadioGroup,
    Rating,
    Select,
    Stack,
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
import CircleIcon from '@mui/icons-material/Circle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import StarBorderTwoToneIcon from '@mui/icons-material/StarBorderTwoTone';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { FormattedMessage, useIntl } from 'react-intl';
import { getCategoriesService, getSuppliers } from 'store/slices/catalog';
import { SupplierType } from 'types/catalog';
import { getTradePolicies } from 'store/slices/product';

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
// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const ProductInfoCreate = ({ setProductInfo, productInfo }: { setProductInfo: any; productInfo: any }) => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const history = useNavigate();

    const { categories, suppliers } = useSelector((state) => state.catalogue);
    const { tradePolicies } = useSelector((state) => state.product);

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

    useEffect(() => {
        dispatch(getCategoriesService({ idMerchant: 1 }));
        dispatch(getSuppliers());
        dispatch(getTradePolicies());
    }, [dispatch]);
    console.log(tradePolicies);

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
                            />
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label={intl.formatMessage({ id: 'title' })}
                                variant="outlined"
                                name="title"
                            />
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label={intl.formatMessage({ id: 'product_url' })}
                                variant="outlined"
                                name="linkId"
                            />
                            <TextField
                                multiline
                                id="outlined-basic"
                                label={intl.formatMessage({ id: 'reference_code' })}
                                variant="outlined"
                                name="productRefID"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label={intl.formatMessage({ id: 'create_Date' })} />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label={intl.formatMessage({ id: 'update_Date' })} />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    id="outlined-basic"
                    label={intl.formatMessage({ id: 'description' })}
                    variant="outlined"
                    name="description"
                />
            </Grid>
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
                    <Grid item xs={12} lg={10}>
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
                                    <TableCell align="left">{/* <Increment name="quantity" /> */}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
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
