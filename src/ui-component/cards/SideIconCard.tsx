// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, Grid, SvgIconTypeMap, Typography, useMediaQuery } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { GenericCardProps } from 'types';
import GaugeChart from 'react-gauge-chart';
import CustomerSatisfactionCard from './CustomerSatisfactionCard';

interface SideIconCardProps extends GenericCardProps {
    iconPrimary: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
    secondarySub?: string;
    bgcolor?: string;
}

// =============================|| SIDE ICON CARD ||============================= //

const SideIconCard = ({ iconPrimary, primary, secondary, secondarySub, color, bgcolor }: SideIconCardProps) => {
    const theme = useTheme();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary !== undefined ? <IconPrimary /> : null;

    return (
        <Card sx={{ bgcolor: bgcolor || '', position: 'relative' }}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item xs={4} sx={{ background: color, py: '90px', px: 0 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: 'center',
                            color: '#fff',
                            '& > svg': {
                                width: 52,
                                height: 52
                            }
                        }}
                        align="center"
                    >
                        <SentimentSatisfiedAltIcon />
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <CustomerSatisfactionCard />
                </Grid>
            </Grid>
        </Card>
    );
};

export default SideIconCard;
