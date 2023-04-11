import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, CardMedia, Grid, useMediaQuery, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// project import
import MainCard from 'ui-component/cards/MainCard';
import Avatar from 'ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';

// third-party
import Slider from 'react-slick';
import Carousel, { Modal, ModalGateway } from 'react-images';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const prodImage = '/assets/images/e-commerce';

// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //

const ProductImages = ({ images, removeImages }: { images: any; removeImages: any }) => {
    const theme = useTheme();

    const matchDownLG = useMediaQuery(theme.breakpoints.up('lg'));

    const [selected, setSelected] = useState(URL.createObjectURL(images[0]));
    const [modal, setModal] = useState(false);

    const lgNo = matchDownLG ? 4 : 3;

    const settings = {
        dots: false,
        infinite: false,
        swipeToSlide: true,
        focusOnSelect: true,
        centerPadding: '0px',
        slidesToShow: 3,
        slidesToScroll: 1
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
                            sx={{ borderRadius: `2px`, overflow: 'hidden', cursor: 'zoom-in' }}
                        />
                    </MainCard>
                </Grid>
                <Grid item xs={11} sm={7} md={9} lg={10} xl={8}>
                    <Slider {...settings}>
                        {images.map((item: any, index: number) => (
                            <Box key={index} onClick={() => setSelected(URL.createObjectURL(item))} sx={{ p: 1, position: 'relative' }}>
                                <Avatar
                                    outline={selected === item}
                                    size={matchDownLG ? 'lg' : 'md'}
                                    color="primary"
                                    src={URL.createObjectURL(item)}
                                    variant="rounded"
                                    sx={{ m: '0 auto', cursor: 'pointer' }}
                                />
                                <IconButton
                                    sx={{ position: 'absolute', top: 0, right: 10, p: 0, backgroundColor: '#ce0202', borderRadius: '20%' }}
                                    onClick={() => removeImages(index)}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
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
