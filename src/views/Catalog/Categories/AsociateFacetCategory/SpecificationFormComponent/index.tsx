import React, { useEffect, useState } from 'react';

// mui imports
import {
    FormControlLabel,
    FormGroup,
    Switch,
    Typography,
    Grid,
    Box,
    Stack,
    IconButton,
    TextField,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
    MenuItem,
    Button
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

// third-party imports
import { useIntl } from 'react-intl';

// project imports
import { useDispatch } from 'store';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slices/snackbar';
import { updateFacetVariant } from 'store/slices/catalog';

// types
import { FacetType, SpecificationsType, SpecificationValuesType, SpecificationValueDataType } from 'types/catalog';
import SpecValuesForm, { newSpecificationType } from './SpecValuesForm';

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
    groupInfo?: { id: number; name: string };
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
    handleSuccesFetch,
    groupInfo
}: SpecificationFormProps) {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();

    // vars
    const [specData, setSpecData] = useState<SpecificationsType>();
    const [newValues, setNewValues] = useState<newSpecificationType[]>([]);
    const [updating, setUpdating] = useState<boolean>(false);

    useEffect(() => {
        if (specData?.fieldTypeId === 1) {
            setNewValues([]);
        }
    }, [specData?.fieldTypeId]);

    useEffect(() => {
        if (specificationToEdit) {
            setSpecData(specificationToEdit);
        } else {
            const defaultData: SpecificationsType = createDefaultData(categoryId, groupId);
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

        setUpdating(true);

        if (mode === 'ADD') {
            if (specificationToEdit == null || specData == null) return;
            const toSaveData = generateCreateData({ specificationToEdit, groupId, specType, specData, specificationValues });

            dispatch(updateFacetVariant({ idMerchant: 1, data: toSaveData }))
                .then(({ payload }) => {
                    if (payload.status === 'Success') {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'Creado correctamente',
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
                                message: 'Error al crear',
                                variant: 'alert',
                                alert: {
                                    color: 'error'
                                },
                                close: true
                            })
                        );
                    }
                })
                .then(() => {
                    setUpdating(false);
                })
                .finally(() => {
                    handleSuccesFetch();
                });
        } else if (mode === 'EDIT') {
            // EDIT

            if (specificationToEdit == null || specData == null) return;
            const toSaveData = generatUpdateData({ specificationToEdit, groupId, specType, specData, specificationValues });

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
                .then(() => {
                    setUpdating(false);
                })
                .finally(() => {
                    handleSuccesFetch();
                });
        } else {
            setUpdating(false);
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
                <SpecValuesForm
                    handleUpdateCurrent={handleUpdateCurrentValues}
                    specification={specificationToEdit!}
                    handleAddValues={handleAddValues}
                />
            )}

            {/* SAVE BUTTON */}

            <Stack sx={saveButtonContainer} direction="row">
                <Button
                    disabled={updating}
                    onClick={handleCancel}
                    variant="outlined"
                    startIcon={<CloseIcon />}
                    color="error"
                    sx={{ mr: 2 }}
                >
                    Cancelar
                </Button>
                <Button disabled={updating} startIcon={<SaveIcon />} variant="outlined" type="submit">
                    Guardar
                </Button>
            </Stack>
        </Box>
    );
}

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

const createDefaultData = (categoryId: number, groupId: number): SpecificationsType => ({
    categoryId,
    specificationId: 0,
    description: '',
    fieldTypeId: 11111,
    fieldTypeName: '',
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
});

type createUpdateDataProps = {
    specData: SpecificationsType;
    specificationToEdit: SpecificationsType;
    groupId: number;
    specType: SpecificationValuesType;
    specificationValues: { specificationValueId: number; isActive: boolean; name: string }[];
};

const generatUpdateData = ({ specificationToEdit, groupId, specType, specData, specificationValues }: createUpdateDataProps) => [
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
                        fieldTypeName: specificationType.find((item) => Number(item.value) === specData?.fieldTypeId)?.label ?? '',
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

const generateCreateData = ({ specificationToEdit, groupId, specType, specData, specificationValues }: createUpdateDataProps) => [
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
                        fieldTypeName: specificationType.find((item) => Number(item.value) === specData?.fieldTypeId)?.label ?? '',
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
