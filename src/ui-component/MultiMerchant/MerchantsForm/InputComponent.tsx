import React, { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import {
    Autocomplete,
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    LinearProgress,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    Switch,
    TextField
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useDispatch, useSelector } from 'store';
import { getBrands2 } from 'store/slices/catalog';
import { BrandType, FlatCategoryType } from 'types/catalog';
import { MultiBrandSelect } from 'ui-component/selects/BrandSelect';
import TradePoliciesSelect from 'ui-component/selects/TradePolicies';
import { MultiCategorySelect } from 'ui-component/selects/CategorySelect';

export type AddOptionsProps<T, U, K extends string> = U extends Record<K, any> ? T & U : T & { [P in K]?: never };

export enum InputType {
    textField = 'textField',
    textarea = 'textarea',
    radio = 'radio',
    checkbox = 'checkbox',
    switch = 'switch',
    select = 'select',
    brandSelect = 'brandSelect',
    policies = 'policies',
    categorySelect = 'categorySelect'
}

export type SelectOptionType = {
    label: string;
    value: string | number;
};

type RenderInputComponentProps = {
    type: InputType;
    label: string;
    merchantId?: number;
    value: any;
    updateValue: (e: any) => void;
    options?: null | SelectOptionType[];
};

const RenderInputComponent = ({ label, value, updateValue, type, options, merchantId }: RenderInputComponentProps) => {
    // hooks
    const dispatch = useDispatch();
    const intl = useIntl();

    useEffect(() => {
        if (type === InputType.brandSelect) {
            dispatch(getBrands2());
        }
    }, [dispatch, type]);

    if (type === InputType.select && !options) {
        throw new Error(
            '"options" property is required when "type" is set to "InputType.select". Please provide the "options" property to continue.'
        );
    }

    if (type === InputType.textField) {
        return (
            <TextField
                label={label}
                fullWidth
                value={value}
                onChange={(e) => {
                    updateValue(e.target.value);
                }}
            />
        );
    }

    // if (type === InputType.multiSelect) {
    //     const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    //     const checkedIcon = <CheckBoxIcon fontSize="small" />;
    //     const autocompleteOptions = optionP ?? [];

    //     return (
    //         <Autocomplete
    //             multiple
    //             id="checkboxes-tags-demo"
    //             options={autocompleteOptions}
    //             disableCloseOnSelect
    //             getOptionLabel={(option: any) => option.options.name}
    //             renderOption={(props, option, { selected }) => (
    //                 <li {...props}>
    //                     <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
    //                     {option?.name}
    //                 </li>
    //             )}
    //             style={{ width: 500 }}
    //             renderInput={(params) => (
    //                 <TextField
    //                     {...params}
    //                     label={intl.formatMessage({ id: 'trade_policies' })}
    //                     placeholder={intl.formatMessage({ id: 'trade_policies' })}
    //                 />
    //             )}
    //         />
    //     );
    // }

    if (type === InputType.textarea) {
        return (
            <TextField
                multiline
                label={label}
                rows={4}
                fullWidth
                value={value}
                onChange={(e) => {
                    updateValue(e.target.value);
                }}
            />
        );
    }

    if (type === InputType.switch) {
        return (
            <FormControlLabel
                checked={value}
                control={
                    <Switch
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            updateValue(e.target.checked);
                        }}
                    />
                }
                label={label}
            />
        );
    }

    if (type === InputType.select) {
        return (
            <FormControl fullWidth>
                <InputLabel id="form-drawer-select-label">{label}</InputLabel>
                <Select
                    labelId="form-drawer-select-label"
                    id="demo-simple-select"
                    value={value?.toString() ?? ''}
                    label={label}
                    onChange={(event: SelectChangeEvent) => {
                        // setAge(event.target.value as string);
                        updateValue(event.target.value);
                    }}
                >
                    {options?.map((item) => (
                        <MenuItem key={`form-drawer-option-${item.label}-${item.value}`} value={item.value}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }

    if (type === InputType.checkbox) {
        return <FormControlLabel value={value} label={label} control={<Checkbox checked={value} />} />;
    }

    if (type === InputType.radio) {
        return (
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
                <RadioGroup
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        updateValue((event.target as HTMLInputElement).value);
                    }}
                    value={value}
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                >
                    <Grid container>
                        {options?.map((item) => (
                            <Grid item xs={12} sm={6} key={`form-drawer-radio-${item.label}-${item.value}`}>
                                <FormControlLabel value={item.value} control={<Radio />} label={item.label} />
                            </Grid>
                        ))}
                    </Grid>
                </RadioGroup>
            </FormControl>
        );
    }

    if (type === InputType.brandSelect) {
        return <RenderBrandSelect merchantId={1} value={value} updateValue={(newValue) => updateValue(newValue)} />;
    }

    if (type === InputType.policies) {
        return <TradePoliciesSelect onChange={() => {}} />;
    }

    if (type === InputType.categorySelect) {
        return <RenderCategorySelect merchantId={merchantId || 1} value={value} updateValue={(newValue) => updateValue(newValue)} />;
    }

    return <Box />;
};

export default RenderInputComponent;

const RenderBrandSelect = ({
    merchantId,
    value,
    updateValue
}: {
    merchantId: number;
    value?: number | null;
    updateValue: (e: any) => void;
}) => {
    // store
    const { brands2, loading } = useSelector((state) => state.catalogue);

    const brandsList: BrandType[] = useMemo(() => {
        const filteredByMerchant = brands2.find((item: any) => item.merchantId === Number(merchantId));

        return filteredByMerchant?.brands ?? [];
    }, [merchantId, brands2]);

    if (loading) {
        return (
            <Box>
                <LinearProgress />
            </Box>
        );
    }

    if (brandsList.length === 0) {
        return <Box />;
    }

    return <SearchAndCreateBrandSelect updateValue={updateValue} brandsList={brandsList} value={value} />;
};
const RenderCategorySelect = ({
    merchantId,
    value,
    updateValue
}: {
    merchantId: number;
    value?: number | null;
    updateValue: (e: any) => void;
}) => {
    // store
    const { flatMerchantCategories, loading } = useSelector((state) => state.catalogue);

    const categoryList: FlatCategoryType[] = useMemo(() => {
        const filteredByMerchant = flatMerchantCategories.find((item: any) => item.idMerchant === Number(merchantId));

        return filteredByMerchant?.categoryList ?? [];
    }, [merchantId, flatMerchantCategories]);

    useEffect(() => {
        console.log({ categoryList });
    }, [categoryList]);

    if (loading) {
        return (
            <Box>
                <LinearProgress />
            </Box>
        );
    }

    if (categoryList.length === 0) {
        return <Box />;
    }

    return <SearchAndCreateCategorySelect updateValue={updateValue} categoryList={categoryList} value={value} />;
};

// const options = ['Option 1', 'Option 2'];

const SearchAndCreateBrandSelect = ({
    brandsList,
    value,
    updateValue
}: {
    updateValue: (e: any) => void;
    brandsList: BrandType[];
    value?: number | null;
}) => <MultiBrandSelect brandsList={brandsList} loading={false} onChange={updateValue} initialValue={value ?? undefined} />;

const SearchAndCreateCategorySelect = ({
    categoryList,
    value,
    updateValue
}: {
    updateValue: (e: any) => void;
    categoryList: FlatCategoryType[];
    value?: number | null;
}) => <MultiCategorySelect categoryList={categoryList} loading={false} onChange={updateValue} initialValue={value ?? undefined} />;
