import React, { useState, useCallback, useEffect } from 'react';

// mui imports
import { Box, Typography, LinearProgress, FormControl, Select, InputLabel, MenuItem, SelectChangeEvent } from '@mui/material';

// third-party imports
import { useIntl } from 'react-intl';

// project imports
import { useSelector } from 'store';

// types
import { FlatCategoryType, FlatMerchantCategoriesType, SelectedMerchant } from 'types/catalog';

type SelectCategoryComponentProps = {
    fatherCategoryId: (() => number) | number;
    onChange: (event: SelectChangeEvent, category: any) => void;
    required?: boolean;
    selectedMerchant?: SelectedMerchant;
};

export default function SelectCategoryComponent({
    selectedMerchant,
    fatherCategoryId,
    onChange,
    required = true
}: SelectCategoryComponentProps) {
    // hooks
    const intl = useIntl();

    // store
    const { flatMerchantCategories, loading } = useSelector((state) => state.catalogue);

    // vars
    const [flatCategories, setFlatCategories] = useState<FlatCategoryType[]>([]);

    const renderSelected = useCallback(
        (selected) => {
            const selectedItem: any = flatCategories?.find((item) => Number(item.id) === Number(selected));
            // const selectedItem: FlatCategoryType | undefined = flatCategories.find((item) => Number(item.id) === Number(selected));

            if (!selectedItem) return <Box />;

            return (
                <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <Typography>{selectedItem.name}</Typography>
                </Box>
            );
        },
        [flatCategories]
    );

    useEffect(() => {
        if (loading || !selectedMerchant) return;
        console.log({ flatMerchantCategories });
        const fCategories = flatMerchantCategories.find(
            (categories: FlatMerchantCategoriesType) => categories.idMerchant === selectedMerchant.merchantId
        );
        if (!fCategories) return;

        setFlatCategories(fCategories.categoryList);
    }, [flatMerchantCategories, loading, selectedMerchant]);

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
                        {`${intl.formatMessage({ id: 'existing_categories' })} - ${selectedMerchant?.name}`}
                    </InputLabel>
                    <Select
                        labelId="select-category-label"
                        id="select-category"
                        value={`${fatherCategoryId}`}
                        label={`${intl.formatMessage({ id: 'existing_categories' })} - ${selectedMerchant?.name}`}
                        name={selectedMerchant?.merchantId.toString()}
                        onChange={(e) => onChange(e, selectedMerchant)}
                        renderValue={renderSelected}
                        required={required}
                    >
                        {flatCategories?.map((item) => (
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
