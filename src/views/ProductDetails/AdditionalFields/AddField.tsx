import { useState } from 'react';

// mui imports
import { Grid, Typography, Card, Button, Divider, Stack, Collapse } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// third-party imports
import { useIntl } from 'react-intl';

// project imports
import { useDispatch } from 'store';
import { createAdditionalField } from 'store/slices/catalog';
import FormFieldComponent, { AdditionalFieldToEditType } from './FormField';

const NewFieldComponent = ({ show, handleSuccess, productId }: { productId: number; show: boolean; handleSuccess: () => void }) => {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();

    const [fieldData, setFieldData] = useState<AdditionalFieldToEditType>({
        value: '',
        field: ''
    });

    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setFieldData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!fieldData.field || !fieldData.value) return;

        setLoading(true);
        dispatch(
            createAdditionalField({
                data: {
                    merchantId: 1,
                    productId,
                    keyName: fieldData.field,
                    value: fieldData.value
                }
            })
        ).finally(() => {
            setFieldData({
                value: '',
                field: ''
            });
            handleSuccess();
            setLoading(false);
        });
    };

    if (!show) return null;

    return (
        <Collapse in={show}>
            <Card elevation={2} sx={{ p: 3 }}>
                <Stack mb={2} direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4">
                        {intl.formatMessage({
                            id: 'add_field'
                        })}
                    </Typography>
                </Stack>
                <Divider sx={{ mb: 3 }} />

                <Grid container justifyContent="flex-start" spacing={2}>
                    <FormFieldComponent handleChange={handleChange} data={fieldData} />

                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 2 }}>
                        <Button disabled={loading} onClick={handleSubmit} variant="outlined" startIcon={<AddIcon />}>
                            {intl.formatMessage({
                                id: 'add'
                            })}
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Collapse>
    );
};

export default NewFieldComponent;
