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
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={4} sx={{ background: color, py: '90px', px: 0 }}>
                <Typography
                    variant="h5"
                    sx={{
                        textAlign: 'center',
                        color: '#7c4dff',
                        '& > svg': {
                            width: 60,
                            height: 60
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
            <Grid item xs={8}>
                <CustomerSatisfactionCard metrics={metrics} />
            </Grid>
        </Grid>
    </Card>
);

export default SideIconCard;
