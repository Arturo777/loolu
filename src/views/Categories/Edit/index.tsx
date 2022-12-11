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
    Switch
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

// third-party imports
import { useIntl } from 'react-intl';

// project imports
import { useDispatch, useSelector } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';
import { getCategoryInfoService } from 'store/slices/catalogue';

// types
import { CategoryType } from 'types/catalogue';
import SelectCategoryComponent from '../components/SelectCategory';

type EditCategoryProps = {
    selectedCategory?: number;
    show: boolean;
    onCancel: () => void;
};

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
    stockKeepingUnitSelectionMode: ''
};

export default function EditCategoryComponent({ selectedCategory, show, onCancel }: EditCategoryProps) {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();

    // store
    const { updating } = useSelector((state) => state.catalogue);

    // vars
    const [newData, setNewData] = useState<NewCategoryType>(initialData);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (selectedCategory) {
            setIsLoading(true);
            dispatch(getCategoryInfoService({ idMerchant: 1, categoryId: selectedCategory }))
                .then(({ payload }) => {
                    setNewData({
                        ...payload.response,
                        fatherCategoryId: payload.response.fatherCategoryId === 0 ? '' : payload.response.fatherCategoryId
                    });
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
    }, [selectedCategory]);

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const onchangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewData({ ...newData, [name]: value });
    };

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setNewData({ ...newData, [event.target.name]: Number(event.target.value) ?? 1 });
    };

    const renderContent = () => (
        <>
            <Grid container component="form" onSubmit={handleSave} spacing={gridSpacing} p={3}>
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
                    <SelectCategoryComponent fatherCategoryId={newData.fatherCategoryId} onChange={handleChangeSelect} />
                </Grid>
                {/* Mode */}
                <Grid item xs={12} sm={6} md={6} xl={4}>
                    <FormControl fullWidth>
                        <InputLabel id="select-country-label">
                            {intl.formatMessage({
                                id: 'existing_categories'
                            })}
                        </InputLabel>
                        <Select
                            labelId="select-category-label"
                            id="select-category"
                            value={newData.stockKeepingUnitSelectionMode}
                            label={intl.formatMessage({
                                id: 'existing_categories'
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
                            control={<Switch checked={newData.isActive} />}
                            label={intl.formatMessage({
                                id: newData.isActive ? 'active' : 'inactive'
                            })}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6} md={3} xl={2} sx={switchContainerStyles}>
                    <FormGroup>
                        <FormControlLabel
                            labelPlacement="start"
                            control={<Switch checked={newData.activeStoreFrontLink} />}
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
                            control={<Switch checked={newData.showBrandFilter} />}
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
                            control={<Switch checked={newData.showInStoreFront} />}
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
                            Guardar
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );

    return (
        <Fade in={show}>
            <Card sx={{ boxShadow: 2 }}>
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
