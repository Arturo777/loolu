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
import { createMerchantCategoryService, getMerchantCategoriesService } from 'store/slices/catalog';
import { openSnackbar } from 'store/slices/snackbar';
import SelectCategoryComponent from '../components/SelectCategory';
import MultiMerchant from 'ui-component/MultiMerchantButton';
import { CreateCategoryPageProps, SelectedMerchant } from 'types/catalog';
import { MerchantType } from 'types/security';
// services

// types

type newCategoriesPayload = {
    merchantId: number;
    fatherMerchant: boolean;
    categoryData: {
        fatherCategoryId: number;
        masterCategoryId: number;
        isActive: boolean;
        name: string;
        title: string;
    };
};

const CreateCategoryPage = ({ handleClose, selectedCatId, show }: CreateCategoryPageProps) => {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();

    // store
    const { updating } = useSelector((state) => state.catalogue);

    // vars
    const [newCategory, setNewCategory] = useState<newCategoriesPayload[]>([]);
    const [selectedMerchants, setSelectedMerchants] = useState<MerchantType[]>([]);

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedMerchants.length) return;

        dispatch(
            createMerchantCategoryService({
                idMerchant: 1,
                data: newCategory
            })
        )
            .then(({ payload }) => {
                const categoryName = payload.response[0].categoryData.name;
                dispatch(
                    openSnackbar({
                        open: true,
                        message: `Categoria: ${categoryName} creada correctamente`,
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: false
                    })
                );
                dispatch(getMerchantCategoriesService({ idMerchant: 1 }));
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
        const { value } = e.target;

        setNewCategory((prev: newCategoriesPayload[]) =>
            prev.map((cat: newCategoriesPayload) => ({ ...cat, categoryData: { ...cat.categoryData, name: value, title: value } }))
        );
    };

    const handleChange = (event: SelectChangeEvent, category: SelectedMerchant) => {
        const name = event.target.name;
        const value = event.target.value;

        console.log({ name, value, category });

        setNewCategory((prev: any) =>
            selectedMerchants.map((merchant: MerchantType) => {
                const prevMerchant = prev.find((merch: newCategoriesPayload) => merch.merchantId === merchant.merchantId);
                const categoryName = prev[0]?.categoryData?.name;
                const isSelected = prevMerchant?.merchantId === category.merchantId;
                return {
                    merchantId: merchant.merchantId,
                    fatherMerchant: merchant.isFather,
                    categoryData: {
                        fatherCategoryId: isSelected ? value ?? 0 : prevMerchant?.categoryData?.fatherCategoryId,
                        masterCategoryId: isSelected ? value ?? 0 : prevMerchant?.categoryData?.masterCategoryId,
                        isActive: true,
                        name: categoryName ?? '',
                        title: categoryName ?? ''
                    }
                };
            })
        );
    };

    const handleCancel = () => {
        setNewCategory([]);
        if (handleClose) {
            handleClose();
        }
    };

    useEffect(() => {
        console.log({ newCategory });
    }, [newCategory]);

    useEffect(() => {
        setNewCategory((prev: newCategoriesPayload[]) =>
            selectedMerchants.map((merchant: MerchantType) => {
                const prevMerchant = prev.find((merch: newCategoriesPayload) => merch.merchantId === merchant.merchantId);
                const categoryName = prev[0]?.categoryData?.name;
                return {
                    merchantId: merchant.merchantId,
                    fatherMerchant: merchant.isFather,
                    categoryData: {
                        fatherCategoryId: prevMerchant ? prevMerchant?.categoryData?.fatherCategoryId : 0,
                        masterCategoryId: prevMerchant ? prevMerchant?.categoryData?.masterCategoryId : 0,
                        isActive: true,
                        name: categoryName ?? '',
                        title: categoryName ?? ''
                    }
                };
            })
        );
    }, [selectedMerchants]);

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
                                    onChange={(merchants) => setSelectedMerchants(merchants)}
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
                        {selectedMerchants.map((selectedMerchant: any) => {
                            const fatherCategoryId =
                                newCategory?.find((cat: any) => cat.merchantId === selectedMerchant.merchantId)?.categoryData
                                    .fatherCategoryId ?? 0;
                            return (
                                <Box sx={{ marginTop: '15px' }}>
                                    <SelectCategoryComponent
                                        selectedMerchant={selectedMerchant}
                                        required={false}
                                        fatherCategoryId={fatherCategoryId}
                                        onChange={handleChange}
                                    />
                                </Box>
                            );
                        })}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box sx={{ marginTop: '15px' }}>
                            <TextField
                                value={newCategory[0]?.categoryData.name}
                                fullWidth
                                label={intl.formatMessage({
                                    id: 'category_name'
                                })}
                                name="name"
                                onChange={onchangeText}
                                required
                            />
                        </Box>
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
