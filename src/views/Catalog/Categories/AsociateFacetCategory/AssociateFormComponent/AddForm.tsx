import React, { useState } from 'react';

// mui imports
import { Typography, Box, Stack, IconButton, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

// third-party imports
import { useIntl } from 'react-intl';

// project imports
import SearchFacetsComponent from '../SearchFacetsComponent';
import { useDispatch } from 'store';

// components
import ToAddForm from './ToAddFormData';
import SpecValuesForm from './SpecValuesForm';
import AttributesForm from './AttributesForm';

// types
import { CategoryType, FacetType, SpecificationGroupMode, SpecificationGroupType, SpecificationValueDataType } from 'types/catalog';
import { NewSpecificationValueType, newValueListToCurrentList, SpecificationAttributesType } from './CustomTypes';
import { updateFacetVariant } from 'store/slices/catalog';
import { openSnackbar } from 'store/slices/snackbar';

type AssociateFormComponentProps = {
    handleCancel: () => void;
    handleSuccesFetch: () => void;
    specificationGroups: SpecificationGroupType[];
    category: CategoryType;
};

type groupInfoType = {
    groupId: string;
    groupName: string;
    specificationGroupMode: SpecificationGroupMode;
};

export default function AddFormComponent({ handleCancel, handleSuccesFetch, specificationGroups, category }: AssociateFormComponentProps) {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();

    // consts and vars
    const [updating, setUpdating] = useState<boolean>(false);
    const [addToGroupInfo, setAddToGroupInfo] = useState<groupInfoType>();
    const [specificationAttributes, setSpecificationAttributes] = useState<SpecificationAttributesType>(defaultAttributes);

    const [facetData, setFacetData] = useState<FacetType | null>(null);

    // specification values
    const [newValuesList, setNewValuesList] = useState<NewSpecificationValueType[]>([]);

    const chooseFacet = (chosenFacet: FacetType | null) => {
        console.log(chosenFacet);
        setFacetData(chosenFacet);
    };

    const handleAddValues = (values: NewSpecificationValueType[]) => {
        setNewValuesList([...values]);
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!facetData) return;

        console.log({
            facetData: facetData!,
            categoryId: category.id,
            groupInfo: addToGroupInfo!,
            specificationAttributes,
            specificationValues: newValueListToCurrentList(newValuesList)
        });

        const toUpload = generateData({
            facetData: facetData!,
            categoryId: category.id,
            groupInfo: addToGroupInfo!,
            specificationAttributes,
            specificationValues: newValueListToCurrentList(newValuesList)
        });

        setUpdating(true);

        dispatch(updateFacetVariant({ idMerchant: 1, data: toUpload }))
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
    };

    return (
        <Box
            sx={{
                pl: 2,
                pr: 2,
                pb: 8,
                width: 1
            }}
            component="form"
            onSubmit={handleSubmit}
        >
            {/* HEADER */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h4">
                    {intl.formatMessage({
                        id: 'add'
                    })}
                </Typography>
                <IconButton size="small" onClick={handleCancel}>
                    <CloseIcon />
                </IconButton>
            </Stack>

            {/* BODY */}
            <Box sx={{}}>
                {/* SELECT FACET TO ASSOCIATE */}
                <SearchFacetsComponent handleAddFacet={chooseFacet} facetData={facetData} />

                <ToAddForm
                    specificationGroups={specificationGroups}
                    // specificationGroupMode={specificationGroupMode}
                    // handleChangeSelect={handleChangeSelect}
                    handleChangeData={setAddToGroupInfo}
                />

                <Box sx={{ mt: 4 }} />

                <AttributesForm
                    handleUpdate={setSpecificationAttributes}
                    mode="ADD"
                    specificationAttributes={specificationAttributes}
                    // onchangeText={onchangeText}
                    specTypeMode={addToGroupInfo?.specificationGroupMode ?? SpecificationGroupMode.PRODUCT}
                />

                {specificationAttributes?.fieldTypeId !== '1' && <SpecValuesForm handleAddValues={handleAddValues} />}
            </Box>

            {/* FOOTER - SAVE BUTTON */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 10,
                    pr: 3,
                    pb: 2
                    // width: '100%'
                    // boxSizing: 'border-box',
                    // background: theme.palette.background.default
                }}
            >
                <Button
                    disabled={updating}
                    onClick={handleCancel}
                    variant="contained"
                    startIcon={<CloseIcon />}
                    color="error"
                    sx={{ mr: 2 }}
                >
                    {intl.formatMessage({ id: 'cancel' })}
                </Button>
                <Button disabled={updating} startIcon={<SaveIcon />} variant="contained" type="submit">
                    {intl.formatMessage({ id: 'save' })}{' '}
                </Button>
            </Box>
        </Box>
    );
}

const defaultAttributes: SpecificationAttributesType = {
    description: '',
    fieldTypeId: '',
    fieldTypeName: '',
    isActive: false,
    isFilter: false,
    isOnProductDetails: false,
    isRequired: false,
    isSideMenuLinkActive: false,
    isStockKeepingUnit: false,
    isTopMenuLinkActive: false
};

type generateDataProps = {
    categoryId: number;
    groupInfo: groupInfoType;
    specificationAttributes: SpecificationAttributesType;
    facetData: FacetType;
    specificationValues: SpecificationValueDataType[];
};

