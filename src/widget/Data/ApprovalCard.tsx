import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Button, CardActions, CardContent, CircularProgress, Divider, Fade, Grid, Link, Typography } from '@mui/material';

// project imports
import Avatar from 'ui-component/extended/Avatar';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';

// services
import { approvalStatus } from 'store/slices/product';
import { useDispatch, useSelector } from 'store';
import { ApprovalStatus } from 'types/e-commerce';

// ==============================|| DATA WIDGET - TASKS CARD ||============================== //

const ApprovalCard = () => {
    const [approval, setApproval] = useState<ApprovalStatus[] | null>(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const approvalState = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(approvalStatus());
        setLoading(true);
    }, [dispatch]);

    useEffect(() => {
        setApproval(approvalState.approvalStatus);
        setLoading(false);
    }, [approvalState.approvalStatus]);
    console.log(approval);
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
                            {approval?.map(({ estatus }: any) => (
                                <Grid item xs={12}>
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

                    <Grid item xs={12}>
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
                    </Grid>
                </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="text" size="small">
                    View all Projects
                </Button>
            </CardActions>
        </MainCard>
    );
};

export default ApprovalCard;
