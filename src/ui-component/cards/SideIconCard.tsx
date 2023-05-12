/* eslint-disable no-nested-ternary */
// material-ui
import { Card, Grid, SvgIconTypeMap, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { GenericCardProps } from 'types';
import CustomerSatisfactionCard from './CustomerSatisfactionCard';

interface SideIconCardProps extends GenericCardProps {
    iconPrimary: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
    secondarySub?: string;
    bgcolor?: string;
    metrics?: any;
}

// =============================|| SIDE ICON CARD ||============================= //

const SideIconCard = ({ iconPrimary, primary, secondary, secondarySub, color, bgcolor, metrics }: SideIconCardProps) => (
    <Card sx={{ bgcolor: bgcolor || '', position: 'relative' }}>
        <Grid container justifyContent="space-between" alignItems="center" height="250px">
            <Grid item xs={4} sx={{ background: color, px: 0, height: '100%', position: 'relative', overflow: 'hidden' }}>
                <Typography
                    variant="h5"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        color: '#a483ff',
                        '& > svg': {
                            width: 100,
                            height: 100
                        }
                    }}
                    align="center"
                >
                    {metrics?.overallScore <= 34 ? (
                        <SentimentVeryDissatisfiedIcon />
                    ) : metrics.overallScore >= 35 && metrics.overallScore <= 80 ? (
                        <SentimentNeutralIcon />
                    ) : (
                        <SentimentSatisfiedAltIcon />
                    )}
                </Typography>
            </Grid>
            <Grid item xs={8} sx={{ height: '100%' }}>
                <CustomerSatisfactionCard metrics={metrics} />
            </Grid>
        </Grid>
    </Card>
);

export default SideIconCard;
