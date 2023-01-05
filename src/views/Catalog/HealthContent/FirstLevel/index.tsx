import React, { useState } from 'react';
import { Card, CardHeader, Grid } from '@mui/material';
import GaugeChart from 'react-gauge-chart';

const FirstLevel = () => {
    const [first, setfirst] = useState('');
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Card sx={{ width: '100%', height: '60vh' }}>
                        <CardHeader title="Estatus Actual de la Tienda" subheader="September 14, 2016" />
                        <GaugeChart
                            id="gauge-chart5"
                            nrOfLevels={420}
                            arcsLength={[0.3, 0.5, 0.2]}
                            colors={['#5BE12C', '#F5CD19', '#EA4228']}
                            percent={0.37}
                            arcPadding={0.02}
                        />
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ width: '100%' }}>Imagenes Totale</Card>
                    <Card sx={{ width: '100%' }}>Productos Totales</Card>
                    <Card sx={{ width: '100%' }}>SKU Totales</Card>
                    <Card sx={{ width: '100%' }}>Ultima Actualización</Card>
                </Grid>
            </Grid>
        </>
    );
};

export default FirstLevel;
