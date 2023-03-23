import React, { FormEvent, useState, useEffect } from 'react';

// mui imports
import { Box, Button, Divider, Grid, SelectChangeEvent, TextField, Card, Typography, Stack, IconButton, Fade } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

// third imports
import { useIntl } from 'react-intl';

// project imports
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { createCategoryService, getCategoriesService, getMerchantCategoriesService } from 'store/slices/catalog';
import { openSnackbar } from 'store/slices/snackbar';
import SelectCategoryComponent from '../components/SelectCategory';
import MultiMerchant from 'ui-component/MultiMerchantButton';
import { CreateCategoryPageProps } from 'types/catalog';

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

const CreateCategoryPage = ({ handleClose, selectedCatId, show, selectedMerchant }: CreateCategoryPageProps) => {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();

    // store
    const { updating } = useSelector((state) => state.catalogue);

    // vars
    const [newCategory, setNewCategory] = useState<newCategoryType>(initialData);

    useEffect(() => {
        dispatch(getCategoriesService({ idMerchant: 1 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        <Fade in={show}>
            <Card
                sx={{
                    boxShadow: 2,
                    position: 'sticky',
                    top: 100,
                    bottom: 20,
                    zIndex: 5,
                    p: 3
                }}
            >
                <Grid container component="form" onSubmit={handleSave} spacing={gridSpacing}>
                    <Grid item xs={12} pt={4} pl={3}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item container alignItems="center">
                                <Typography variant="h4" sx={{ mr: 1 }}>
                                    {intl.formatMessage({
                                        id: 'create_category'
                                    })}
                                </Typography>

                                <MultiMerchant
                                    // justOne
                                    // readOnly
                                    onChange={(merchants) => console.log('SELECTED MERCHANTS', merchants)}
                                    maxShow={9}
                                    defaultSelected={[]}
                                />
                            </Grid>

                            <IconButton onClick={handleCancel} size="small" sx={{ p: 0, color: '#d9d9d9', '&:hover': { color: 'grey' } }}>
                                <CloseIcon sx={{ p: 0, color: '#d9d9d9', '&:hover': { color: 'grey' } }} />
                            </IconButton>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} pt={4} pl={3}>
                        <Divider />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <SelectCategoryComponent fatherCategoryId={newCategory.catId ?? ''} onChange={handleChange} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
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
                                {intl.formatMessage({ id: 'cancel' })}
                            </Button>
                            <Button disabled={updating} variant="outlined" startIcon={<SaveIcon />} type="submit">
                                {intl.formatMessage({ id: 'save' })}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Fade>
    );
};

export default CreateCategoryPage;
