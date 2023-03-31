import { Grid, Typography, Box, TextField } from '@mui/material';
import { useIntl } from 'react-intl';
import { FieldEditingHolder } from 'ui-component/MultiMerchant/drawer';
import { InputType, SelectOptionType } from 'ui-component/MultiMerchant/MerchantsForm/InputComponent';

const Aditionalinfo = ({
    product,
    active,
    productInfo,
    setProductInfo,
    handleDrawer
}: {
    product: any;
    active: boolean;
    productInfo: any;
    setProductInfo: any;
    handleDrawer: (options: {
        accessor: string;
        intlLabel: string;
        data?: { [key: string]: any }[];
        options?: null | SelectOptionType[];
        type: InputType;
    }) => void;
}) => {
    // hooks
    const intl = useIntl();

    const handleChangeProd = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductInfo((prev: any) => ({ ...prev, [event.target.name]: event.target.value }));
    };
    return (
        <Grid container>
            <Grid item xs={12}>
                {active ? (
                    <FieldEditingHolder
                        onEditClick={() =>
                            handleDrawer({ accessor: 'descriptionShort', intlLabel: 'short_description', type: InputType.textarea })
                        }
                    >
                        <TextField
                            fullWidth
                            multiline
                            id="outlined-basic"
                            label={intl.formatMessage({ id: 'short_description' })}
                            variant="outlined"
                            name="descriptionShort"
                            // defaultValue={product?.descriptionShort}
                            value={productInfo?.descriptionShort}
                            onChange={handleChangeProd}
                        />
                    </FieldEditingHolder>
                ) : (
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        <Typography variant="h4">{intl.formatMessage({ id: 'short_description' })}:</Typography> {product?.descriptionShort}
                    </Typography>
                )}
            </Grid>
            <Grid item xs={12}>
                {active ? (
                    <FieldEditingHolder
                        sx={{ mt: 3 }}
                        onEditClick={() =>
                            handleDrawer({ accessor: 'metaTagDescription', intlLabel: 'metatag_description', type: InputType.textarea })
                        }
                    >
                        <TextField
                            fullWidth
                            multiline
                            id="outlined-basic"
                            label={intl.formatMessage({ id: 'metatag_description' })}
                            variant="outlined"
                            name="metaTagDescription"
                            // defaultValue={product?.metaTagDescription}
                            value={productInfo?.metaTagDescription}
                            onChange={handleChangeProd}
                        />
                    </FieldEditingHolder>
                ) : (
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        <Typography variant="h4" component="span">
                            {intl.formatMessage({ id: 'metatag_description' })}:
                        </Typography>{' '}
                        {product?.metaTagDescription}
                    </Typography>
                )}
            </Grid>
            <Grid item xs={12}>
                {active ? (
                    <FieldEditingHolder
                        sx={{ mt: 3 }}
                        onEditClick={() => handleDrawer({ accessor: 'keyWords', intlLabel: 'key_words', type: InputType.textarea })}
                    >
                        <TextField
                            fullWidth
                            multiline
                            id="outlined-basic"
                            label="Keywords"
                            variant="outlined"
                            name="keyWords"
                            // defaultValue={product?.keyWords}
                            value={productInfo?.keyWords}
                            onChange={handleChangeProd}
                        />
                    </FieldEditingHolder>
                ) : (
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        <Typography variant="h4" component="span">
                            Keywords:
                        </Typography>{' '}
                        {product?.keyWords}
                    </Typography>
                )}
            </Grid>
        </Grid>
    );
};

export default Aditionalinfo;
