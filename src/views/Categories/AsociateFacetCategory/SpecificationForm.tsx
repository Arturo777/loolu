import React, { KeyboardEvent, useEffect, useState } from 'react';

// mui imports
import {
    FormControlLabel,
    FormGroup,
    Switch,
    Typography,
    Grid,
    Box,
    Stack,
    Divider,
    IconButton,
    TextField,
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
    MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddBoxIcon from '@mui/icons-material/AddBox';

// third-party imports
import { useIntl } from 'react-intl';

// project imports
import { gridSpacing } from 'store/constant';

// types
import { SpecificationsType, SpecificationValuesType } from 'types/catalogue';

type SpecificationFormProps = {
    specificationToEdit: SpecificationsType | null;
    handleCancel: () => void;
    categoryId: number;
    show: boolean;
    edit: boolean;
};

export default function SpecificationForm({ specificationToEdit, handleCancel, categoryId, show, edit }: SpecificationFormProps) {
    // hooks
    const intl = useIntl();

    // vars
    const [specData, setSpecData] = useState<SpecificationsType>();

    useEffect(() => {
        console.log(show);
    }, [show]);

    useEffect(() => {
        if (specificationToEdit) {
            setSpecData(specificationToEdit);
        } else {
            const defaultData: SpecificationsType = {
                categoryId,
                specificationId: 0,

                description: '',
                fieldTypeId: 1,
                fieldTypeName: '',
                // todo => select groupd id
                groupId: 1, //
                groupName: '',
                isActive: false,
                isStockKeepingUnit: false,
                isFilter: false,
                isOnProductDetails: false,
                isRequired: false,
                isSideMenuLinkActive: false,
                isTopMenuLinkActive: false,
                isVtexSync: false,
                name: '',
                position: 0,
                rawSpecId: 1,
                vtexFieldId: 1,
                specificationValues: []
            };
            setSpecData(defaultData);
        }
    }, [categoryId, specificationToEdit]);

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

    const handleChangeSelect = (event: SelectChangeEvent) => {
        if (specData) {
            setSpecData({ ...specData, [event.target.name]: Number(event.target.value) ?? 1 });
        }
    };

    if (!show) {
        console.log('SHOW:', show);
        return null;
    }

    return (
        <Box sx={{ pl: 2, pr: 2, pb: 8, width: 1 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">{specificationToEdit?.name ?? 'ADD'}</Typography>
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
                    <FormControl fullWidth>
                        <InputLabel id="select-country-label">
                            {intl.formatMessage({
                                id: 'show_mode'
                            })}
                        </InputLabel>
                        <Select
                            labelId="select-category-label"
                            id="select-category"
                            value={`${specData?.fieldTypeId}`}
                            label={intl.formatMessage({
                                id: 'show_mode'
                            })}
                            onChange={handleChangeSelect}
                            name="fieldTypeId"
                            required
                            disabled={!edit}
                        >
                            {specificationType.map((item: { [key: string]: any }, index: number) => (
                                <MenuItem key={`selected-item-${index}`} value={item.value}>
                                    <Typography>{item.label}</Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
            {specificationToEdit?.fieldTypeId !== 1 && <RenderValues specification={specificationToEdit!} />}
        </Box>
    );
}
type RenderValuesProps = {
    specification: SpecificationsType;
};

const RenderValues = ({ specification }: RenderValuesProps) => {
    const [newValue, setNewValue] = useState<string>('');
    const [newSpecs, setNewSpecs] = useState<string[]>([]);

    const onchangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewValue(e.target.value);
    };

    const addSpec = () => {
        setNewSpecs([...newSpecs, newValue]);
        setNewValue('');
    };

    const handleEnter = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            addSpec();
        }
    };

    return (
        <Box>
            <Box sx={{ mt: 2, mb: 2 }}>
                <Divider />
            </Box>
            <Typography variant="subtitle1" mt={1}>
                Valores
            </Typography>
            <Typography variant="body2" mb={2}>
                Agrega valores para la especificación
            </Typography>
            <Stack mb={3} direction="row">
                <TextField
                    onKeyDown={handleEnter}
                    size="small"
                    name="newVal"
                    value={newValue}
                    label="Nuevo valor"
                    onChange={onchangeText}
                    fullWidth
                />
                <IconButton color="primary" disabled={newValue.length === 0} onClick={addSpec}>
                    <AddBoxIcon />
                </IconButton>
            </Stack>

            {newSpecs.map((newSpec, index) => (
                <Stack direction="row" mb={2} key={`new-specs-values-list-${index}`}>
                    <Checkbox defaultChecked />
                    <TextField size="small" name={`${index}`} value={newSpec} fullWidth />
                </Stack>
            ))}

            {specification?.specificationValues.map((specValue) => (
                <Stack direction="row" mb={2} key={`specs-values-list-${specValue.specificationValueId}`}>
                    <Checkbox defaultChecked />
                    <TextField size="small" name={`${specValue.specificationValueId}`} value={specValue.name} fullWidth />
                </Stack>
            ))}
        </Box>
    );
};

const specificationType: { [key: string]: any } = [
    {
        value: '1',
        label: 'Texto',
        hide: [SpecificationValuesType.SKU]
    },
    {
        value: '7',
        label: 'Checkbox',
        hide: [SpecificationValuesType.SKU]
    },
    {
        value: '5',
        label: 'Combo',
        hide: []
    },
    {
        value: '6',
        label: 'Radio',
        hide: []
    }
];

/*




 <option value="0" disabled>
                                Selecciona
                              </option>
                              {currentSpecificationType !== 'skuSpecs' && (
                                <>
                                  <option value="1" title="Texto">
                                    Texto
                                  </option>
                                  <option value="7" title="Checkbox">
                                    Checkbox
                                  </option>
                                </>
                              )}
                              <option value="5" title="Combo">
                                Combo
                              </option>
                              <option value="6" title="Radio">
                                Radio
                              </option>

*/
