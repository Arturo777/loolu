import React from 'react';

// mui imports
import {
    FormControlLabel,
    FormGroup,
    Switch,
    Typography,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent
} from '@mui/material';

// third-party imports
import { useIntl } from 'react-intl';

// project imports
import { gridSpacing } from 'store/constant';

// types
import { SpecificationGroupMode } from 'types/catalog';
import { specificationFieldTypes, SpecificationAttributesType } from './CustomTypes';

type AttributesFormProps = {
    mode: 'EDIT' | 'ADD';
    specTypeMode: SpecificationGroupMode;
    specificationAttributes?: SpecificationAttributesType;
    handleUpdate: React.Dispatch<React.SetStateAction<SpecificationAttributesType>>;
};

export default function AttributesForm({
    // handleChangeSelect,
    // handleChangeSwitch,
    // onchangeText,
    specificationAttributes,
    mode,
    specTypeMode,
    handleUpdate
}: AttributesFormProps) {
    // hooks
    const intl = useIntl();

    const handleChangeSelect = (event: SelectChangeEvent) => {
        const { name, value } = event.target;

        handleUpdate((prevData) => ({ ...prevData, [name]: value }));

        if (name === 'fieldTypeId' && specificationFieldTypes) {
            const searchField = specificationFieldTypes.find((item) => item.value === value);
            if (searchField) {
                handleUpdate((prevData) => ({ ...prevData, fieldTypeName: searchField?.label }));
            }
        }
    };

    const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleUpdate((prevData) => ({ ...prevData, [event.target.name]: event.target.checked }));
    };

    const onchangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleUpdate((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };

    if (!specificationAttributes) return null;

    return (
        <>
            <Typography variant="subtitle1" mt={2}>
                {intl.formatMessage({ id: 'attributes' })}
            </Typography>
            <Typography variant="body2" mb={2}>
                {intl.formatMessage({ id: 'select_attributes' })}
            </Typography>
            <Grid container spacing={gridSpacing} mt={1} sx={{ maxWidth: 450 }}>
                {specificationAttributes &&
                    booleanAttributesList.map((item, index) => {
                        const accessKey = item.name;
                        // transform object to be able read with dynamic keys
                        const specDataObject: { [key: string]: any } = specificationAttributes;
                        return (
                            <Grid
                                key={`attribute-type-${index}`}
                                item
                                xs={12}
                                md={6}
                                lg={6}
                                sx={{ display: 'flex', justifyContent: 'flex-start' }}
                            >
                                <FormGroup>
                                    <FormControlLabel
                                        sx={{ ml: 1 }}
                                        labelPlacement="start"
                                        control={
                                            <Switch onChange={handleChangeSwitch} checked={specDataObject[accessKey]} name={item.name} />
                                        }
                                        label={intl.formatMessage({
                                            id: item.intlKey
                                        })}
                                    />
                                </FormGroup>
                            </Grid>
                        );
                    })}

                <Grid item xs={12} lg={6}>
                    <FormControl fullWidth>
                        <InputLabel id="select-country-label">
                            {intl.formatMessage({
                                id: 'field_type'
                            })}
                        </InputLabel>
                        <Select
                            labelId="select-category-label"
                            id="select-category"
                            value={`${specificationAttributes?.fieldTypeId === '11111' ? '' : specificationAttributes?.fieldTypeId}`}
                            label={intl.formatMessage({
                                id: 'field_type'
                            })}
                            onChange={handleChangeSelect}
                            name="fieldTypeId"
                            required
                            disabled={mode === 'EDIT'}
                        >
                            {mode === 'EDIT' && (
                                <MenuItem
                                    key={`selected-item-${specificationAttributes?.fieldTypeId ?? 1}`}
                                    value={specificationAttributes?.fieldTypeId}
                                >
                                    <Typography>{specificationAttributes?.fieldTypeName}</Typography>
                                </MenuItem>
                            )}
                            {mode === 'ADD' &&
                                specificationFieldTypes.map((item: { [key: string]: any }, index: number) => (
                                    <MenuItem
                                        disabled={item.hide.indexOf(specTypeMode) > -1}
                                        key={`selected-item-${index}`}
                                        value={item.value}
                                    >
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
                        // sx={{ ml: { xs: 0, md: 1 } }}
                        label={intl.formatMessage({
                            id: 'description'
                        })}
                        size="small"
                        name="description"
                        value={specificationAttributes?.description}
                        onChange={onchangeText}
                    />
                </Grid>
            </Grid>
        </>
    );
}

type booleanAttributesType = {
    name: any;
    // label: string;
    intlKey: string;
};

const booleanAttributesList: booleanAttributesType[] = [
    {
        name: 'isActive',
        intlKey: 'active'
    },
    {
        name: 'isOnProductDetails',
        intlKey: 'product_details'
    },
    {
        name: 'isRequired',
        intlKey: 'required'
    },
    {
        name: 'isFilter',
        intlKey: 'search_filter'
    },
    {
        name: 'isTopMenuLinkActive',
        intlKey: 'top_menu'
    }
];
