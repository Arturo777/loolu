import React, { useEffect, useMemo, useState } from 'react';

// mui imports
import { Autocomplete, TextField, Typography, useTheme } from '@mui/material';

// third party imports
import { useIntl } from 'react-intl';

// project imports
import { useDispatch, useSelector } from 'store';
import { getBrands } from 'store/slices/catalog';
import { BrandType, FlatCategoryType } from 'types/catalog';

type OptionType = {
    id: number;
    label: string;
};

type BrandSelectProps = {
    onChange: (brandId: string) => void;
    initialValue?: number;
};

export default function BrandSelect({ onChange, initialValue }: BrandSelectProps) {
    // hooks
    const dispatch = useDispatch();
    const theme = useTheme();
    const intl = useIntl();

    // store
    const { brands, loading } = useSelector((state) => state.catalogue);

    const [value, setValue] = React.useState<OptionType | null>(null);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        if (initialValue) {
            console.log('SELECTED id', initialValue);
        }
    }, [initialValue]);

    useEffect(() => {
        onChange(`${value?.id ?? ''}`);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    useEffect(() => {
        dispatch(getBrands());
    }, [dispatch]);

    const getOptions = useMemo(() => brands.map((item) => ({ label: item.name, id: item.idBrand })), [brands]);

    return (
        <Autocomplete
            noOptionsText={intl.formatMessage({
                id: loading ? 'loading' : 'no_options'
            })}
            loading={loading}
            value={value}
            onChange={(event: any, newValue: OptionType | null) => {
                setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            id="autocomplete-mui-brands"
            options={getOptions}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={intl.formatMessage({
                        id: 'brand'
                    })}
                />
            )}
            isOptionEqualToValue={(option, val) => option.id === val.id}
            getOptionLabel={(option) => option.label}
            getOptionDisabled={(option) => option.id === 0}
            renderOption={(props, option, { selected }) => (
                <Typography
                    {...props}
                    key={`${option.label}-${option.id}`}
                    sx={{
                        p: 1,
                        color: theme.palette.grey[100],
                        transition: 'all 350ms ease',
                        '&:hover': {
                            background: theme.palette.divider,
                            transition: 'all 350ms ease'
                        }
                    }}
                >
                    {option.label}
                </Typography>
            )}
        />
    );
}

export const MultiBrandSelect = ({
    brandsList,
    initialValue,
    onChange,
    loading
}: {
    onChange: (brandId: string) => void;
    initialValue?: number;
    brandsList: BrandType[];
    loading: boolean;
}) => {
    // hooks
    const theme = useTheme();
    const intl = useIntl();

    const [value, setValue] = useState<OptionType | null>(null);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        console.log('initialValue', initialValue);
        if (initialValue) {
            const searchObject = brandsList.find((item) => item.idBrand === initialValue);

            console.log(searchObject);

            if (searchObject) {
                setValue({
                    id: initialValue,
                    label: searchObject.name
                });
            }
        }
    }, [brandsList, initialValue]);

    const getOptions = useMemo(() => brandsList.map((item) => ({ label: item.name, id: item.idBrand })), [brandsList]);

    return (
        <Autocomplete
            noOptionsText={intl.formatMessage({
                id: loading ? 'loading' : 'no_options'
            })}
            loading={loading}
            value={value}
            onChange={(event: any, newValue: OptionType | null) => {
                setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            id="autocomplete-mui-brands"
            options={getOptions}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={intl.formatMessage({
                        id: 'brand'
                    })}
                />
            )}
            isOptionEqualToValue={(option, val) => option.id === val.id}
            getOptionLabel={(option) => option.label}
            getOptionDisabled={(option) => option.id === 0}
            renderOption={(props, option, { selected }) => (
                <Typography
                    {...props}
                    key={`${option.label}-${option.id}`}
                    sx={{
                        p: 1,
                        color: theme.palette.grey[100],
                        transition: 'all 350ms ease',
                        '&:hover': {
                            background: theme.palette.divider,
                            transition: 'all 350ms ease'
                        }
                    }}
                >
                    {option.label}
                </Typography>
            )}
        />
    );
};
