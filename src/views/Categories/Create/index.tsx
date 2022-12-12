import React, { FormEvent, useState, useEffect } from 'react';

// mui imports
import { Box, Button, Divider, Grid, SelectChangeEvent, TextField, Card, Typography, Stack, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

// third imports
import { useIntl } from 'react-intl';

// project imports
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { createCategoryService, getCategoriesService } from 'store/slices/catalogue';
import { openSnackbar } from 'store/slices/snackbar';
import SelectCategoryComponent from '../components/SelectCategory';

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

const CreateCategoryPage = ({ handleClose, selectedCatId }: CreateCategoryPageProps) => {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();

    // store
    const { updating } = useSelector((state) => state.catalogue);

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

    return (
        <Card sx={{ boxShadow: 1, p: 3 }}>
            <Grid container component="form" onSubmit={handleSave} spacing={gridSpacing}>
                <Grid item xs={12} pt={4} pl={3}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h4">
                            {intl.formatMessage({
                                id: 'create_category'
                            })}
                        </Typography>

                        <IconButton onClick={handleCancel} size="small" sx={{ p: 0, color: '#d9d9d9', '&:hover': { color: 'grey' } }}>
                            <CloseIcon sx={{ p: 0, color: '#d9d9d9', '&:hover': { color: 'grey' } }} />
                        </IconButton>
                    </Stack>
                </Grid>

                <Grid item xs={12} pt={4} pl={3}>
                    <Divider />
                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <SelectCategoryComponent fatherCategoryId={newCategory.catId ?? ''} onChange={handleChange} />
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
