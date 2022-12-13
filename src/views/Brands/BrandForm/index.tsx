import React, { FormEvent, useEffect, useState } from 'react';

// material-u
import { Box, Button, CardMedia, Collapse, Divider, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

// third-party imports
import { useIntl } from 'react-intl';

// project imports
import { gridSpacing } from 'store/constant';

// types
import { BrandType, NewBrandType } from 'types/catalogue';
import { useSelector } from 'store';

const initialBrandData: NewBrandType = {
    name: '',
    title: '',
    metaTagDescription: '',
    imageUrl: ''
};

type BrandFormProps = {
    initialData?: BrandType | null | undefined;
    handleSave: (data: NewBrandType) => void;
};

export default function BrandForm({ initialData, handleSave }: BrandFormProps) {
    const intl = useIntl();
    const { loading } = useSelector((state) => state.catalogue);

    const [newBrandData, setNewBrandData] = useState<NewBrandType>(initialBrandData);

    useEffect(() => {
        if (initialData) {
            const newData: NewBrandType = {
                name: initialData.name,
                title: initialData.title,
                metaTagDescription: initialData.metaTagDescription ?? '',
                imageUrl: initialData.imageUrl ?? ''
            };

            setNewBrandData(newData);
        }
    }, [initialData]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSave(newBrandData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewBrandData({ ...newBrandData, [name]: value });
    };

    const handleDeleteImage = () => {
        setNewBrandData({ ...newBrandData, imageUrl: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={4}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <TextField
                                value={newBrandData.name}
                                onChange={handleChange}
                                fullWidth
                                label={intl.formatMessage({
                                    id: 'name'
                                })}
                                name="name"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={newBrandData.title}
                                onChange={handleChange}
                                fullWidth
                                label={intl.formatMessage({
                                    id: 'title'
                                })}
                                name="title"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={newBrandData.metaTagDescription}
                                onChange={handleChange}
                                fullWidth
                                label={intl.formatMessage({
                                    id: 'metatag_description'
                                })}
                                name="metaTagDescription"
                                rows={6}
                                multiline
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <TextField
                                value={newBrandData.imageUrl}
                                onChange={handleChange}
                                fullWidth
                                label={intl.formatMessage({
                                    id: 'image_url'
                                })}
                                name="imageUrl"
                                type="url"
                                InputProps={{
                                    endAdornment: newBrandData.imageUrl && (
                                        <InputAdornment position="end">
                                            <IconButton aria-label="delete image" edge="end" onClick={handleDeleteImage}>
                                                <CloseIcon color="error" />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>

                        <CustomCardMedia url={newBrandData.imageUrl} handleDelete={handleDeleteImage} />
                    </Grid>
                </Grid>

                <Grid item xs={12} pt={4} pl={3}>
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button disabled={loading} variant="outlined" startIcon={<SaveIcon />} type="submit">
                            Guardar
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
}

type CustomCardMediaProps = {
    url: string;
    handleDelete: () => void;
};

const CustomCardMedia = ({ url, handleDelete }: CustomCardMediaProps) => (
    <Grid item xs={12}>
        <Collapse in={Boolean(url)}>
            <Box
                sx={{
                    position: 'relative'
                }}
            >
                <IconButton
                    aria-label="delete image"
                    sx={{
                        position: 'absolute',
                        top: 3,
                        right: 3,
                        opacity: 0.1,
                        '&:hover': {
                            opacity: 1
                        }
                    }}
                    onClick={handleDelete}
                >
                    <CloseIcon color="error" />
                </IconButton>

                <CardMedia
                    component="img"
                    src={url}
                    alt="brand_image"
                    sx={{
                        width: '100%',
                        boxShadow: 3,
                        borderRadius: 1,
                        minHeight: 80
                    }}
                />
            </Box>
        </Collapse>
    </Grid>
);
