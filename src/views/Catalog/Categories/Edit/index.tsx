/* eslint-disable no-unreachable */
import React, { useState, FormEvent, useEffect } from 'react';

// mui imports
import {
    Box,
    Grid,
    Button,
    TextField,
    Divider,
    Card,
    CircularProgress,
    Fade,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    SelectChangeEvent,
    FormGroup,
    FormControlLabel,
    Switch,
    useMediaQuery,
    useTheme,
    Modal,
    IconButton,
    Stack,
    Tooltip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import MergeTypeIcon from '@mui/icons-material/MergeType';

// third-party imports
import { useIntl } from 'react-intl';

// project imports
import { useDispatch, useSelector } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';
import { editCategoryService, getCategoryInfoService, getMerchantCategoriesService } from 'store/slices/catalog';

// types
import { CategoryType, EditCategoryProps } from 'types/catalog';
import SelectCategoryComponent from '../components/SelectCategory';

type NewCategoryType = Omit<CategoryType, 'id' | 'numberChildren' | 'hasChildren' | 'children'>;

const initialData: NewCategoryType = {
    name: '',
    title: '',
    description: '',
    isActive: true,
    showBrandFilter: true,
    showInStoreFront: true,
    activeStoreFrontLink: true,
    fatherCategoryId: 0,
    score: 0,
    stockKeepingUnitSelectionMode: '',
    masterCategoryId: 0
};

export default function EditCategoryComponent({ selectedCategory, show, onCancel, openAssociate, selectedMerchant }: EditCategoryProps) {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();
    const theme = useTheme();
    const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    // store
    const { updating } = useSelector((state) => state.catalogue);

    // vars
    const [originalData, setOriginalData] = useState<CategoryType>();
    const [newData, setNewData] = useState<NewCategoryType>(initialData);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (selectedCategory) {
            setIsLoading(true);
            dispatch(getCategoryInfoService({ idMerchant: selectedMerchant?.merchantId ?? 1, categoryId: selectedCategory }))
                .then(({ payload }) => {
                    setNewData({
                        ...payload.response,
                        fatherCategoryId: payload.response.fatherCategoryId === 0 ? '' : payload.response.fatherCategoryId
                    });
                    setOriginalData(payload.response);
                })
                .catch(() => {
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Error al obtener la categoría',
                            variant: 'alert',
                            alert: {
                                color: 'error'
                            },
                            close: true
                        })
                    );
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory, selectedMerchant]);

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedCategory && originalData) {
            const categoryData = createNewCategoryData(newData, originalData, selectedCategory);

            dispatch(
                editCategoryService({
                    idMerchant: selectedMerchant?.merchantId ?? 1,
                    category: categoryData
                })
            )
                .then(({ payload }) => {
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: `Categoria: ${payload.response.name} actualizada correctamente`,
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            close: false
                        })
                    );
                    dispatch(getMerchantCategoriesService({ idMerchant: selectedMerchant?.merchantId ?? 1 }));
                })
                .catch(() => {
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Error al editar la categoria',
                            variant: 'alert',
                            alert: {
                                color: 'error'
                            },
                            close: false
                        })
                    );
                })
                .finally(() => {
                    onCancel();
                });
        }
    };

    const onchangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewData({ ...newData, [name]: value });
    };

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setNewData({ ...newData, [event.target.name]: Number(event.target.value) ?? 1 });
    };

    const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewData({ ...newData, [event.target.name]: event.target.checked });
    };

    const renderContent = () => (
        <>
            <Grid container component="form" onSubmit={handleSave} spacing={gridSpacing} p={3}>
                <Grid item xs={12} pt={4} pl={3}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h4">
                            {intl.formatMessage({
                                id: 'edit_category'
                            })}
                        </Typography>
                        <Stack direction="row" alignItems="center">
                            <Tooltip title={intl.formatMessage({ id: 'associate_facet_category' })}>
                                <Button
                                    onClick={() => openAssociate(originalData)}
                                    startIcon={<MergeTypeIcon sx={{ p: 0 }} />}
                                    sx={{ mr: 2 }}
                                >
                                    {intl.formatMessage({ id: 'associate_facet_category' })}
                                </Button>
                            </Tooltip>

                            <IconButton onClick={onCancel} size="small" sx={{ p: 0, color: '#d9d9d9', '&:hover': { color: 'grey' } }}>
                                <CloseIcon sx={{ p: 0, color: '#d9d9d9', '&:hover': { color: 'grey' } }} />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Grid>

                <Grid item xs={12} pt={4} pl={3}>
                    <Divider />
                </Grid>

                <Grid item xs={12} sm={6} md={6} xl={4}>
                    <TextField
                        value={newData.name}
                        fullWidth
                        label={intl.formatMessage({
                            id: 'category_name'
                        })}
                        name="name"
                        onChange={onchangeText}
                        required
                    />
                </Grid>
                {/* TITLE */}
                <Grid item xs={12} sm={6} md={6} xl={4}>
                    <TextField
                        value={newData.title}
                        fullWidth
                        label={intl.formatMessage({
                            id: 'title'
                        })}
                        name="title"
                        onChange={onchangeText}
                        required
                    />
                </Grid>
                {/* SCORE */}
                <Grid item xs={12} sm={6} md={6} xl={4}>
                    <TextField value={newData.score} fullWidth label="Score" name="score" onChange={onchangeText} required />
                </Grid>
                {/* DESCRIPTION */}
                <Grid item xs={12} sm={6} md={6} xl={4}>
                    <TextField
                        value={newData.description}
                        fullWidth
                        label={intl.formatMessage({
                            id: 'description'
                        })}
                        name="description"
                        onChange={onchangeText}
                        required
                    />
                </Grid>
                {/* FATHER CATEGORY box */}
                <Grid item xs={12} sm={6} md={6} xl={4}>
                    <SelectCategoryComponent required={false} fatherCategoryId={newData.fatherCategoryId} onChange={handleChangeSelect} />
                </Grid>
                {/* Mode */}
                <Grid item xs={12} sm={6} md={6} xl={4}>
                    <FormControl fullWidth>
                        <InputLabel id="select-country-label">
                            {intl.formatMessage({
                                id: 'show_mode'
                            })}
                        </InputLabel>
                        <Select
                            labelId="select-category-label"
                            id="select-category"
                            value={newData.stockKeepingUnitSelectionMode}
                            label={intl.formatMessage({
                                id: 'show_mode'
                            })}
                            onChange={handleChangeSelect}
                            name="stockKeepingUnitSelectionMode"
                            required
                        >
                            {categoryModes.map((item, index) => (
                                <MenuItem key={`selected-item-${index}`} value={item.value}>
                                    <Typography>{item.label}</Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {/* STATUS */}
                <Grid item xs={12} sm={6} md={3} xl={2} sx={switchContainerStyles}>
                    <FormGroup>
                        <FormControlLabel
                            labelPlacement="start"
                            control={<Switch onChange={handleChangeSwitch} checked={newData.isActive} name="isActive" />}
                            label={intl.formatMessage({
                                id: 'active'
                            })}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6} md={3} xl={2} sx={switchContainerStyles}>
                    <FormGroup>
                        <FormControlLabel
                            labelPlacement="start"
                            control={
                                <Switch onChange={handleChangeSwitch} checked={newData.activeStoreFrontLink} name="activeStoreFrontLink" />
                            }
                            label={intl.formatMessage({
                                id: 'active_link'
                            })}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6} md={3} xl={2} sx={switchContainerStyles}>
                    <FormGroup>
                        <FormControlLabel
                            labelPlacement="start"
                            control={<Switch onChange={handleChangeSwitch} checked={newData.showBrandFilter} name="showBrandFilter" />}
                            label={intl.formatMessage({
                                id: 'show_brand_filter'
                            })}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6} md={3} xl={2} sx={switchContainerStyles}>
                    <FormGroup>
                        <FormControlLabel
                            labelPlacement="start"
                            control={<Switch onChange={handleChangeSwitch} checked={newData.showInStoreFront} name="showInStoreFront" />}
                            label={intl.formatMessage({
                                id: 'show_in_store'
                            })}
                        />
                    </FormGroup>
                </Grid>

                <Grid item xs={12} pt={4} pl={3}>
                    <Divider />
                </Grid>
                {/* SAVE AND CANCEL BUTTOn */}
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={onCancel} variant="outlined" startIcon={<CloseIcon />} color="error" sx={{ mr: 2 }}>
                            Cancelar
                        </Button>
                        <Button disabled={updating} variant="outlined" startIcon={<SaveIcon />} type="submit">
                            {intl.formatMessage({ id: 'save' })}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );

    if (onlyMediumScreen) {
        return (
            <Modal open={show} onClose={onCancel} aria-labelledby="modal-edit-category" aria-describedby="modal-render-form-edit-category">
                <Box sx={modalStyle}>
                    {isLoading && (
                        <Fade in={isLoading}>
                            <Box component={Card} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 10 }}>
                                <CircularProgress />
                            </Box>
                        </Fade>
                    )}
                    {!isLoading && renderContent()}
                </Box>
            </Modal>
        );
    }

    return (
        <Fade in={show}>
            <Card
                sx={{
                    boxShadow: 2,
                    // background: 'white',
                    position: 'sticky',
                    top: 100,
                    bottom: 20,
                    zIndex: 5
                }}
            >
                {isLoading && (
                    <Fade in={isLoading}>
                        <Box
                            component={Card}
                            sx={{ boxShadow: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 10 }}
                        >
                            <CircularProgress />
                        </Box>
                    </Fade>
                )}
                {!isLoading && renderContent()}
            </Card>
        </Fade>
    );
}

