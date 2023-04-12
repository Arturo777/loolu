/* eslint-disable prettier/prettier */
// material-ui
import { Grid, LinearProgress, Typography } from '@mui/material';


// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';


// ===========================|| WIDGET STATISTICS - CUSTOMER SATISFACTION ||=========================== //

const CustomerSatisfactionCard = ({ metrics }: { metrics: any }) => {
    
    const theme = useTheme();

    return(
    <MainCard title={<FormattedMessage id='store-status'/>} sx={{
        height: '100%',
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.grey[100],
        '&:hover': {
            border: `1px solid${theme.palette.primary.main}`
        }
    }}>
        <Grid container spacing={3} >
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
                                <Typography variant="subtitle2"><FormattedMessage id='previous'/></Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5">56.75</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2"><FormattedMessage id='change-card'/></Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5">+12.60</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2"><FormattedMessage id='trend'/></Typography>
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
)};

export default CustomerSatisfactionCard;
