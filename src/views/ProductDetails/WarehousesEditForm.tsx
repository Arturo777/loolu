import React, { useEffect, useState } from 'react';

// mui imports
import { Card, Grid, Stack, TextField, Typography } from '@mui/material';

// third party importd
import { useIntl } from 'react-intl';

// project imports
import { useSelector } from 'store';

// types & constants
import { Werehouses, WerehousesMulticatalog } from 'types/e-commerce';
import { gridSpacing } from 'store/constant';

export default function WarehousesEditForm({ merchantId, warehouses }: { merchantId: number; warehouses: WerehousesMulticatalog[] }) {
    // hhoks
    const intl = useIntl();

    // store
    const { merchants } = useSelector((state) => state.auth);

    // data
    const [merchantWarehouses, setMerchantWarehouses] = useState<Werehouses[]>([]);

    const [merchantName, setMerchantName] = useState<string>('');

    useEffect(() => {
        if (merchants) {
            const currentMerchant = merchants.find((item) => item.merchantId === merchantId);

            setMerchantName(currentMerchant?.name ?? '');
        }
    }, [merchantId, merchants]);

    useEffect(() => {
        if (merchantId && warehouses) {
            const filteredMerchant = warehouses.find((item) => item.idMerchant === merchantId);

            if (filteredMerchant) {
                setMerchantWarehouses(filteredMerchant.warehouses);
            }
        }
    }, [merchantId, warehouses]);

    return (
        <Card sx={{ p: 2, borderRadius: 0 }}>
            <Typography variant="h3" component="p" sx={{ mb: 2 }}>
                {intl.formatMessage(
                    {
                        id: 'merchant_inventories'
                    },
                    {
                        merchant: merchantName
                    }
                )}
            </Typography>

            <Grid container spacing={gridSpacing} sx={{ mb: 3 }}>
                {merchantWarehouses &&
                    merchantWarehouses.map((item) => (
                        <Grid item xs={12} md={3} lg={3} xl={2}>
                            <TextField
                                label={intl.formatMessage({ id: 'warehouse_stock' }, { warehouse: item.warehouse })}
                                placeholder="11"
                                fullWidth
                            />
                        </Grid>
                    ))}
            </Grid>
        </Card>
    );
}

// // third party imports
// import { useIntl } from 'react-intl';

// // project imports
// import Specification from '../../ui-component/Specification';
// import Aditionalinfo from './AditionalInfo';
// import Accordion from 'ui-component/extended/Accordion';
// import AdditionalFields from './AdditionalFields';
// import { InputType, SelectOptionType } from 'ui-component/MultiMerchant/MerchantsForm/InputComponent';

// // ==============================|| PRODUCT DETAILS - DESCRIPTION ||============================== //

// const WarehousesEditForm = ({
//     product,
//     active,
//     productInfo,
//     setProductInfo,
//     handleDrawer,
//     showMulti
// }: {
//     product: any;
//     active: boolean;
//     productInfo: any;
//     setProductInfo: any;
//     showMulti: boolean;
//     handleDrawer: (options: {
//         accessor: string;
//         intlLabel: string;
//         data?: { [key: string]: any }[];
//         options?: null | SelectOptionType[];
//         type: InputType;
//     }) => void;
// }) => {
//     // hooks
//     const intl = useIntl();

//     // accordion data
//     const descriptionData = [
//         {
//             id: 'basic1',
//             defaultExpand: true,
//             title: 'Product Aditional Info',
//             content: (
//                 <Aditionalinfo
//                     showMulti={showMulti}
//                     handleDrawer={handleDrawer}
//                     product={product}
//                     productInfo={productInfo}
//                     setProductInfo={setProductInfo}
//                     active={active}
//                 />
//             )
//         },
//         {
//             id: 'basic2',
//             title: 'Specifications',
//             content: <Specification productInfo={productInfo} setProductInfo={setProductInfo} active={active} merchantMulti={null} />
//         },
//         {
//             id: 'basic3',
//             title: intl.formatMessage({
//                 id: 'additional_fields'
//             }),
//             content: <AdditionalFields />
//         }
//     ];
//     return <Accordion data={descriptionData} />;
// };

// export default WarehousesEditForm;
