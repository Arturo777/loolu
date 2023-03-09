// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, SvgIconTypeMap, Typography, useMediaQuery } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { GenericCardProps } from 'types';
import { Historial } from 'types/e-commerce';

interface SideIconCardProps extends GenericCardProps {
    iconPrimary: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
    secondarySub?: string;
    bgcolor?: string;
    history: Historial;
}

// =============================|| SIDE ICON CARD ||============================= //

const StepApproval = ({ iconPrimary, primary, secondary, secondarySub, color, bgcolor, history }: SideIconCardProps) => {
    const theme = useTheme();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary !== undefined ? <IconPrimary /> : null;

    const formateoFecha = (date: string) => {
        let fecha = [];
        let hora = [];
        fecha = date.split('T');
        const fecha2 = fecha[0].split('-').reverse().join('/');
        hora = fecha[1].split('.');
        return fecha2;
    };

    return (
        <Card sx={{ bgcolor: bgcolor || '', position: 'relative' }}>
            <Grid container justifyContent="space-between" alignItems="center">
                {history?.rejectId !== null ? (
                    <>
                        <Grid item xs={9}>
                            <Grid
                                container
                                direction="column"
                                justifyContent="space-between"
                                spacing={1}
                                alignItems={matchDownXs ? 'center' : 'flex-start'}
                            >
                                <Grid item sm={12}>
                                    <Typography variant="h4" align="left" sx={{ color: bgcolor ? '#fff' : '', ml: 1, mb: -1 }}>
                                        Rejected
                                    </Typography>
                                </Grid>
                                <Grid item sm={12}>
                                    <Typography variant="body2" align="left" sx={{ color: bgcolor ? '#fff' : '', ml: 1 }}>
                                        {history.approvalStatusName}
                                    </Typography>
                                </Grid>
                                <Grid item sm={12}>
                                    <Typography variant="body2" align="left" sx={{ color: bgcolor ? '#fff' : '', ml: 1 }}>
                                        {history?.rejectReason}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography align="left" variant="caption" sx={{ color: bgcolor ? '#fff' : '', ml: 1 }}>
                                        {formateoFecha(history.dateCreate)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3} sx={{ background: color, py: 5.5, px: 0 }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    textAlign: 'center',
                                    color: '#fff',
                                    '& > svg': {
                                        width: 32,
                                        height: 32
                                    }
                                }}
                                align="center"
                            >
                                {primaryIcon}
                            </Typography>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid item xs={3} sx={{ background: color, py: 3.5, px: 0 }}>
                            <Typography
                                variant="h2"
                                sx={{
                                    textAlign: 'center',
                                    color: '#fff',
                                    '& > svg': {
                                        width: 32,
                                        height: 32
                                    }
                                }}
                                align="center"
                            >
                                {primaryIcon}
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Grid
                                container
                                direction="column"
                                justifyContent="space-between"
                                spacing={1}
                                alignItems={matchDownXs ? 'center' : 'flex-start'}
                            >
                                <Grid item sm={12}>
                                    <Typography variant="h4" sx={{ color: bgcolor ? '#fff' : '', ml: 2, mb: -1 }}>
                                        Accepted
                                    </Typography>
                                </Grid>
                                <Grid item sm={12}>
                                    <Typography variant="body2" sx={{ color: bgcolor ? '#fff' : '', ml: 2 }}>
                                        {history.approvalStatusName}
                                    </Typography>
                                </Grid>
                                <Grid item sm={12}>
                                    <Typography variant="body2" align="left" sx={{ color: bgcolor ? '#fff' : 'grey.700', ml: 2 }}>
                                        {secondary} <span style={{ color }}>{secondarySub}</span>{' '}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography align="left" variant="caption" sx={{ color: bgcolor ? '#fff' : '', ml: 2 }}>
                                        {formateoFecha(history.dateCreate)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Grid>
        </Card>
    );
};

export default StepApproval;
