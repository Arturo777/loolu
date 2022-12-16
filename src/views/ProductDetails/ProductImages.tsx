/* eslint-disable prettier/prettier */
import { Key, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, CardMedia, Grid, useMediaQuery } from '@mui/material';

// project import
import MainCard from 'ui-component/cards/MainCard';
import Avatar from 'ui-component/extended/Avatar';
/* import { Skus } from 'types/e-commerce'; */
import { gridSpacing } from 'store/constant';

// third-party
import Slider from 'react-slick';
import Carousel, { Modal, ModalGateway } from 'react-images';

import useConfig from 'hooks/useConfig';
import './style.css';

/* const prodImage = require.context('assets/images/e-commerce', true); */

// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //

const ProductImages = ({
    skus,
    valueSku,
    product,
    setActive,
    active
}: {
    skus: any;
    valueSku: string | number;
    product: any;
    setActive: any;
    active: boolean;
}) => {
    const [selected, setSelected] = useState(product?.skus[0]?.images[0]?.ImageURL);
    const imgprod = product?.skus.filter((sku: { skuID: any }) => sku.skuID === valueSku);
    const theme = useTheme();
    const { borderRadius } = useConfig();
    const matchDownLG = useMediaQuery(theme.breakpoints.up('lg'));
    /* const initialImage = imgprod.sku.images[0].ImageURL || product?.skus[0]?.sku?.images[0].ImageURL; */
    const [modal, setModal] = useState(false);
    const images = imgprod?.images?.map((item: any) => ({ source: item?.ImageURL }));
    const lgNo = matchDownLG ? 4 : 3;
    const settings = {
        dots: false,
        centerMode: true,
        swipeToSlide: true,
        focusOnSelect: true,
        centerPadding: '0px',
        slidesToShow: imgprod[0]?.images?.length || product?.skus[0]?.images?.length,
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
                        {imgprod.length > 0
                            ? imgprod[0]?.images?.map((item: any, index: Key | null | undefined) => (
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
                            ))
                            : product?.skus[0]?.images?.map((item: any, index: Key | null | undefined) => (
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