const generateData = ({ categoryId, groupInfo, specificationAttributes, facetData, specificationValues }: generateDataProps) => {
    const keyTypeName = groupInfo.specificationGroupMode === SpecificationGroupMode.SKU ? 'skuSpecs' : 'prodSpecs';

    return [
        {
            category: categoryId,
            specificationGroups: [
                {
                    name: groupInfo.groupName,
                    groupId: groupInfo.groupId === 'NEW' ? 0 : groupInfo.groupId,
                    [keyTypeName]: {
                        categoryId,
                        groupId: groupInfo.groupId === 'NEW' ? 0 : groupInfo.groupId,
                        groupName: groupInfo.groupName,
                        // attributes
                        description: specificationAttributes.description,
                        fieldTypeId: specificationAttributes.fieldTypeId,
                        fieldTypeName: specificationAttributes.fieldTypeName,
                        isActive: specificationAttributes.isActive,
                        isOnProductDetails: specificationAttributes.isOnProductDetails,
                        isRequired: specificationAttributes.isRequired,
                        isSideMenuLinkActive: specificationAttributes.isSideMenuLinkActive,
                        isStockKeepingUnit: specificationAttributes.isStockKeepingUnit,
                        isTopMenuLinkActive: specificationAttributes.isTopMenuLinkActive,
                        isVtexSync: false,
                        // facet info
                        name: facetData.name,
                        specificationId: null,
                        rawSpecId: facetData?.id,
                        specificationValues
                        // specificationId: specData?.specificationId
                    }
                }
            ]
        }
    ];
};

// const generateCreateData = ({ specificationToEdit, groupId, specType, specData, specificationValues }: createUpdateDataProps) => [
// {
//     categoryId: 0,
//     specificationGroups: [
//         {
//             name: specificationToEdit?.groupName,
//             groupId,
//             [specType === SpecificationGroupMode.SKU ? 'skuSpecs' : 'prodSpecs']: [
//                 {
//                     __typename: 'SpecificactionValue',
//                     categoryId: 0,
//                     description: specData?.description,
//                     fieldTypeId: specData?.fieldTypeId,
//                     fieldTypeName: specificationType.find((item) => Number(item.value) === specData?.fieldTypeId)?.label ?? '',
//                     groupId,
//                     isActive: specData?.isActive,
//                     isOnProductDetails: specData?.isOnProductDetails,
//                     isRequired: specData?.isRequired,
//                     isSideMenuLinkActive: specData?.isSideMenuLinkActive,
//                     isStockKeepingUnit: specData?.isStockKeepingUnit,
//                     isTopMenuLinkActive: specData?.isTopMenuLinkActive,
//                     isVtexSync: specData?.isVtexSync,
//                     name: specificationToEdit?.name ?? 'NAME',
//                     rawSpecId: specificationToEdit?.rawSpecId,
//                     specificationId: specData?.specificationId,
//                     specificationValues
//                 }
//             ]
//         }
//     ]
// }
// ];

// const defaultValues: NewSpecificationType = {
//     name: '',
//     categoryId: 0,
//     description: '',
//     fieldTypeId: '',
//     fieldTypeName: '',
//     groupId: 0,
//     groupName: '',
//     isActive: false,
//     isFilter: false,
//     isOnProductDetails: false,
//     isRequired: false,
//     isSideMenuLinkActive: false,
//     isStockKeepingUnit: false,
//     isTopMenuLinkActive: false,
//     specificationValues: []
// };

// const fromQA =
//     '[{"categoryId":0,"specificationGroups":[{"name":"Retail","groupId":248,"skuSpecs":[{"__typename":"SpecificactionValue","specificationId":3959,"isVtexSync":true,"isRequired":false,"isActive":false,"isSideMenuLinkActive":true,"isTopMenuLinkActive":false,"isOnProductDetails":false,"isStockKeepingUnit":true,"fieldTypeName":"","description":"Facet type","rawSpecId":447,"groupId":248,"categoryId":0,"name":"nuevofacet04","specificationValues":[{"specificationValueId":4241,"isActive":true,"name":"Mode 1"}],"facetList":null}]}]}]';

// const createFormQA =
//     '[{"categoryId":0,"specificationGroups":[{"name":"Retail","groupId":248,"prodSpecs":[{"rawSpecId":443,"name":"nuevoFacetInformation","categoryId":0,"groupId":248,"groupName":"Retail","position":1,"specificationValues":[],"isVtexSync":false,"specificationId":null,"isRequired":false,"isActive":false,"isTopMenuLinkActive":false,"isSideMenuLinkActive":false,"isOnProductDetails":false,"fieldTypeId":"7","fieldTypeName":"Checkbox","description":"Facet type"}]}]}]';

// const creaValues =
//     '[{"categoryId":0,"specificationGroups":[{"name":"Retail","groupId":248,"prodSpecs":[{"__typename":"SpecificactionValue","specificationId":3987,"rawSpecId":443,"name":"nuevoFacetInformation","fieldTypeName":"Checkbox","groupId":248,"description":"Facet type","position":1,"isRequired":false,"isActive":false,"isSideMenuLinkActive":false,"isTopMenuLinkActive":false,"isOnProductDetails":false,"isStockKeepingUnit":false,"categoryId":0,"specificationValues":[{"specificationValueId":4294,"isActive":true,"name":"valor a"},{"specificationValueId":0,"isActive":true,"name":"valor b"}],"facetList":null}]}]}]';

// const createAndEdit =
//     '[{"categoryId":0,"specificationGroups":[{"name":"Retail","groupId":248,"prodSpecs":[{"__typename":"SpecificactionValue","specificationId":3987,"rawSpecId":443,"name":"nuevoFacetInformation","fieldTypeName":"Checkbox","groupId":248,"description":"Facet type","position":1,"isRequired":false,"isActive":false,"isSideMenuLinkActive":false,"isTopMenuLinkActive":false,"isOnProductDetails":false,"isStockKeepingUnit":false,"categoryId":0,"specificationValues":[{"specificationValueId":0,"isActive":true,"name":"valor a"}],"facetList":null}]}]}]';
