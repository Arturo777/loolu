import React, { useState, useEffect } from 'react';

// mui imports
import { Typography, Box, Stack, IconButton, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

// third-party imports
import { useIntl } from 'react-intl';
import { CategoryType, SpecificationGroupMode, SpecificationsType, SpecificationValueDataType } from 'types/catalog';
import { defaultAttributes, SpecificationAttributesType, getSpecificationAttributes, NewSpecificationValueType } from './CustomTypes';
import AttributesForm from './AttributesForm';
import SpecValuesForm from './SpecValuesForm';
import { useDispatch } from 'store';
import { updateFacetVariant } from 'store/slices/catalog';

type EditFormProps = {
    handleCancel: () => void;
    specificationData: SpecificationsType;
    specificationGroupMode: SpecificationGroupMode;
    category: CategoryType;
    handleSuccesFetch: () => void;
};

export default function EditFormComponent({
    handleCancel,
    specificationData,
    specificationGroupMode,
    category,
    handleSuccesFetch
}: EditFormProps) {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();

    // conts and vars
    const [updating, setUpdating] = useState<boolean>(false);

    const [specificationAttributes, setSpecificationAttributes] = useState<SpecificationAttributesType>(defaultAttributes);

    // specification values
    const [newValuesList, setNewValuesList] = useState<NewSpecificationValueType[]>([]);
    const [currentValues, setCurrentValues] = useState<SpecificationValueDataType[]>([]);

    useEffect(() => {
        console.log(JSON.parse(updateDa));
    }, []);

    useEffect(() => {
        if (specificationData) {
            setSpecificationAttributes(getSpecificationAttributes(specificationData));
            setCurrentValues(specificationData.specificationValues);
        }
    }, [specificationData]);

    const handleAddValues = (values: NewSpecificationValueType[]) => {
        setNewValuesList([...values]);
    };

    const handleUpdateCurrentValues = (values: SpecificationValueDataType[]) => {
        setCurrentValues(values);
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUpdating(true);

        const specValuesList: { isActive: boolean; name: string; specificationValueId: number }[] = [
            ...newValuesList.map((itemA) => ({ ...itemA, specificationValueId: 0 })),
            ...currentValues.map((itemA) => ({
                name: itemA.name,
                isActive: itemA.isActive,
                specificationValueId: itemA.specificationValueId
            }))
        ];

        const objectData: generateDataProps = {
            specificationAttributes,
            categoryId: category.id,
            specificationGroupMode,
            specificationData,
            specificationValues: specValuesList
        };

        const toSaveData = generateData(objectData);

        console.log(JSON.parse(updateDa));

        console.log('-_---');

        console.log(toSaveData);

        dispatch(updateFacetVariant({ idMerchant: 1, data: toSaveData })).finally(() => {
            setUpdating(false);
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
                        id: 'edit'
                    })}
                </Typography>
                <IconButton size="small" onClick={handleCancel}>
                    <CloseIcon />
                </IconButton>
            </Stack>

            {/* BODy */}

            <AttributesForm
                handleUpdate={setSpecificationAttributes}
                mode="EDIT"
                specificationAttributes={specificationAttributes}
                specTypeMode={specificationGroupMode}
            />

            <SpecValuesForm
                currentValues={currentValues}
                handleAddValues={handleAddValues}
                handleUpdateCurrent={handleUpdateCurrentValues}
            />

            {/* FOOTER - SAVE BUTTON */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 10,
                    pr: 3,
                    pb: 2
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
    specificationData: SpecificationsType; // without changes
    specificationAttributes: SpecificationAttributesType;
    categoryId: number | string;
    specificationGroupMode: SpecificationGroupMode;
    specificationValues: { isActive: boolean; name: string; specificationValueId: number }[];
};

const generateData = ({
    specificationAttributes,
    categoryId,
    specificationData,
    specificationGroupMode,
    specificationValues
}: generateDataProps) => [
    {
        categoryId,
        specificationGroups: [
            {
                name: specificationData.groupName,
                groupId: specificationData.groupId,
                [specificationGroupMode === SpecificationGroupMode.SKU ? 'skuSpecs' : 'prodSpecs']: [
                    {
                        __typename: 'SpecificactionValue',
                        categoryId,
                        description: specificationAttributes.description,
                        fieldTypeId: specificationAttributes.fieldTypeId,
                        fieldTypeName: specificationAttributes.fieldTypeName,
                        groupId: specificationData.groupId,
                        isActive: specificationAttributes.isActive,
                        isOnProductDetails: specificationAttributes.isOnProductDetails,
                        isRequired: specificationAttributes.isRequired,
                        isSideMenuLinkActive: specificationAttributes.isSideMenuLinkActive,
                        isStockKeepingUnit: specificationAttributes.isStockKeepingUnit,
                        isTopMenuLinkActive: specificationAttributes.isTopMenuLinkActive,
                        isVtexSync: specificationData.isVtexSync,
                        name: specificationData.name,
                        rawSpecId: specificationData.rawSpecId,
                        specificationId: specificationData.specificationId,
                        specificationValues
                    }
                ]
            }
        ]
    }
];

const updateDa =
    '[{"categoryId":0,"specificationGroups":[{"name":"Retail","groupId":248,"prodSpecs":[{"__typename":"SpecificactionValue","specificationId":3987,"rawSpecId":443,"name":"nuevoFacetInformation","fieldTypeName":"Checkbox","groupId":248,"description":"Facet type","position":1,"isRequired":false,"isActive":true,"isSideMenuLinkActive":false,"isTopMenuLinkActive":false,"isOnProductDetails":false,"isStockKeepingUnit":false,"categoryId":0,"specificationValues":[{"specificationValueId":4294,"isActive":true,"name":"valor a"},{"specificationValueId":4295,"isActive":true,"name":"valor b"},{"specificationValueId":4298,"isActive":true,"name":"valor 1"},{"specificationValueId":4299,"isActive":true,"name":"valor 2"},{"specificationValueId":0,"isActive":true,"name":"ds"}],"facetList":null}]}]}]';
