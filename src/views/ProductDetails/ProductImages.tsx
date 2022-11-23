import { Key, useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, CardMedia, Grid, useMediaQuery } from '@mui/material';

// project import
import MainCard from 'ui-component/cards/MainCard';
import Avatar from 'ui-component/extended/Avatar';
import { Skus } from 'types/e-commerce';
import { gridSpacing } from 'store/constant';

// third-party
import Slider from 'react-slick';
import Carousel, { Modal, ModalGateway } from 'react-images';

// assets
import prod1 from 'assets/images/e-commerce/prod-1.jpg';
import prod2 from 'assets/images/e-commerce/prod-2.jpg';
import prod3 from 'assets/images/e-commerce/prod-3.jpg';
import prod4 from 'assets/images/e-commerce/prod-4.jpg';
import prod5 from 'assets/images/e-commerce/prod-5.jpg';
import prod6 from 'assets/images/e-commerce/prod-6.jpg';
import prod7 from 'assets/images/e-commerce/prod-7.jpg';
import prod8 from 'assets/images/e-commerce/prod-8.jpg';
import useConfig from 'hooks/useConfig';
import './style.css';

const prodImage = require.context('assets/images/e-commerce', true);

// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //

const ProductImages = ({ skus, product, setActive, active }: { skus: any; product: any; setActive: any; active: boolean }) => {
    const imgprod = skus;
    const theme = useTheme();
    const { borderRadius } = useConfig();
    const products = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8];

    const matchDownLG = useMediaQuery(theme.breakpoints.up('lg'));
    /* const initialImage = imgprod.sku.images[0].ImageURL || product?.skus[0]?.sku?.images[0].ImageURL; */
    const [selected, setSelected] = useState(product?.skusimg[0]?.sku?.images[0]?.ImageURL);
    useEffect(() => {
        const actualizarImg = () => {
            setSelected(imgprod?.sku?.images[0]?.ImageURL || product?.skusimg[0]?.sku?.images[0]?.ImageURL);
        };
        actualizarImg();
    }, [imgprod]);

    const [modal, setModal] = useState(false);

    const images = imgprod?.sku?.images?.map((item: any) => ({ source: item?.ImageURL }));

    const lgNo = matchDownLG ? 4 : 3;

    const settings = {
        dots: false,
        centerMode: true,
        swipeToSlide: true,
        focusOnSelect: true,
        centerPadding: '0px',
        slidesToShow: imgprod?.sku?.images.length || product?.skusimg[0]?.sku?.images?.length,
        style: { display: 'flex', flexDirection: 'row' }
    };

    return (
        <>
            <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                <Grid item xs={12}>
                    <MainCard content={false} sx={{ m: '0 auto' }}>
                        <CardMedia
                            onClick={() => setModal(!modal)}
                            component="img"
                            image={selected}
                            sx={{ borderRadius: `${borderRadius}px`, overflow: 'hidden', cursor: 'zoom-in' }}
                        />
                    </MainCard>
                </Grid>
                <Grid item xs={11} sm={7} md={9} lg={10} xl={8}>
                    <Slider {...settings}>
                        {(imgprod?.sku.length &&
                            imgprod?.sku?.images?.map((item: any, index: Key | null | undefined) => (
                                <Box key={index} onClick={() => setSelected(item?.ImageURL)} sx={{ p: 1 }}>
                                    <Avatar
                                        outline={selected === item}
                                        size={matchDownLG ? 'lg' : 'md'}
                                        color="primary"
                                        src={item?.ImageURL}
                                        variant="rounded"
                                        sx={{ m: '0 auto', cursor: 'pointer' }}
                                    />
                                </Box>
                            ))) ||
                            product?.skusimg[0]?.sku?.images?.map((item: any, index: Key | null | undefined) => (
                                <Box key={index} onClick={() => setSelected(item?.ImageURL)} sx={{ p: 1 }}>
                                    <Avatar
                                        outline={selected === item}
                                        size={matchDownLG ? 'lg' : 'md'}
                                        color="primary"
                                        src={item?.ImageURL}
                                        variant="rounded"
                                        sx={{ m: '0 auto', cursor: 'pointer' }}
                                    />
                                </Box>
                            ))}
                    </Slider>
                </Grid>
            </Grid>
            <ModalGateway>
                {modal ? (
                    <Modal onClose={() => setModal(!modal)}>
                        <Carousel views={images} />
                    </Modal>
                ) : null}
            </ModalGateway>
        </>
    );
};

export default ProductImages;
