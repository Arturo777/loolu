import React from 'react';

export default function SpecificationComponent() {
    return <div>SpecificationComponent</div>;
}

// import React, { useEffect, useState } from 'react';

// // mui imports
// import { Typography, Box, Stack, IconButton, SelectChangeEvent, Button, useTheme } from '@mui/material';
// import SaveIcon from '@mui/icons-material/Save';
// import CloseIcon from '@mui/icons-material/Close';

// // third-party imports
// import { useIntl } from 'react-intl';

// // project imports
// import { useDispatch } from 'store';
// import { openSnackbar } from 'store/slices/snackbar';
// import { updateFacetVariant } from 'store/slices/catalog';

// // types
// import { FacetType, SpecificationsType, SpecificationGroupMode, SpecificationValueDataType } from 'types/catalog';
// import SpecValuesForm, { newSpecificationType } from './SpecValuesForm';
// import AttributesForm from './AttributesForm';
// import { NewSpecificationType, FieldTypeType } from './CustomTypes';

// type SpecificationFormProps = {
//     specificationToEdit: NewSpecificationType | null;
//     handleCancel: () => void;
//     categoryId: number;
//     show: boolean;
//     mode: 'EDIT' | 'ADD';
//     facet?: FacetType | null;
//     // groupId?: number;
//     handleSuccesFetch: () => void;
//     groupInfo?: { id: number; name: string };
// };

// export default function SpecificationForm({
//     specificationToEdit,
//     handleCancel,
//     categoryId,
//     show,
//     mode,
//     facet,
//     // groupId,
//     handleSuccesFetch,
//     groupInfo
// }: SpecificationFormProps) {
//     // hooks
//     const intl = useIntl();
//     const dispatch = useDispatch();
//     const theme = useTheme();

//     // vars
//     const [specData, setSpecData] = useState<NewSpecificationType>();
//     const [newValues, setNewValues] = useState<newSpecificationType[]>([]);
//     const [updating, setUpdating] = useState<boolean>(false);
//     const [specTypeMode, setSpecTypeMode] = useState<SpecificationGroupMode>(SpecificationGroupMode.PRODUCT);

//     useEffect(() => {
//         if (specData?.fieldTypeId === '1') {
//             setNewValues([]);
//         }
//     }, [specData?.fieldTypeId]);

//     useEffect(() => {
//         if (specificationToEdit) {
//             setSpecData(specificationToEdit);
//         } else {
//             const defaultData: NewSpecificationType = createDefaultData(categoryId, groupInfo?.id ?? null);
//             setSpecData(defaultData);
//         }
//     }, [categoryId, specificationToEdit, groupInfo]);

//     const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (specData) {
//             setSpecData({ ...specData, [event.target.name]: event.target.checked });
//         }
//     };

//     const onchangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (specData) {
//             const { name, value } = e.target;
//             setSpecData({ ...specData, [name]: value });
//         }
//     };

//     const handleChangeSelect = (event: SelectChangeEvent) => {
//         if (specData && event.target.name === 'fieldTypeId') {
//             setSpecData({ ...specData, [event.target.name]: event.target.value });
//         }
//         if (specData && event.target.name === 'specTypeMode') {
//             setSpecTypeMode(event.target.value as SpecificationGroupMode);
//         }
//     };

//     const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
//         e.preventDefault();

//         const specificationValues: { specificationValueId: number; isActive: boolean; name: string }[] = [
//             ...(specData?.specificationValues.map((item) => ({
//                 specificationValueId: item.specificationValueId,
//                 isActive: item.isActive,
//                 name: item.name
//             })) ?? []),
//             ...newValues.map((item) => ({ specificationValueId: 0, isActive: item.isActive, name: item.name }))
//         ];

//         if (mode === 'ADD') {
//             console.log(specificationToEdit, specData);
//             if (specificationToEdit == null || specData == null) return;
//             const toSaveData = generateCreateData({
//                 specificationToEdit,
//                 groupId: groupInfo?.id ?? null,
//                 specType: specTypeMode,
//                 specData,
//                 specificationValues
//             });

//             console.log(specData);
//             console.log(toSaveData);

