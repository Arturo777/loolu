import React from 'react';
import { Card, Grid, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { gridSpacing } from 'store/constant';

const ProductWerehouses = ({ merchs, namemerch, werehouses }: any) => {
    const theme = useTheme();

    const whs = werehouses.find(({ idMerchant }: any) => idMerchant === merchs);
    return (
        <Card
            sx={{
                p: 3,
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.grey[100],
                '&:hover': {
                    border: `1px solid${theme.palette.primary.main}`
                }
            }}
        >
            <Typography variant="h3" sx={{ mb: 2 }}>
                Inventories {namemerch}
            </Typography>
            <Card
                sx={{
                    p: 3,
                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.grey[100],
                    '&:hover': {
                        border: `1px solid${theme.palette.primary.main}`
                    }
                }}
            >
                <Grid container spacing={gridSpacing}>
                    {whs?.warehouses?.map((element: any) => (
                        <Grid item xs={6}>
                            <Typography variant="h4">Werehouse {element.warehouse}</Typography>
                            <TextField id="outlined-basic" label="Werehouse" variant="outlined" name="werehouse" />
                        </Grid>
                    ))}
                </Grid>
            </Card>
        </Card>
    );
};

export default ProductWerehouses;
