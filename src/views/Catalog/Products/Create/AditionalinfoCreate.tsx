import { Grid, Typography, Box, TextField } from '@mui/material';
import { useIntl } from 'react-intl';

const AditionalInfoCreate = ({ setProductInfo }: { setProductInfo: any }) => {
    // hooks
    const intl = useIntl();

    const handleChangeProd = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductInfo((prev: any) => ({ ...prev, [event.target.name]: event.target.value }));
    };
    return (
        <Grid container>
            <Grid item xs={12}>
                <Box
                    sx={{
                        '& .MuiTextField-root': { mt: 2 }
                    }}
                >
                    <TextField
                        fullWidth
                        multiline
                        id="outlined-basic"
                        label={intl.formatMessage({ id: 'description' })}
                        variant="outlined"
                        name="description"
                    />
                </Box>
            </Grid>
            <Grid item xs={12}>
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
                    />
                </Box>
            </Grid>
            <Grid item xs={12}>
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
                    />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box
                    sx={{
                        '& .MuiTextField-root': { mt: 2 }
                    }}
                >
                    <TextField fullWidth multiline id="outlined-basic" label="Keywords" variant="outlined" name="keyWords" />
                </Box>
            </Grid>
        </Grid>
    );
};

export default AditionalInfoCreate;
