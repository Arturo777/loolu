import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, CardContent, CircularProgress, Divider, Fade, Grid, TextField, Typography } from '@mui/material';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import MoodBadIcon from '@mui/icons-material/MoodBad';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// services
import { getApprovalHistorial } from 'store/slices/product';
import { useDispatch, useSelector } from 'store';
import { ApprovalHistorial, Products } from 'types/e-commerce';
import StepApproval from 'ui-component/cards/StepApproval';

// ==============================|| DATA WIDGET - TASKS CARD ||============================== //

const ApprovalHistorialCard = ({ product, valueSku }: { product: Products | null; valueSku: string | null }) => {
    const theme = useTheme();
    const [historial, setHistorial] = useState<ApprovalHistorial[] | null>(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const approvalState = useSelector((state) => state.product);

    useEffect(() => {
        const infoProdHistorial = {
            valueSku,
            prodId: product?.productID
        };
        if (valueSku) {
            dispatch(getApprovalHistorial(infoProdHistorial));
            setLoading(true);
        }
    }, [dispatch, product?.productID, valueSku]);

    useEffect(() => {
        setHistorial(approvalState.approvalHistorial);
        setLoading(false);
    }, [approvalState.approvalHistorial]);

    console.log(historial, 'catalogo');
    return (
        <MainCard title="Approval Historial" content={false}>
            <CardContent>
                <Grid container spacing={gridSpacing} alignItems="center">
                    {!loading ? (
                        <>
                            {historial?.map((history: any) => (
                                <Grid item xs={12}>
                                    <StepApproval
                                        iconPrimary={history?.rejectId !== null ? MoodBadIcon : SentimentVerySatisfiedIcon}
                                        color={history?.rejectId !== null ? theme.palette.error.dark : theme.palette.success.dark}
                                        history={history}
                                        bgcolor="#161e3d"
                                    />
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
                </Grid>
            </CardContent>
            <Divider />
            {/* <CardActions>
                <TextField>Hola</TextField>
            </CardActions> */}
        </MainCard>
    );
};

export default ApprovalHistorialCard;
