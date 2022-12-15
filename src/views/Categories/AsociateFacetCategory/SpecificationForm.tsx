import React, { useEffect, useState } from 'react';

// mui imports
import { FormControlLabel, FormGroup, Switch, Typography, Grid, Box, Stack, Divider, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// third-party imports
import { useIntl } from 'react-intl';

// project imports
import { gridSpacing } from 'store/constant';

// types
import { SpecificationsType } from 'types/catalogue';

type SpecificationFormProps = {
    specificationToEdit: SpecificationsType | null;
    handleCancel: () => void;
};

/* 

*/

export default function SpecificationForm({ specificationToEdit, handleCancel }: SpecificationFormProps) {
    // hooks
    const intl = useIntl();

    const [specData, setSpecData] = useState<SpecificationsType>();

    useEffect(() => {
        if (specificationToEdit) {
            setSpecData(specificationToEdit);
        }
    }, [specificationToEdit]);

    const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (specData) {
            setSpecData({ ...specData, [event.target.name]: event.target.checked });
        }
    };

    const onchangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (specData) {
            const { name, value } = e.target;
            setSpecData({ ...specData, [name]: value });
        }
    };

    if (!specificationToEdit) {
        return null;
    }

    return (
        <Box sx={{ pl: 2, pr: 2 }} component="form">
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">{specificationToEdit.name}</Typography>
                <IconButton size="small" onClick={handleCancel}>
                    <CloseIcon />
                </IconButton>
            </Stack>
            <Typography variant="subtitle1" mt={1}>
                Atributos
            </Typography>
            <Typography variant="body2" mb={2}>
                Selecciona atributos para la especificación
            </Typography>
            <Grid container spacing={gridSpacing} mt={1}>
                <Grid item xs={12} lg={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <FormGroup>
                        <FormControlLabel
                            sx={{ ml: 1 }}
                            labelPlacement="start"
                            control={<Switch onChange={handleChangeSwitch} checked={specData?.isActive} name="isActive" />}
                            label={intl.formatMessage({
                                id: 'active'
                            })}
                        />
                    </FormGroup>
                </Grid>

                <Grid item xs={12} lg={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <FormGroup>
                        <FormControlLabel
                            sx={{ ml: 1 }}
                            labelPlacement="start"
                            control={
                                <Switch onChange={handleChangeSwitch} checked={specData?.isOnProductDetails} name="isOnProductDetails" />
                            }
                            label={intl.formatMessage({
                                id: 'product_details'
                            })}
                        />
                    </FormGroup>
                </Grid>

                <Grid item xs={12} lg={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <FormGroup>
                        <FormControlLabel
                            sx={{ ml: 1 }}
                            labelPlacement="start"
                            control={<Switch onChange={handleChangeSwitch} checked={specData?.isRequired} name="isRequired" />}
                            label={intl.formatMessage({
                                id: 'required'
                            })}
                        />
                    </FormGroup>
                </Grid>

                <Grid item xs={12} lg={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <FormGroup>
                        <FormControlLabel
                            sx={{ ml: 1 }}
                            labelPlacement="start"
                            control={<Switch onChange={handleChangeSwitch} checked={specData?.isFilter} name="isFilter" />}
                            label={intl.formatMessage({
                                id: 'search_filter'
                            })}
                        />
                    </FormGroup>
                </Grid>

                <Grid item xs={12} lg={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <FormGroup>
                        <FormControlLabel
                            sx={{ ml: 1 }}
                            labelPlacement="start"
                            control={
                                <Switch onChange={handleChangeSwitch} checked={specData?.isTopMenuLinkActive} name="isTopMenuLinkActive" />
                            }
                            label={intl.formatMessage({
                                id: 'top_menu'
                            })}
                        />
                    </FormGroup>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <TextField
                        sx={{ ml: 1 }}
                        label={intl.formatMessage({
                            id: 'type'
                        })}
                        size="small"
                        name="fieldTypeName"
                        value={specData?.fieldTypeName}
                        InputProps={{ readOnly: true }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ ml: 1 }}
                        label={intl.formatMessage({
                            id: 'description'
                        })}
                        size="small"
                        name="description"
                        value={specData?.description}
                        onChange={onchangeText}
                    />
                </Grid>
            </Grid>
            <Box sx={{ mt: 2, mb: 2 }}>
                <Divider />
            </Box>
            <Typography variant="subtitle1" mt={1}>
                Valores
            </Typography>
            <Typography variant="body2" mb={2}>
                Agrega valores para la especificación
            </Typography>
        </Box>
    );
}
