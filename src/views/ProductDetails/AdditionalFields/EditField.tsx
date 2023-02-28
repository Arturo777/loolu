import React, { useEffect, useState } from 'react';

// mui imports
import { Grid, Typography, Card, Button, Divider, Stack, Collapse, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CloseIcon from '@mui/icons-material/Close';

// third-party imports
import { useIntl } from 'react-intl';

// project imports
import { useDispatch } from 'store';
import { AdditionalFieldType } from 'types/catalog';
import FormFieldComponent, { AdditionalFieldToEditType } from './FormField';
import { editAdditionalField } from 'store/slices/catalog';

const EditFieldComponent = ({
    show,
    fieldToEdit,
    onCancel,
    handleSuccess,
    productId
}: {
    show: boolean;
    onCancel: () => void;
    fieldToEdit: AdditionalFieldType | null;
    handleSuccess: () => void;
    productId: number;
}) => {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();

    const [fieldData, setFieldData] = useState<AdditionalFieldToEditType>({
        value: '',
        field: ''
    });

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (fieldToEdit) {
            setFieldData(fieldToEdit);
        }
    }, [fieldToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setFieldData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        console.log('EDIT');

        if (!fieldData.field || !fieldData.value) return;

        setLoading(true);
        dispatch(
            editAdditionalField({
                data: {
                    merchantId: 1,
                    id: fieldToEdit?.id ?? 1,
                    productId,
                    keyName: fieldData.field,
                    value: fieldData.value
                }
            })
        ).finally(() => {
            onCancel();
            handleSuccess();
            setLoading(false);
        });
    };

    if (!fieldToEdit) return null;

    return (
        <Collapse in={show}>
            <Card elevation={2} sx={{ p: 2 }}>
                <Stack mb={2} direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4">
                        {intl.formatMessage({
                            id: 'edit_field'
                        })}
                    </Typography>
                    <IconButton onClick={onCancel} sx={{ color: 'divider' }}>
                        <CloseOutlinedIcon />
                    </IconButton>
                </Stack>
                <Divider sx={{ mb: 3 }} />

                <Grid container justifyContent="flex-start" spacing={2}>
                    <FormFieldComponent handleChange={handleChange} data={fieldData} />

                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 2 }}>
                        <Button onClick={onCancel} variant="outlined" color="error" sx={{ mr: 2 }} startIcon={<CloseIcon />}>
                            {intl.formatMessage({ id: 'cancel' })}
                        </Button>

                        <Button disabled={loading} onClick={handleSubmit} variant="outlined" startIcon={<AddIcon />}>
                            {intl.formatMessage({
                                id: 'update'
                            })}
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Collapse>
    );
};

export default EditFieldComponent;