//             return;
//             // eslint-disable-next-line no-unreachable
//             dispatch(updateFacetVariant({ idMerchant: 1, data: toSaveData }))
//                 .then(({ payload }) => {
//                     if (payload.status === 'Success') {
//                         dispatch(
//                             openSnackbar({
//                                 open: true,
//                                 message: 'Creado correctamente',
//                                 variant: 'alert',
//                                 alert: {
//                                     color: 'success'
//                                 },
//                                 close: true
//                             })
//                         );
//                     } else {
//                         dispatch(
//                             openSnackbar({
//                                 open: true,
//                                 message: 'Error al crear',
//                                 variant: 'alert',
//                                 alert: {
//                                     color: 'error'
//                                 },
//                                 close: true
//                             })
//                         );
//                     }
//                 })
//                 .then(() => {
//                     setUpdating(false);
//                 })
//                 .finally(() => {
//                     handleSuccesFetch();
//                 });
//             // eslint-disable-next-line no-else-return
//         } else if (mode === 'EDIT') {
//             // EDIT

//             if (specificationToEdit == null || specData == null) return;
//             const toSaveData = generatUpdateData({
//                 specificationToEdit,
//                 groupId: groupInfo?.id ?? null,
//                 specType: specTypeMode,
//                 specData,
//                 specificationValues
//             });

//             dispatch(updateFacetVariant({ idMerchant: 1, data: toSaveData }))
//                 .then(({ payload }) => {
//                     if (payload.status === 'Success') {
//                         dispatch(
//                             openSnackbar({
//                                 open: true,
//                                 message: 'Actualizado correctamente',
//                                 variant: 'alert',
//                                 alert: {
//                                     color: 'success'
//                                 },
//                                 close: true
//                             })
//                         );
//                     } else {
//                         dispatch(
//                             openSnackbar({
//                                 open: true,
//                                 message: 'Error al actualizar',
//                                 variant: 'alert',
//                                 alert: {
//                                     color: 'error'
//                                 },
//                                 close: true
//                             })
//                         );
//                     }
//                 })
//                 .then(() => {
//                     setUpdating(false);
//                 })
//                 .finally(() => {
//                     handleSuccesFetch();
//                 });
//         } else {
//             setUpdating(false);
//         }
//     };

//     const handleAddValues = (values: newSpecificationType[]) => {
//         setNewValues([...values]);
//     };

//     const handleUpdateCurrentValues = (data: SpecificationValueDataType[]) => {
//         if (specData) {
//             setSpecData({ ...specData, specificationValues: data });
//         }
//     };

//     if (!show) {
//         return null;
//     }

//     return (
//         <Box sx={{ pl: 2, pr: 2, pb: 8, width: 1 }} component="form" onSubmit={handleSubmit}>
//             <Stack direction="row" alignItems="center" justifyContent="space-between">
//                 <Typography variant="h4">
//                     {specificationToEdit?.name ??
//                         intl.formatMessage({
//                             id: 'add'
//                         })}
//                 </Typography>
//                 <IconButton size="small" onClick={handleCancel}>
//                     <CloseIcon />
//                 </IconButton>
//             </Stack>

//             <AttributesForm
//                 handleChangeSelect={handleChangeSelect}
//                 handleChangeSwitch={handleChangeSwitch}
//                 mode={mode}
//                 specData={specData}
//                 onchangeText={onchangeText}
//                 specTypeMode={specTypeMode}
//             />

//             {specData?.fieldTypeId !== 1 && (
//                 <SpecValuesForm
//                     handleUpdateCurrent={handleUpdateCurrentValues}
//                     specification={specificationToEdit!}
//                     handleAddValues={handleAddValues}
//                 />
//             )}

//             {/* SAVE BUTTON */}

//             <Stack sx={{ ...saveButtonContainer, background: theme.palette.background.default }} direction="row">
//                 <Button
//                     disabled={updating}
//                     onClick={handleCancel}
//                     variant="outlined"
//                     startIcon={<CloseIcon />}
//                     color="error"
//                     sx={{ mr: 2 }}
//                 >
//                     {intl.formatMessage({ id: 'cancel' })}
//                 </Button>
//                 <Button disabled={updating} startIcon={<SaveIcon />} variant="outlined" type="submit">
//                     {intl.formatMessage({ id: 'save' })}
//                 </Button>
//             </Stack>
//         </Box>
//     );
// }

