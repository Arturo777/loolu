import React, { FormEvent, useEffect, useState } from 'react';

// material-ui
import { Box, Button, CardMedia, Collapse, Divider, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import MultiMerchant from 'ui-component/MultiMerchantButton';
// third-party imports
import { useIntl } from 'react-intl';

// project imports
import { gridSpacing } from 'store/constant';
import { useSelector } from 'store';

// types
import { BrandType, NewBrandType2 } from 'types/catalog';
import { MerchantType } from 'types/security';

const initialBrandData: NewBrandType2 = {
    idMerchant: 0,
    fatherMerchant: false,
    brandData: {
        imageUrl: '',
        isActive: true,
        metaTagDescription: '',
        name: '',
        title: ''
    }
};

type BrandFormProps = {
    initialData?: BrandType | null | undefined;
    handleSave: (data: NewBrandType2) => void;
};

export default function BrandForm({ initialData, handleSave }: any) {
    // BrandFormProps
    // hooks
    const intl = useIntl();

    // store
    const { loading } = useSelector((state) => state.catalogue);

    // vars
    const [newBrandData, setNewBrandData] = useState<NewBrandType2>(initialBrandData);
    const [changeMerchant, setChangeMerchant] = useState<MerchantType[]>();
    useEffect(() => {
        console.log({ loading });
    }, [loading]);
    useEffect(() => {
        if (initialData) {
            const newData: NewBrandType2 = {
                idMerchant: initialData.idMerchant,
                fatherMerchant: initialData.fatherMerchant,
                brandData: {
                    imageUrl: initialData.imageUrl ?? '',
                    isActive: initialData.isActive,
                    metaTagDescription: initialData.metaTagDescription ?? '',
                    name: initialData.name,
                    title: initialData.title
                }
            };

            setNewBrandData(newData);
        }
    }, [initialData]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const listNewBrandData: NewBrandType2[] = [];
        const dataChangeMerchant = changeMerchant?.map((merchant) =>
            // setNewBrandData({ ...newBrandData, idMerchant: merchant.merchantId });
            ({
                idMerchant: merchant.merchantId,
                fatherMerchant: merchant.isFather,
                brandData: newBrandData.brandData
            })
        );
        handleSave(dataChangeMerchant);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewBrandData({ ...newBrandData, brandData: { ...newBrandData.brandData, [name]: value } });
        console.log({ [name]: value });
    };

    const handleMerchants = (merchants: MerchantType[]) => {
        setChangeMerchant(merchants);
        console.log(merchants);
    };

    const handleDeleteImage = () => {
        setNewBrandData({
            ...newBrandData,
            brandData: {
                ...newBrandData.brandData,
                imageUrl: ''
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={4}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <MultiMerchant onChange={handleMerchants} maxShow={3} defaultSelected={[]} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={newBrandData.brandData.name}
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
                                value={newBrandData.brandData.title}
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
                                value={newBrandData.brandData.metaTagDescription}
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
                                value={newBrandData.brandData.imageUrl}
                                onChange={handleChange}
                                fullWidth
                                label={intl.formatMessage({
                                    id: 'image_url'
                                })}
                                name="imageUrl"
                                type="url"
                                InputProps={{
                                    endAdornment: newBrandData.brandData.imageUrl && (
                                        <InputAdornment position="end">
                                            <IconButton aria-label="delete image" edge="end" onClick={handleDeleteImage}>
                                                <CloseIcon color="error" />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>

                        <CustomCardMedia url={newBrandData.brandData.imageUrl ?? ''} handleDelete={handleDeleteImage} />
                    </Grid>
                </Grid>

                <Grid item xs={12} pt={4} pl={3}>
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button disabled={loading} variant="outlined" startIcon={<SaveIcon />} type="submit">
                            {intl.formatMessage({ id: 'save' })}
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
