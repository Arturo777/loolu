import React, { FormEvent, useState, useEffect, useMemo, useCallback } from 'react';

// mui imports
import {
    Box,
    Button,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

// third imports
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { createCategoryService, getCategoriesService } from 'store/slices/catalogue';

// services

// types

type newCategoryType = {
    catId?: string;
    name: string;
};

const initialData: newCategoryType = {
    catId: '',
    name: ''
};

const CreateCategoryPage = () => {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // store
    const { updating, categories } = useSelector((state) => state.catalogue);

    // vars
    const [newCategory, setNewCategory] = useState<newCategoryType>(initialData);

    useEffect(() => {
        dispatch(getCategoriesService({ idMerchant: 1 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newCategory.catId) return;

        await dispatch(
            createCategoryService({
                idMerchant: 1,
                data: {
                    name: newCategory.name,
                    fatherCategoryId: Number(newCategory.catId) ?? 1
                }
            })
        );
        navigate('/categories');
    };

    const onchangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewCategory({ ...newCategory, [name]: value });
    };

    const handleChange = (event: SelectChangeEvent) => {
        setNewCategory({ ...newCategory, catId: event.target.value as string });
    };

    const flatCategories = useMemo(() => {
        try {
            const flat = [];
            for (const cat of categories) {
                flat.push({ id: cat.id, name: cat.name, level: 1 });

                if (cat.children) {
                    for (const fam of cat.children) {
                        flat.push({ id: fam.id, name: fam.name, level: 2 });
                        for (const line of fam.children) {
                            flat.push({ id: line.id, name: line.name, level: 3 });
                        }
                    }
                }
            }
            return flat;
        } catch (error) {
            console.log(error);
            return [];
        }
    }, [categories]);

    const renderSelected = useCallback(
        (selected) => {
            const selectedItem = flatCategories.find((item) => Number(item.id) === selected);

            if (!selectedItem) return <Box />;

            return (
                <Box>
                    <Typography>{selectedItem.name}</Typography>
                </Box>
            );
        },
        [flatCategories]
    );

    return (
        <MainCard
            title={intl.formatMessage({
                id: 'create_category'
            })}
        >
            <Grid container component="form" onSubmit={handleSave} spacing={gridSpacing}>
                {Boolean(categories) && Boolean(categories.length) && (
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <FormControl fullWidth>
                            <InputLabel id="select-country-label">
                                {intl.formatMessage({
                                    id: 'existing_categories'
                                })}
                            </InputLabel>
                            <Select
                                labelId="select-category-label"
                                id="select-category"
                                value={newCategory.catId}
                                label={intl.formatMessage({
                                    id: 'existing_categories'
                                })}
                                onChange={handleChange}
                                renderValue={renderSelected}
                                required
                            >
                                {flatCategories.map((item) => (
                                    <MenuItem
                                        key={`selected-item-${item.id}`}
                                        value={item.id}
                                        sx={{ background: item.level === 1 ? 'rgba(100, 100, 100, 0.2)' : '' }}
                                    >
                                        <Typography
                                            sx={{ ml: item.level * 2, fontWeight: item.level === 1 || item.level === 2 ? 'bold' : '' }}
                                        >
                                            {item.name}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                )}
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <TextField
                        value={newCategory.name}
                        fullWidth
                        label={intl.formatMessage({
                            id: 'category_name'
                        })}
                        name="name"
                        onChange={onchangeText}
                        required
                    />
                </Grid>

                <Grid item xs={12} pt={4} pl={3}>
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button disabled={updating} variant="outlined" startIcon={<SaveIcon />} type="submit">
                            Guardar
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default CreateCategoryPage;
