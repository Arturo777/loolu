import React, { useCallback } from 'react';

// mui imports
import { Box, Typography, LinearProgress, FormControl, Select, InputLabel, MenuItem, SelectChangeEvent } from '@mui/material';

// third-party imports
import { useIntl } from 'react-intl';

// project imports
import { useSelector } from 'store';

// types
import { FlatCategoryType } from 'types/catalog';

type SelectCategoryComponentProps = {
    fatherCategoryId: number | string;
    onChange: (event: SelectChangeEvent) => void;
    required?: boolean;
};

export default function SelectCategoryComponent({ fatherCategoryId, onChange, required = true }: SelectCategoryComponentProps) {
    // hooks
    const intl = useIntl();

    // store
    const { loading, flatCategories } = useSelector((state) => state.catalogue);

    const renderSelected = useCallback(
        (selected) => {
            const selectedItem: FlatCategoryType | undefined = flatCategories.find((item) => Number(item.id) === Number(selected));

            if (!selectedItem) return <Box />;

            return (
                <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <Typography>{selectedItem.name}</Typography>
                </Box>
            );
        },
        [flatCategories]
    );
    return (
        <>
            {loading && (
                <Box sx={{ mt: 3 }}>
                    <LinearProgress />
                </Box>
            )}
            {/* FATHER CATEGORY select */}
            {!loading && (
                <FormControl fullWidth>
                    <InputLabel id="select-country-label">
                        {intl.formatMessage({
                            id: 'existing_categories'
                        })}
                    </InputLabel>
                    <Select
                        labelId="select-category-label"
                        id="select-category"
                        value={`${fatherCategoryId}`}
                        label={intl.formatMessage({
                            id: 'existing_categories'
                        })}
                        name="fatherCategoryId"
                        onChange={onChange}
                        renderValue={renderSelected}
                        required={required}
                    >
                        {flatCategories.map((item) => (
                            <MenuItem
                                key={`selected-item-${item.id}`}
                                value={item.id}
                                sx={{ background: item.level === 1 ? 'rgba(100, 100, 100, 0.2)' : '' }}
                            >
                                <Typography
                                    sx={{
                                        ml: (item.level ?? 1) * 2,
                                        fontWeight: item.level === 1 || item.level === 2 ? 'bold' : ''
                                    }}
                                >
                                    {item.name}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </>
    );
}
