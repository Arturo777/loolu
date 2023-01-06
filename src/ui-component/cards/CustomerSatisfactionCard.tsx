/* eslint-disable prettier/prettier */
// material-ui
import { Grid, LinearProgress, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// ===========================|| WIDGET STATISTICS - CUSTOMER SATISFACTION ||=========================== //

const CustomerSatisfactionCard = ({ metrics }: { metrics: any }) => (
    <MainCard title="Estatus de la Tienda">
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h3" align="center">
                    {metrics?.overallScore?.toFixed(2).toString()}%
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <LinearProgress
                    variant="determinate"
                    value={metrics?.overallScore?.toFixed(2)}
                    color={
                        // eslint-disable-next-line no-nested-ternary
                        metrics?.overallScore <= 34
                            ? 'info'
                            : metrics.overallScore >= 35 && metrics.overallScore <= 80
                                ? 'warning'
                                : 'success'
                    }
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">previous</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5">56.75</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">Change</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5">+12.60</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">Trend</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5">23.78</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </MainCard>
);

export default CustomerSatisfactionCard;
