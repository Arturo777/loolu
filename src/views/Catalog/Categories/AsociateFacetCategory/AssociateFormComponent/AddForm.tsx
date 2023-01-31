import React, { useState } from 'react';

// mui imports
import { Typography, Box, Stack, IconButton, Button, SelectChangeEvent } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

// third-party imports
import { useIntl } from 'react-intl';

// project imports
import SearchFacetsComponent from '../SearchFacetsComponent';
import { FacetType, SpecificationGroupMode, SpecificationGroupType, SpecificationValueDataType } from 'types/catalog';
import ToAddForm from '../SpecificationFormComponent/ToAddForm';
import { NewSpecificationType } from '../SpecificationFormComponent/CustomTypes';
import AttributesForm from '../SpecificationFormComponent/AttributesForm';
import SpecValuesForm, { NewSpecificationValueType } from '../SpecificationFormComponent/SpecValuesForm';
// import AttributesForm from '../SpecificationFormComponent/AttributesForm';
// import SpecValuesForm from '../SpecificationFormComponent/SpecValuesForm';

type AssociateFormComponentProps = {
    handleCancel: () => void;
    handleSuccesFetch: () => void;
    specificationGroups: SpecificationGroupType[];
};

export default function AddFormComponent({ handleCancel, handleSuccesFetch, specificationGroups }: AssociateFormComponentProps) {
    // hooks
    const intl = useIntl();
    // const theme = useTheme();

    // consts and vars
    const [updating, setUpdating] = useState<boolean>(false);
    const [specificationGroupMode, setSpecificationGroupMode] = useState<SpecificationGroupMode>(SpecificationGroupMode.PRODUCT);
    const [newSpecificationData, setNewSpecificationData] = useState<NewSpecificationType>(defaultValues);
    const [facetData, setFacetData] = useState<FacetType | null>(null);

    // specification values
    const [newValuesList, setNewValuesList] = useState<NewSpecificationValueType[]>([]);
    const [currentValuesList, setCurrentValuesList] = useState<SpecificationValueDataType[]>([]);

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setUpdating(true);

        console.log(newValuesList);

        handleSuccesFetch();
    };

    const chooseFacet = (chosenFacet: FacetType | null) => {
        console.log(chosenFacet);
        setFacetData(chosenFacet);
    };

    const handleChangeSelect = (event: SelectChangeEvent) => {
        if (event.target.name === 'specificationGroupMode') {
            setSpecificationGroupMode(event.target.value as SpecificationGroupMode);
        }
    };

    const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewSpecificationData((prevData) => ({ ...prevData, [event.target.name]: event.target.checked }));
    };

    const onchangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSpecificationData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };

    const handleAddValues = (values: NewSpecificationValueType[]) => {
        setNewValuesList([...values]);
    };

    const handleUpdateCurrentValues = (data: SpecificationValueDataType[]) => {
        setCurrentValuesList((prevData) => ({ ...prevData, ...data }));
    };

    return (
        <Box
            sx={{
                pl: 2,
                pr: 2,
                pb: 8,
                width: 1
                // position: 'relative',
                // height: '100vh'
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
                    specificationGroupMode={specificationGroupMode}
                    handleChangeSelect={handleChangeSelect}
                />

                <Box sx={{ mt: 4 }} />

                <AttributesForm
                    handleChangeSelect={handleChangeSelect}
                    handleChangeSwitch={handleChangeSwitch}
                    mode="ADD"
                    specData={newSpecificationData}
                    onchangeText={onchangeText}
                    specTypeMode={specificationGroupMode}
                />

                {newSpecificationData?.fieldTypeId !== '1' && (
                    <SpecValuesForm
                        handleUpdateCurrent={handleUpdateCurrentValues}
                        currentValues={currentValuesList}
                        handleAddValues={handleAddValues}
                    />
                )}
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
                    {intl.formatMessage({ id: 'save' })}
                </Button>
            </Box>
        </Box>
    );
}

const defaultValues: NewSpecificationType = {
    name: '',
    categoryId: 0,
    description: '',
    fieldTypeId: '',
    fieldTypeName: '',
    groupId: 0,
    groupName: '',
    isActive: false,
    isFilter: false,
    isOnProductDetails: false,
    isRequired: false,
    isSideMenuLinkActive: false,
    isStockKeepingUnit: false,
    isTopMenuLinkActive: false,
    specificationValues: []
};

// const dynamicWidth = {
//     xs: 1,
//     md: 0.9,
//     lg: 480
// };

// const saveButtonContainer = {
//     // width: dynamicWidth,
//     // position: 'fixed',
//     bottom: 0,
//     right: 0,
//     p: 1,
//     borderTop: 1,
//     borderTopColor: 'rgba(100,100,100,0.3)',
//     justifyContent: 'flex-end',
//     pr: 4,
//     zIndex: 5
// };
