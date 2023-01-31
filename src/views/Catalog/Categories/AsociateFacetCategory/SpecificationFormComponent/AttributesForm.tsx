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
import { specificationFieldTypes, NewSpecificationType } from './CustomTypes';

type AttributesFormProps = {
    handleChangeSelect: (e: SelectChangeEvent) => void;
    handleChangeSwitch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onchangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
    specData: NewSpecificationType;
    mode: 'EDIT' | 'ADD';
    specTypeMode: SpecificationGroupMode;
};

export default function AttributesForm({
    handleChangeSelect,
    handleChangeSwitch,
    onchangeText,
    specData,
    mode,
    specTypeMode
}: AttributesFormProps) {
    // hooks
    const intl = useIntl();

    return (
        <>
            <Typography variant="subtitle1" mt={2}>
                {intl.formatMessage({ id: 'attributes' })}
            </Typography>
            <Typography variant="body2" mb={2}>
                {intl.formatMessage({ id: 'select_attributes' })}
            </Typography>
            <Grid container spacing={gridSpacing} mt={1} sx={{ maxWidth: 450 }}>
                {specData &&
                    booleanAttributesList.map((item, index) => {
                        const accessKey = item.name;
                        // transform object to be able read with dynamic keys
                        const specDataObject: { [key: string]: any } = specData;
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
                                id: 'show_mode'
                            })}
                        </InputLabel>
                        <Select
                            labelId="select-category-label"
                            id="select-category"
                            value={`${specData?.fieldTypeId === '11111' ? '' : specData?.fieldTypeId}`}
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
                        value={specData?.description}
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
