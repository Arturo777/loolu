import React, { useEffect, useMemo, useState } from 'react';
import werehousesMulti from './mockupsProducts/werehouses';
import { Werehouse } from 'types/catalog';
import { Card, Grid, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { gridSpacing } from 'store/constant';

const ProductWerehouses = ({ merchs, namemerch }: any) => {
    /* const dispatch = useDispatch(); */
    const theme = useTheme();
    const wereMulti = werehousesMulti;
    const [werehouse, setWerehouse] = useState<Werehouse | null>(null);
    console.log('valor merch', merchs);

    /* useEffect(() => { */
    /* dispatch(getProduct(id)); */
    /*     console.log('merchsr', whs);
    }, [merchs, wereMulti.werehousesMulti]); */
    const whs = wereMulti?.werehousesMulti?.find(({ idMerchant }: any) => idMerchant === merchs);
    console.log('merchsr', whs);
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
