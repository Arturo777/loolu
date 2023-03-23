import React, { useEffect, useMemo, useState } from 'react';

// mui imports
import { Autocomplete, TextField, Typography, useTheme, Box } from '@mui/material';

// third party imports
import { useIntl } from 'react-intl';

// project imports
import { useDispatch, useSelector } from 'store';
import { getCategoriesService } from 'store/slices/catalog';

type OptionType = {
    id: number | string;
    label: string;
    level?: number;
};

type BrandSelectProps = {
    onChange: (categoryId: string) => void;
    initialValue?: number;
};

export default function CategorySelect({ onChange, initialValue }: BrandSelectProps) {
    // hooks
    const dispatch = useDispatch();
    const theme = useTheme();
    const intl = useIntl();

    // store
    const { flatCategories, loading } = useSelector((state) => state.catalogue);

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
        dispatch(getCategoriesService({ idMerchant: 1 }));
    }, [dispatch]);

    const getOptions = useMemo(
        () => flatCategories.map((item) => ({ label: item.name, id: item.id, level: item.level })),
        [flatCategories]
    );

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
            id="autocomplete-mui-category"
            options={getOptions}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={intl.formatMessage({
                        id: 'category'
                    })}
                />
            )}
            isOptionEqualToValue={(option, val) => option.id === val.id}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Typography
                    {...props}
                    key={`${option.label}-${option.id}`}
                    sx={{
                        color: theme.palette.grey[100],
                        p: 1,
                        pl: option.level ?? 1
                    }}
                >
                    <Box component="span" sx={{ color: 'transparent' }}>
                        {getWhiteSpaces(option.level)}
                    </Box>
                    {option.label}
                </Typography>
            )}
        />
    );
}

const getWhiteSpaces = (spaces: number | undefined) => {
    const list = new Array(spaces ?? 0).fill('--');

    let whiteList = '';

    list.forEach((item) => {
        whiteList += item;
    });

    return whiteList;
};
