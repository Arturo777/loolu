import { Key, useEffect, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
    Box,
    Button,
    CardActions,
    CardContent,
    CircularProgress,
    Divider,
    Fade,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material';
// project imports
import Avatar from 'ui-component/extended/Avatar';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import SendIcon from '@mui/icons-material/Send';

// services
import { approvalStatus, getRejectedStatus } from 'store/slices/product';
import { useDispatch, useSelector } from 'store';
import { ApprovalStatus, Products, RejectedStatus, Skus } from 'types/e-commerce';

// ==============================|| DATA WIDGET - TASKS CARD ||============================== //

const ApprovalCard = ({ product, valueSku }: { product: Products | null; valueSku: string | null }) => {
    const [approval, setApproval] = useState<ApprovalStatus[] | null>(null);
    const [rejected, setRejected] = useState<RejectedStatus[] | null>(null);
    const [operation, setOperation] = useState<string | null>(null);
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const approvalState = useSelector((state) => state.product);

    const statusSku = useMemo(() => {
        let skucircle: any = [];
        if (valueSku) {
            skucircle = product?.skus?.filter((status: Skus) => status.skuID === valueSku);
        } else {
            skucircle = product?.skus;
        }
        return skucircle[0].approvalStatus;
    }, [product?.skus, valueSku]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOperation(event.target.value);
    };
    const handleChangeSelect = (event: SelectChangeEvent) => {
        setReason(event.target.value);
    };

    useEffect(() => {
        dispatch(approvalStatus());
        dispatch(getRejectedStatus());
        setLoading(true);
    }, [dispatch]);
    console.log(rejected, 'catalogo');

    useEffect(() => {
        setApproval(approvalState.approvalStatus);
        setRejected(approvalState.getRejectedStatus);
        setLoading(false);
    }, [approvalState.approvalStatus, approvalState.getRejectedStatus]);
    return (
        <MainCard title="Approval Status" content={false}>
            <CardContent>
                <Grid
                    container
                    spacing={gridSpacing}
                    alignItems="center"
                    sx={{
                        position: 'relative',
                        '&>*': {
                            position: 'relative',
                            zIndex: '5'
                        },
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 43,
                            width: 2,
                            height: '100%',
                            background: '#ebebeb',
                            zIndex: '1'
                        }
                    }}
                >
                    {!loading ? (
                        <>
                            {approval?.map(({ estatus }: any, index: any) => (
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            {estatus && index < statusSku.currentStatus.idEstatus ? (
                                                <Avatar color="success" size="sm" sx={{ top: 10 }}>
                                                    <ThumbUpAltOutlinedIcon />
                                                </Avatar>
                                            ) : (
                                                <Avatar color="primary" size="sm" sx={{ top: 10 }}>
                                                    <QueryBuilderOutlinedIcon />
                                                </Avatar>
                                            )}
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}>
                                                    <Typography align="left" variant="caption">
                                                        8:50
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography align="left" variant="body2">
                                                        {estatus}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                        </>
                    ) : (
                        <>
                            <Fade in={loading}>
                                <Box
                                    component={Typography}
                                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 10 }}
                                >
                                    <CircularProgress />
                                </Box>
                            </Fade>
                        </>
                    )}

                    {/* <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Avatar color="primary" size="sm" sx={{ top: 10 }}>
                                    <QueryBuilderOutlinedIcon />
                                </Avatar>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={0}>
                                    <Grid item xs={12}>
                                        <Typography align="left" variant="caption">
                                            Sat, 5 Mar
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography align="left" variant="body2">
                                            Design mobile Application
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Avatar color="error" size="sm" sx={{ top: 10 }}>
                                    <BugReportOutlinedIcon />
                                </Avatar>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={0}>
                                    <Grid item xs={12}>
                                        <Typography align="left" variant="caption">
                                            Sun, 17 Feb
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography align="left" variant="body2">
                                            <Link component={RouterLink} to="#" underline="hover">
                                                Jenny
                                            </Link>{' '}
                                            assign you a task{' '}
                                            <Link component={RouterLink} to="#" underline="hover">
                                                Mockup Design
                                            </Link>
                                            .
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Avatar color="warning" size="sm" sx={{ top: 10 }}>
                                    <ErrorOutlineOutlinedIcon />
                                </Avatar>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={0}>
                                    <Grid item xs={12}>
                                        <Typography align="left" variant="caption">
                                            Sat, 18 Mar
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography align="left" variant="body2">
                                            Design logo
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Avatar color="success" size="sm" sx={{ top: 10 }}>
                                    <ThumbUpAltOutlinedIcon />
                                </Avatar>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={0}>
                                    <Grid item xs={12}>
                                        <Typography align="left" variant="caption">
                                            Sat, 22 Mar
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography align="left" variant="body2">
                                            Design mobile Application
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid> */}
                </Grid>
            </CardContent>
            <Divider />
            <CardActions>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <FormControl component="fieldset" variant="standard">
                        <FormLabel component="legend">Select a Operation</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={handleChange}
                        >
                            <FormControlLabel value="accept" control={<Radio />} label="Accept" />
                            <FormControlLabel value="reject" control={<Radio />} label="Reject" />
                        </RadioGroup>
                    </FormControl>
                    {operation === 'reject' ? (
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small">Reason for rejection</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                label="Reason for rejection"
                                onChange={handleChangeSelect}
                            >
                                {rejected?.map((searchreason: any, index: Key) => (
                                    <MenuItem key={index} value={searchreason?.rejectId}>
                                        {searchreason?.rejectName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ) : (
                        <></>
                    )}
                    {operation ? (
                        <>
                            <TextField
                                sx={{ width: '100%', marginBottom: '10px' }}
                                id="filled-multiline-flexible"
                                label="Multiline"
                                multiline
                                rows={4}
                            />
                            <Button variant="contained" endIcon={<SendIcon />}>
                                Send
                            </Button>
                        </>
                    ) : (
                        <></>
                    )}
                </Box>
            </CardActions>
        </MainCard>
    );
};

export default ApprovalCard;
