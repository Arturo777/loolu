import React, { useState, FormEvent, useEffect, useCallback } from 'react';

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
    LinearProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    SelectChangeEvent
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

// third-party imports
import { useIntl } from 'react-intl';

// project imports
import { useDispatch, useSelector } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';
import { getCategoryInfoService } from 'store/slices/catalogue';

// types
import { CategoryType, FlatCategoryType } from 'types/catalogue';

type EditCategoryProps = {
    selectedCategory?: number;
    show: boolean;
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
    score: 0
};

export default function EditCategoryComponent({ selectedCategory, show }: EditCategoryProps) {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();

    // store
    const { updating, loading, flatCategories } = useSelector((state) => state.catalogue);

    // vars
    const [newData, setNewData] = useState<NewCategoryType>(initialData);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        console.log(newData);
    }, [newData]);

    useEffect(() => {
        if (selectedCategory) {
            setIsLoading(true);
            dispatch(getCategoryInfoService({ idMerchant: 1, categoryId: selectedCategory }))
                .then(({ payload }) => {
                    setNewData(payload.response);
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

    const renderSelected = useCallback(
        (selected) => {
            const selectedItem: FlatCategoryType | undefined = flatCategories.find((item) => Number(item.id) === Number(selected));

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

    const handleChange = (event: SelectChangeEvent) => {
        setNewData({ ...newData, fatherCategoryId: Number(event.target.value) ?? 1 });
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

                <Grid item xs={12} sm={6} md={6} xl={4}>
                    <TextField
                        value={newData.score}
                        fullWidth
                        label={intl.formatMessage({
                            id: 'score'
                        })}
                        name="score"
                        onChange={onchangeText}
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={6} xl={4}>
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
                                value={`${newData.fatherCategoryId}`}
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
