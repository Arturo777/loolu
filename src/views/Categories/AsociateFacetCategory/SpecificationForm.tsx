import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

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
    MenuItem,
    Button
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import AddBoxIcon from '@mui/icons-material/AddBox';

// third-party imports
import { useIntl } from 'react-intl';

// project imports
import { gridSpacing } from 'store/constant';

// types
import { FacetType, SpecificationsType, SpecificationValuesType, SpecificationValueDataType } from 'types/catalogue';
import { updateFacetVariant } from 'store/slices/catalogue';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';

type SpecificationFormProps = {
    specificationToEdit: SpecificationsType | null;
    handleCancel: () => void;
    categoryId: number;
    show: boolean;
    mode: 'EDIT' | 'ADD';
    specType: SpecificationValuesType;
    facet?: FacetType | null;
    groupId: number;
    handleSuccesFetch: () => void;
};

type newSpecificationType = {
    name: string;
    isActive: boolean;
};

export default function SpecificationForm({
    specificationToEdit,
    handleCancel,
    categoryId,
    show,
    mode,
    specType,
    facet,
    groupId,
    handleSuccesFetch
}: SpecificationFormProps) {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();

    // vars
    const [specData, setSpecData] = useState<SpecificationsType>();
    const [newValues, setNewValues] = useState<newSpecificationType[]>([]);

    useEffect(() => {
        if (specData?.fieldTypeId === 1) {
            setNewValues([]);
        }
    }, [specData?.fieldTypeId]);

    useEffect(() => {
        if (specificationToEdit) {
            setSpecData(specificationToEdit);
        } else {
            const defaultData: SpecificationsType = {
                categoryId,
                specificationId: 0,
                description: '',
                fieldTypeId: 11111,
                fieldTypeName: '',
                // todo => select groupd id
                groupId, //
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
    }, [categoryId, specificationToEdit, specType, groupId]);

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

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const specificationValues: { specificationValueId: number; isActive: boolean; name: string }[] = [
            ...(specData?.specificationValues.map((item) => ({
                specificationValueId: item.specificationValueId,
                isActive: item.isActive,
                name: item.name
            })) ?? []),
            ...newValues.map((item) => ({ specificationValueId: 0, isActive: item.isActive, name: item.name }))
        ];

        console.log(facet, specificationToEdit, categoryId);

        if (mode === 'ADD') {
            const toSaveData = [
                {
                    categoryId,
                    specificationGroups: [
                        {
                            name: specData?.name,
                            groupId,
                            [specType === SpecificationValuesType.SKU ? 'skuSpecs' : 'prodSpecs']: [
                                {
                                    __typename: 'SpecificactionValue',
                                    fieldTypeId: specData?.fieldTypeId,
                                    fieldTypeName:
                                        specificationType.find((item) => Number(item.value) === specData?.fieldTypeId)?.label ?? '',
                                    description: specData?.description,
                                    categoryId,
                                    facetList: null,
                                    name: facet?.name,
                                    specificationValues,
                                    groupId,
                                    specificationId: 0,
                                    isVtexSync: specData?.isVtexSync,
                                    isRequired: specData?.isRequired,
                                    isActive: specData?.isActive,
                                    isSideMenuLinkActive: specData?.isSideMenuLinkActive,
                                    isTopMenuLinkActive: specData?.isTopMenuLinkActive,
                                    isOnProductDetails: specData?.isOnProductDetails,
                                    isStockKeepingUnit: specData?.isStockKeepingUnit,
                                    rawSpecId: mode === 'ADD' ? facet?.id : specificationToEdit?.specificationId,
                                    position: 1
                                }
                            ]
                        }
                    ]
                }
            ];

            console.log(JSON.stringify(toSaveData));
            // dispatch(updateFacetVariant({ idMerchant: 1, data: toSaveData })).then((resp) => {
            //     console.log('creae', resp);
            // });
        } else {
            console.log('EDIT');
            // EDIT
            const toSaveData = [
                {
                    categoryId: 0,
                    specificationGroups: [
                        {
                            name: specificationToEdit?.groupName,
                            groupId,
                            [specType === SpecificationValuesType.SKU ? 'skuSpecs' : 'prodSpecs']: [
                                {
                                    __typename: 'SpecificactionValue',
                                    categoryId: 0,
                                    description: specData?.description,
                                    fieldTypeId: specData?.fieldTypeId,
                                    fieldTypeName:
                                        specificationType.find((item) => Number(item.value) === specData?.fieldTypeId)?.label ?? '',
                                    groupId,
                                    isActive: specData?.isActive,
                                    isOnProductDetails: specData?.isOnProductDetails,
                                    isRequired: specData?.isRequired,
                                    isSideMenuLinkActive: specData?.isSideMenuLinkActive,
                                    isStockKeepingUnit: specData?.isStockKeepingUnit,
                                    isTopMenuLinkActive: specData?.isTopMenuLinkActive,
                                    isVtexSync: specData?.isVtexSync,
                                    name: specificationToEdit?.name ?? 'NAME',
                                    rawSpecId: specificationToEdit?.rawSpecId,
                                    specificationId: specData?.specificationId,
                                    specificationValues
                                }
                            ]
                        }
                    ]
                }
            ];

            console.log(JSON.stringify(toSaveData));
            dispatch(updateFacetVariant({ idMerchant: 1, data: toSaveData }))
                .then(({ payload }) => {
                    if (payload.status === 'Success') {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'Actualizado correctamente',
                                variant: 'alert',
                                alert: {
                                    color: 'success'
                                },
                                close: true
                            })
                        );
                    } else {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'Error al actualizar',
                                variant: 'alert',
                                alert: {
                                    color: 'error'
                                },
                                close: true
                            })
                        );
                    }
                })
                .finally(() => {
                    handleSuccesFetch();
                });
        }
    };

    const handleAddValues = (values: newSpecificationType[]) => {
        setNewValues([...values]);
    };

    const handleUpdateCurrentValues = (data: SpecificationValueDataType[]) => {
        if (specData) {
            setSpecData({ ...specData, specificationValues: data });
        }
    };

    if (!show) {
        return null;
    }

    return (
        <Box sx={{ pl: 2, pr: 2, pb: 8, width: 1 }} component="form" onSubmit={handleSubmit}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">
                    {specificationToEdit?.name ??
                        intl.formatMessage({
                            id: 'add'
                        })}
                </Typography>
                <IconButton size="small" onClick={handleCancel}>
                    <CloseIcon />
                </IconButton>
            </Stack>
            <Typography variant="subtitle1" mt={1}>
                {intl.formatMessage({ id: 'attributes' })}
            </Typography>
            <Typography variant="body2" mb={2}>
                {intl.formatMessage({ id: 'select_attributes' })}
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
                            value={`${specData?.fieldTypeId === 11111 ? '' : specData?.fieldTypeId}`}
                            label={intl.formatMessage({
                                id: 'show_mode'
                            })}
                            onChange={handleChangeSelect}
                            name="fieldTypeId"
                            required
                            disabled={mode === 'EDIT'}
                        >
                            {mode === 'EDIT' && (
                                <MenuItem key={`selected-item-${specData?.fieldTypeId ?? 1}`} value={specData?.fieldTypeId}>
                                    <Typography>{specData?.fieldTypeName}</Typography>
                                </MenuItem>
                            )}
                            {mode === 'ADD' &&
                                specificationType
                                    .filter((item) => item.hide.indexOf(specType))
                                    .map((item: { [key: string]: any }, index: number) => (
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
                        sx={{ ml: { xs: 0, md: 1 } }}
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

            {specData?.fieldTypeId !== 1 && (
                <RenderValues
                    handleUpdateCurrent={handleUpdateCurrentValues}
                    specification={specificationToEdit!}
                    handleAddValues={handleAddValues}
                />
            )}

            {/* SAVE BUTTON */}

            <Stack sx={saveButtonContainer} direction="row">
                <Button onClick={handleCancel} variant="outlined" startIcon={<CloseIcon />} color="error" sx={{ mr: 2 }}>
                    Cancelar
                </Button>
                <Button startIcon={<SaveIcon />} variant="outlined" type="submit">
                    Guardar
                </Button>
            </Stack>
        </Box>
    );
}
type RenderValuesProps = {
    specification: SpecificationsType;
    handleAddValues: (value: newSpecificationType[]) => void;
    handleUpdateCurrent: (data: SpecificationValueDataType[]) => void;
};

const RenderValues = ({ specification, handleAddValues, handleUpdateCurrent }: RenderValuesProps) => {
    // hooks
    const intl = useIntl();

    // vars
    const [newValue, setNewValue] = useState<string>('');
    const [newSpecs, setNewSpecs] = useState<newSpecificationType[]>([]);

    const [currentValues, setCurrentValues] = useState<SpecificationValueDataType[]>();

    useEffect(() => {
        handleUpdateCurrent(currentValues ?? []);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentValues]);

    useEffect(() => {
        if (specification && specification.specificationValues) {
            console.log(specification.specificationValues);
            setCurrentValues(specification.specificationValues);
        }
    }, [specification]);

    useEffect(() => {
        handleAddValues(newSpecs);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newSpecs]);

    const onchangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewValue(e.target.value);
    };

    const addSpec = () => {
        setNewSpecs([...newSpecs, { name: newValue, isActive: true }]);
        setNewValue('');
    };

    const handleToggleActiveNew = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        const i = Number(name.replace('new-value-', ''));

        const updatedSpecs = newSpecs.map((item, y) => {
            if (i === y) {
                return { ...item, isActive: checked };
            }
            return item;
        });

        setNewSpecs(updatedSpecs);
    };

    const handleToggleActiveCurrent = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        const id = Number(name.replace('current-values-', ''));
        const isActive = checked;

        if (currentValues) {
            const news = currentValues?.map((item) => {
                if (item.specificationValueId === id) {
                    return { ...item, isActive };
                }

                return item;
            });
            setCurrentValues(news);
        }
    };

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const id = Number(name.replace('current-values-name-', ''));

        if (currentValues) {
            const news = currentValues?.map((item) => {
                if (item.specificationValueId === id) {
                    return { ...item, name: value };
                }

                return item;
            });
            setCurrentValues(news);
        }
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
                {intl.formatMessage({ id: 'values' })}
            </Typography>
            <Typography variant="body2" mb={2}>
                {intl.formatMessage({ id: 'add_values' })}
            </Typography>
            <Stack mb={3} direction="row">
                <TextField
                    onKeyDown={handleEnter}
                    size="small"
                    name="newVal"
                    value={newValue}
                    label={intl.formatMessage({
                        id: 'new_value'
                    })}
                    onChange={onchangeText}
                    fullWidth
                />
                <IconButton size="small" color="primary" disabled={newValue.length === 0} onClick={addSpec}>
                    <AddBoxIcon />
                </IconButton>
            </Stack>

            {newSpecs.map((newSpec, index) => (
                <Stack direction="row" mb={2} key={`new-specs-values-list-${index}`}>
                    <Checkbox onChange={handleToggleActiveNew} name={`new-value-${index}`} checked={newSpec.isActive} />
                    <TextField size="small" name={`${index}`} value={newSpec.name} fullWidth />
                </Stack>
            ))}

            {currentValues &&
                currentValues.map((specValue) => (
                    <Stack direction="row" mb={2} key={`specs-values-list-${specValue.specificationValueId}`}>
                        <Checkbox
                            size="small"
                            onChange={handleToggleActiveCurrent}
                            name={`current-values-${specValue.specificationValueId}`}
                            checked={specValue.isActive}
                        />
                        <TextField
                            size="small"
                            onChange={handleChangeValue}
                            name={`current-values-name-${specValue.specificationValueId}`}
                            value={specValue.name}
                            fullWidth
                        />
                    </Stack>
                ))}
        </Box>
    );
};

