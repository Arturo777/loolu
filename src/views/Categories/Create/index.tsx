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
    Typography,
    Card,
    LinearProgress
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

// third imports
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

// project imports
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { createCategoryService, getCategoriesService } from 'store/slices/catalogue';
import { openSnackbar } from 'store/slices/snackbar';
import { initial } from 'lodash';

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

type CreateCategoryPageProps = {
    handleClose: (e?: any) => void;
    selectedCatId?: number;
};

type OptionItemmType = {
    id: number | string;
    name: string;
    description?: string;
    level?: number;
};

const CreateCategoryPage = ({ handleClose, selectedCatId }: CreateCategoryPageProps) => {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();

    // store
    const { updating, loading, flatCategories } = useSelector((state) => state.catalogue);

    // vars
    const [newCategory, setNewCategory] = useState<newCategoryType>(initialData);

    useEffect(() => {
        if (selectedCatId) {
            setNewCategory({ ...newCategory, catId: `${selectedCatId}` });
        } else {
            setNewCategory({ ...newCategory, catId: '' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCatId]);

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newCategory.catId) return;

        dispatch(
            createCategoryService({
                idMerchant: 1,
                data: {
                    name: newCategory.name,
                    fatherCategoryId: Number(newCategory.catId) ?? 1
                }
            })
        )
            .then(({ payload }) => {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: `Categoria: ${payload.response.name} creada correctamente`,
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: false
                    })
                );
                dispatch(getCategoriesService({ idMerchant: 1 }));
            })
            .catch(() => {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Error al crear la categoria',
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        close: false
                    })
                );
            })
            .finally(() => {
                handleCancel();
            });
    };

    const onchangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewCategory({ ...newCategory, [name]: value });
    };

    const handleChange = (event: SelectChangeEvent) => {
        setNewCategory({ ...newCategory, catId: event.target.value as string });
    };

    const handleCancel = () => {
        setNewCategory(initialData);
        if (handleClose) {
            handleClose();
        }
    };

    const renderSelected = useCallback(
        (selected) => {
            const selectedItem: OptionItemmType | undefined = flatCategories.find((item) => Number(item.id) === Number(selected));

            if (!selectedItem) return <Box />;

            return (
                <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <Typography>{selectedItem.name}</Typography>
                    {Boolean(selectedItem.description) && (
                        <Typography ml={1} variant="caption">
                            {selectedItem.description}
                        </Typography>
                    )}
                </Box>
            );
        },
        [flatCategories]
    );

    return (
        <Card sx={{ boxShadow: 1, p: 3 }}>
            <Grid container component="form" onSubmit={handleSave} spacing={gridSpacing}>
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    {loading && (
                        <Box sx={{ mt: 3 }}>
                            <LinearProgress />
                        </Box>
                    )}

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
                </Grid>

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
                        <Button onClick={handleCancel} variant="outlined" startIcon={<CloseIcon />} color="error" sx={{ mr: 2 }}>
                            Cancelar
                        </Button>
                        <Button disabled={updating} variant="outlined" startIcon={<SaveIcon />} type="submit">
                            Guardar
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    );
};

export default CreateCategoryPage;