// const dynamicWidth = {
//     xs: 1,
//     md: 0.9,
//     lg: 480
// };

// const saveButtonContainer = {
//     width: dynamicWidth,
//     position: 'fixed',
//     bottom: 0,
//     right: 0,
//     p: 1,
//     borderTop: 1,
//     borderTopColor: 'rgba(100,100,100,0.3)',
//     justifyContent: 'flex-end',
//     pr: 4,
//     zIndex: 5
// };

// const createDefaultData = (categoryId: number, groupId: number | null): NewSpecificationType => ({
//     categoryId,
//     // specificationId: "0",
//     description: '',
//     fieldTypeId: '11111',
//     fieldTypeName: '',
//     groupId: 0, //
//     groupName: '',
//     isActive: false,
//     isStockKeepingUnit: false,
//     isFilter: false,
//     isOnProductDetails: false,
//     isRequired: false,
//     isSideMenuLinkActive: false,
//     isTopMenuLinkActive: false,
//     // isVtexSync: false,
//     name: '',
//     position: 0,
//     rawSpecId: 1,
//     vtexFieldId: 1,
//     specificationValues: []
// });

// type createUpdateDataProps = {
//     specData: NewSpecificationType | SpecificationsType;
//     specificationToEdit: SpecificationsType;
//     groupId: number | null;
//     specType: SpecificationGroupMode;
//     specificationValues: { specificationValueId: number; isActive: boolean; name: string }[];
// };

// const generatUpdateData = ({ specificationToEdit, groupId, specType, specData, specificationValues }: createUpdateDataProps) => [
//     {
//         categoryId: 0,
//         specificationGroups: [
//             {
//                 name: specificationToEdit?.groupName,
//                 groupId,
//                 [specType === SpecificationGroupMode.SKU ? 'skuSpecs' : 'prodSpecs']: [
//                     {
//                         __typename: 'SpecificactionValue',
//                         categoryId: 0,
//                         description: specData?.description,
//                         fieldTypeId: specData?.fieldTypeId,
//                         fieldTypeName: specificationType.find((item) => Number(item.value) === specData?.fieldTypeId)?.label ?? '',
//                         groupId,
//                         isActive: specData?.isActive,
//                         isOnProductDetails: specData?.isOnProductDetails,
//                         isRequired: specData?.isRequired,
//                         isSideMenuLinkActive: specData?.isSideMenuLinkActive,
//                         isStockKeepingUnit: specData?.isStockKeepingUnit,
//                         isTopMenuLinkActive: specData?.isTopMenuLinkActive,
//                         isVtexSync: specData?.isVtexSync,
//                         name: specificationToEdit?.name ?? 'NAME',
//                         rawSpecId: specificationToEdit?.rawSpecId,
//                         specificationId: specData?.specificationId,
//                         specificationValues
//                     }
//                 ]
//             }
//         ]
//     }
// ];

// const generateCreateData = ({ specificationToEdit, groupId, specType, specData, specificationValues }: createUpdateDataProps) => [
//     {
//         categoryId: 0,
//         specificationGroups: [
//             {
//                 name: specificationToEdit?.groupName,
//                 groupId,
//                 [specType === SpecificationGroupMode.SKU ? 'skuSpecs' : 'prodSpecs']: [
//                     {
//                         __typename: 'SpecificactionValue',
//                         categoryId: 0,
//                         description: specData?.description,
//                         fieldTypeId: specData?.fieldTypeId,
//                         fieldTypeName: specificationType.find((item) => Number(item.value) === specData?.fieldTypeId)?.label ?? '',
//                         groupId,
//                         isActive: specData?.isActive,
//                         isOnProductDetails: specData?.isOnProductDetails,
//                         isRequired: specData?.isRequired,
//                         isSideMenuLinkActive: specData?.isSideMenuLinkActive,
//                         isStockKeepingUnit: specData?.isStockKeepingUnit,
//                         isTopMenuLinkActive: specData?.isTopMenuLinkActive,
//                         isVtexSync: specData?.isVtexSync,
//                         name: specificationToEdit?.name ?? 'NAME',
//                         rawSpecId: specificationToEdit?.rawSpecId,
//                         specificationId: specData?.specificationId,
//                         specificationValues
//                     }
//                 ]
//             }
//         ]
//     }
// ];