type specificationTypeOption = {
    value: string;
    label: string;
    hide: SpecificationValuesType[];
};

const specificationType: specificationTypeOption[] = [
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

const dynamicWidth = {
    xs: 1,
    md: 0.9,
    lg: 480
};

const saveButtonContainer = {
    width: dynamicWidth,
    position: 'fixed',
    bottom: 0,
    right: 0,
    p: 1,
    borderTop: 1,
    borderTopColor: 'rgba(100,100,100,0.3)',
    justifyContent: 'flex-end',
    background: 'white',
    zIndex: 5
};

// ADD

const editStyk = [
    {
        categoryId: 0,
        specificationGroups: [
            {
                name: 'Retail',
                groupId: 248,
                skuSpecs: [
                    {
                        __typename: 'SpecificactionValue',
                        categoryId: 0,
                        description: 'prueba large text',
                        facetList: null,
                        fieldTypeId: 0,
                        fieldTypeName: 'Combo',
                        groupId: 248,
                        isActive: false,
                        isOnProductDetails: false,
                        isRequired: false,
                        isSideMenuLinkActive: true,
                        isStockKeepingUnit: true,
                        isTopMenuLinkActive: true,
                        isVtexSync: false,
                        name: 'NuevoFacetCat1',
                        rawSpecId: 444,
                        specificationId: 3957,
                        specificationValues: [
                            { specificationValueId: 4225, isActive: true, name: 'prueba sku' },
                            { specificationValueId: 4226, isActive: false, name: 'prueba sku 2' },
                            { specificationValueId: 4227, isActive: true, name: '22' }
                        ]
                    }
                ]
            }
        ]
    }
];

const edit = [
    {
        categoryId: 0,
        specificationGroups: [
            {
                name: 'Retail',
                groupId: 248,
                skuSpecs: [
                    {
                        __typename: 'SpecificactionValue',
                        categoryId: 0,
                        description: 'prueba large text',
                        facetList: null,
                        fieldTypeId: 5,
                        fieldTypeName: 'Combo',
                        groupId: 248,
                        isActive: false,
                        isOnProductDetails: false,
                        isRequired: false,
                        isSideMenuLinkActive: true,
                        isStockKeepingUnit: true,
                        isTopMenuLinkActive: true,
                        isVtexSync: false,
                        name: 'NuevoFacetCat1',
                        rawSpecId: 444,
                        specificationId: 3957,
                        specificationValues: [
                            { specificationValueId: 4225, isActive: true, name: 'prueba sku' },
                            { specificationValueId: 4226, isActive: true, name: 'prueba sku 2' },
                            { specificationValueId: 4227, isActive: true, name: '22' }
                        ]
                    }
                ]
            }
        ]
    }
];
