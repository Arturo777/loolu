import React, { useState } from 'react';

// mui imports
import { Typography, Box, Stack, IconButton, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

// third-party imports
import { useIntl } from 'react-intl';

// project imports
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import SearchFacetsComponent from '../SearchFacetsComponent';
import { updateFacetVariant } from 'store/slices/catalog';

// components
import ToAddForm from './ToAddFormData';
import SpecValuesForm from './SpecValuesForm';
import AttributesForm from './AttributesForm';

// types
import { CategoryType, FacetType, SpecificationGroupMode, SpecificationGroupType, SpecificationValueDataType } from 'types/catalog';
import { NewSpecificationValueType, newValueListToCurrentList, SpecificationAttributesType, defaultAttributes } from './CustomTypes';

type AssociateFormComponentProps = {
    handleCancel: () => void;
    handleSuccesFetch: () => void;
    specificationGroups: SpecificationGroupType[];
    category: CategoryType;
    canCancel: boolean;
};

type groupInfoType = {
    groupId: string;
    groupName: string;
    specificationGroupMode: SpecificationGroupMode;
};

export default function AddFormComponent({
    handleCancel,
    handleSuccesFetch,
    specificationGroups,
    category,
    canCancel
}: AssociateFormComponentProps) {
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
                {canCancel && (
                    <IconButton size="small" onClick={handleCancel}>
                        <CloseIcon />
                    </IconButton>
                )}
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

type generateDataProps = {
    categoryId: number | string;
    groupInfo: groupInfoType;
    specificationAttributes: SpecificationAttributesType;
    facetData: FacetType;
    specificationValues: SpecificationValueDataType[];
};

const generateData = ({ categoryId, groupInfo, specificationAttributes, facetData, specificationValues }: generateDataProps) => {
    const keyTypeName = groupInfo.specificationGroupMode === SpecificationGroupMode.SKU ? 'skuSpecs' : 'prodSpecs';

    return [
        {
            categoryId,
            specificationGroups: [
                {
                    name: groupInfo.groupName,
                    groupId: groupInfo.groupId === 'NEW' ? 0 : groupInfo.groupId,
                    [keyTypeName]: [
                        {
                            categoryId,
                            description: specificationAttributes.description,
                            groupId: groupInfo.groupId === 'NEW' ? 0 : groupInfo.groupId,
                            // attributes
                            fieldTypeId: Number(specificationAttributes.fieldTypeId),
                            fieldTypeName: specificationAttributes.fieldTypeName,
                            isActive: specificationAttributes.isActive,
                            isOnProductDetails: specificationAttributes.isOnProductDetails,
                            isRequired: specificationAttributes.isRequired,
                            isSideMenuLinkActive: specificationAttributes.isSideMenuLinkActive,
                            isStockKeepingUnit: specificationAttributes.isStockKeepingUnit,
                            isTopMenuLinkActive: specificationAttributes.isTopMenuLinkActive,
                            // facet info
                            name: facetData.name,
                            specificationId: 0,
                            rawSpecId: facetData?.id,
                            specificationValues
                        }
                    ]
                }
            ]
        }
    ];
};
