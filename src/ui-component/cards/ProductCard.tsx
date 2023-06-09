/* eslint-disable global-require */
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// material-ui
import { Button, CardContent, Grid, Stack, Typography } from '@mui/material';

// third-party
import CurrencyFormat from 'react-currency-format';

// project import
import MainCard from './MainCard';
import SkeletonProductPlaceholder from 'ui-component/cards/Skeleton/ProductPlaceholder';

import { ProductCardProps } from 'types/cart';

// assets
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import placeholderImage from 'assets/images/placeholder.png';
import { Box } from '@mui/system';
import MultiMerchantButtons from 'ui-component/MultiMerchantButton/MultiMerchantButton';

// const prodImage = require.context('assets/images/e-commerce', true);

// ==============================|| PRODUCT CARD ||============================== //

const ProductCard = ({ productID, brandName, name, image, description, offerPrice, salePrice, brandId, skus }: ProductCardProps) => {
    // eslint-disable-next-line global-require
    const prodProfile = image || placeholderImage;
    // const [productRating] = useState<number | undefined>(rating);

    const [isLoading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handleOnAvatarClick = (e: any) => {
        // xxx Definir el merchant clickeado para que lo use el drawer de edit
        navigate(`/products/detail-product/${productID}?idMerchant=${e.merchantId}&isFather=${e.isFather}`);
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    const availableOn = useMemo(() => {
        if (!skus) return [];

        return skus?.map((item) => item.merchandID);
    }, [skus]);

    useEffect(() => {
        console.log(availableOn);
    }, [availableOn]);

    return (
        <>
            {isLoading ? (
                <SkeletonProductPlaceholder />
            ) : (
                <MainCard
                    content={false}
                    boxShadow
                    sx={{
                        '&:hover': {
                            transform: 'scale3d(1.02, 1.02, 1)',
                            transition: 'all .4s ease-in-out'
                        }
                    }}
                >
                    <Box component="img" src={prodProfile} sx={{ height: 220, width: `100%`, objectFit: `cover` }} alt={name} />

                    <CardContent sx={{ p: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid item xs={6}>
                                        <Typography
                                            component={Link}
                                            to={`/brands/${brandId}`}
                                            variant="subtitle2"
                                            sx={{ textDecoration: 'none' }}
                                        >
                                            {brandName}
                                        </Typography>
                                    </Grid>

                                    <Box sx={{ pl: '6px', pb: '2px' }}>
                                        <MultiMerchantButtons
                                            size="medium"
                                            availableMerchantsId={[...availableOn]}
                                            onAvatarClick={handleOnAvatarClick}
                                        />
                                    </Box>
                                </Stack>
                                <Typography
                                    component={Link}
                                    to={`/products/${productID}/edit`}
                                    variant="subtitle1"
                                    sx={{ textDecoration: 'none' }}
                                >
                                    {name}
                                </Typography>
                            </Grid>
                            {description && (
                                <Grid item xs={12}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            overflow: 'hidden',
                                            height: 45
                                        }}
                                    >
                                        {description}
                                    </Typography>
                                </Grid>
                            )}
                            {/* <Grid item xs={12} sx={{ pt: '8px !important' }}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Rating precision={0.5} name="size-small" value={productRating} size="small" readOnly />
                                    <Typography variant="caption">({offerPrice}+)</Typography>
                                </Stack>
                            </Grid> */}
                            <Grid item xs={12}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <Typography variant="h4">
                                                <CurrencyFormat value={offerPrice} displayType="text" thousandSeparator prefix="$" />
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6" sx={{ color: 'grey.500', textDecoration: 'line-through' }}>
                                                <CurrencyFormat value={salePrice} displayType="text" thousandSeparator prefix="$" />
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Button
                                        href="http://ec2-52-14-97-45.us-east-2.compute.amazonaws.com/catalogo/productos/editar-sku/1"
                                        variant="contained"
                                        sx={{ minWidth: 0, mr: 1 }}
                                        target="_blank"
                                        component="a"
                                    >
                                        <LinkIcon fontSize="small" />
                                    </Button>
                                    <Typography
                                        component={Link}
                                        to={`/products/detail-product/${productID}`}
                                        variant="subtitle2"
                                        sx={{ textDecoration: 'none' }}
                                    >
                                        <Button variant="contained" sx={{ minWidth: 0 }}>
                                            <EditIcon fontSize="small" />
                                        </Button>
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

export default ProductCard;
