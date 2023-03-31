import { Grid, Typography, Box, TextField } from '@mui/material';
import { useIntl } from 'react-intl';

const Aditionalinfo = ({
    product,
    active,
    productInfo,
    setProductInfo
}: {
    product: any;
    active: boolean;
    productInfo: any;
    setProductInfo: any;
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
                    <Box
                        sx={{
                            '& .MuiTextField-root': { mt: 2 }
                        }}
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
                    </Box>
                ) : (
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        <Typography variant="h4">{intl.formatMessage({ id: 'short_description' })}:</Typography> {product?.descriptionShort}
                    </Typography>
                )}
            </Grid>
            <Grid item xs={12}>
                {active ? (
                    <Box
                        sx={{
                            '& .MuiTextField-root': { mt: 2 }
                        }}
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
                    </Box>
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
                    <Box
                        sx={{
                            '& .MuiTextField-root': { mt: 2 }
                        }}
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
                    </Box>
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
