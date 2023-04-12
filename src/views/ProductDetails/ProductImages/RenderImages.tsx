/* eslint-disable prettier/prettier */
import { useEffect, useMemo, useRef, useState } from 'react';

// material-ui
import { SxProps } from '@mui/material/styles';
import { Box, CardMedia, Collapse, Grid, IconButton } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

// project import
import MainCard from 'ui-component/cards/MainCard';

// third-party
import Carousel, { Modal, ModalGateway } from 'react-images';

import useConfig from 'hooks/useConfig';
import '../style.css';
import { customMiniScrollBar } from 'ui-component/MultiMerchantButton/components';

export default function RenderImages({ images, localImages }: { images: { source: string; id: number }[]; localImages: File[] }) {
    // hooks
    // const theme = useTheme();
    const { borderRadius } = useConfig();

    // ref
    const carouselContainer = useRef<HTMLDivElement | null>();

    // data
    const [newImages, setNewImages] = useState<{ source: string }[]>([]);
    const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);
    const [modal, setModal] = useState(false);

    const toRenderImages: { source: string }[] = useMemo(() => [...images, ...newImages], [newImages, images]);

    useEffect(() => {
        const convertImagesToImageInfo = async () => {
            try {
                const imageInfoArray = await convertFilesToImageInfo(localImages);
                setNewImages(imageInfoArray);
            } catch (error) {
                console.error(error);
            }
        };

        convertImagesToImageInfo();
    }, [localImages]);

    const handleScrollLeft = () => {
        if (carouselContainer.current) {
            carouselContainer.current.scrollLeft -= 100; // Adjust the scroll amount as needed
        }
    };

    const handleScrollRight = () => {
        if (carouselContainer.current) {
            carouselContainer.current.scrollLeft += 100; // Adjust the scroll amount as needed
        }
    };

    const renderThumbnails = useMemo(() => {
        console.log(toRenderImages);
        return toRenderImages.map((image, index) => (
            <ThumbnailImage image={image} isActive={activeThumbnailIndex === index} handleClick={() => setActiveThumbnailIndex(index)} />
        ));
    }, [activeThumbnailIndex, toRenderImages]);

    return (
        <>
            <Grid container>
                <Grid item xs={12} p={0}>
                    {toRenderImages && Boolean(toRenderImages.length) && (
                        <MainCard component="section" content={false} sx={{ m: '0 auto' }}>
                            <CardMedia
                                onClick={() => setModal(!modal)}
                                component="img"
                                image={toRenderImages[activeThumbnailIndex].source}
                                sx={{ borderRadius: `${borderRadius}px`, overflow: 'hidden', width: 1, height: 380, cursor: 'zoom-in' }}
                            />
                        </MainCard>
                    )}
                </Grid>
                <Grid item xs={12}>
                    {toRenderImages && Boolean(toRenderImages.length) && (
                        <Box sx={{ position: 'relative', mt: 3 }}>
                            <Box
                                ref={carouselContainer}
                                sx={{
                                    overflowY: 'hidden',
                                    overflowX: 'auto',
                                    p: 0,
                                    whiteSpace: 'nowrap',
                                    scrollBehavior: 'smooth',
                                    width: 1,
                                    maxWidth: 1,
                                    ...customMiniScrollBar
                                }}
                            >
                                <Box sx={{ display: 'flex' }}>{renderThumbnails}</Box>
                            </Box>
                            <IconButton
                                sx={{
                                    ...buttonStyles,
                                    left: 0
                                }}
                                onClick={handleScrollLeft}
                            >
                                <NavigateBeforeIcon />
                            </IconButton>

                            <IconButton sx={{ ...buttonStyles, right: 0 }} onClick={handleScrollRight}>
                                <NavigateNextIcon />
                            </IconButton>
                        </Box>
                    )}
                </Grid>
            </Grid>
            <ModalGateway>
                {modal ? (
                    <Modal onClose={() => setModal(!modal)}>
                        <Carousel views={toRenderImages} />
                    </Modal>
                ) : null}
            </ModalGateway>
        </>
    );
}

const ThumbnailImage = ({ image, isActive, handleClick }: { image: { source: string }; isActive: boolean; handleClick: () => void }) => (
    <Box
        sx={{
            width: '70px',
            height: '70px',
            background: 'pink',
            flex: '0 0 auto',
            marginRight: '8px',
            flexShrink: 0,
            mr: 1
        }}
    >
        <Box
            component="img"
            src={image.source}
            alt={`Thumbnail `}
            sx={{ ...thumbnailStyles, border: isActive ? '2px solid blue' : '' }}
            // className={activeThumbnailIndex === index ? 'active' : ''}
            onClick={handleClick}
        />
    </Box>
);

const buttonStyles: SxProps = {
    position: 'absolute',
    top: 'calc(50% - 18px)'
};

const thumbnailStyles = {
    width: 1,
    height: 1,
    objectFit: 'cover',
    scrollSnapAlign: 'center',
    cursor: 'pointer',
    marginRight: '10px'
    // Add styles for the active thumbnail
};

const convertFilesToImageInfo = async (files: File[]): Promise<{ source: string }[]> => {
    const imageInfoArray: { source: string }[] = [];

    // Use Promise.all to handle multiple asynchronous file reader operations concurrently
    await Promise.all(
        files.map(
            (file, index) =>
                new Promise<void>((resolve, reject) => {
                    const fileReader = new FileReader();

                    fileReader.onload = (event) => {
                        if (event.target && event.target.result) {
                            // Push image info object to the array with source and id properties
                            imageInfoArray.push({ source: event.target.result.toString() });

                            resolve();
                        } else {
                            reject(new Error('Failed to read file'));
                        }
                    };

                    fileReader.onerror = (error) => {
                        reject(error);
                    };

                    fileReader.readAsDataURL(file);
                })
        )
    );

    return imageInfoArray;
};

// interface ImageInfo {
//     source: string;
// }

// function convertFilesToImageInfo(files: File[]): ImageInfo[] {
//     const imageInfoList: ImageInfo[] = [];
//     const reader = new FileReader();

//     const loadImageInfo = (file: File) =>
//         new Promise<ImageInfo>((resolve) => {
//             reader.onload = (e) => {
//                 const imageInfo: ImageInfo = {
//                     source: e.target?.result as string
//                 };
//                 resolve(imageInfo);
//             };
//             reader.readAsDataURL(file);
//         });

//     const loadNextImageInfo = (index: number) => {
//         if (index === files.length) {
//             return;
//         }
//         const file = files[index];
//         loadImageInfo(file).then((imageInfo: ImageInfo) => {
//             imageInfoList.push(imageInfo);
//             loadNextImageInfo(index + 1);
//         });
//     };

//     loadNextImageInfo(0);
//     return imageInfoList;
// }
