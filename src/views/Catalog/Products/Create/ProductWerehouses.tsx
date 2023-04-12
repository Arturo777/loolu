import React, { useEffect, useMemo, useState } from 'react';
import werehousesMulti from './mockupsProducts/werehouses';
import { Werehouse } from 'types/catalog';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';

const ProductWerehouses = ({ merchs }: any) => {
    /* const dispatch = useDispatch(); */
    const wereMulti = werehousesMulti;
    const [werehouse, setWerehouse] = useState<Werehouse | null>(null);

    /* useEffect(() => { */
    /* dispatch(getProduct(id)); */
    /*     console.log('merchsr', whs);
    }, [merchs, wereMulti.werehousesMulti]); */
    const whs = wereMulti?.werehousesMulti?.filter(({ idMerchant }: any) => idMerchant === merchs);
    console.log('merchsr', whs);
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                merchs
            </Grid>
        </Grid>
    );
};

export default ProductWerehouses;