const categoryModes: { value: string; label: string }[] = [
    { value: 'COMBO', label: 'Combo' },
    { value: 'LIST', label: 'Lista de SKU' },
    { value: 'RADIO', label: 'Radio selección' },
    { value: 'SPECIFICATION', label: 'Especificacion de SKU' }
];

const switchContainerStyles = { display: 'flex', justifyContent: 'flex-start' };

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: { xs: 1, lg: 4 },
    px: { xs: 1, lg: 4 },
    pb: 3,
    borderRadius: 2
};

const createNewCategoryData = (newData: NewCategoryType, originalData: CategoryType, selectedCategory: number) => ({
    activeStoreFrontLink: newData.activeStoreFrontLink,
    adWordsRemarketingCode: null,
    description: newData.description,
    fatherCategoryId: newData.fatherCategoryId ? newData.fatherCategoryId : null,
    isActive: newData.isActive,
    name: newData.name,
    score: newData.score,
    showBrandFilter: newData.showBrandFilter,
    showInStoreFront: newData.showInStoreFront,
    stockKeepingUnitSelectionMode: newData.stockKeepingUnitSelectionMode,
    title: newData.title,
    id: selectedCategory,
    numberChildren: originalData.numberChildren,
    hasChildren: originalData.hasChildren
});
