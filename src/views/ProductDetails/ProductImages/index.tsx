/* eslint-disable prettier/prettier */

// material-ui
import { Box, CircularProgress } from '@mui/material';

// project import
import RenderImages from './RenderImages';

// third-party

// styles
import '../style.css';
import ImageUploader from './ImageUploader';
import { useEffect, useMemo, useState } from 'react';
import { Skus, skuImageType } from 'types/e-commerce';
import { useSelector } from 'store';
import { filter } from 'lodash';

// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //

const ProductImages = ({
    skus,
    valueSku,
    product,
    setActive,
    active,
    handleChange,
    handleDelete,
    toDeleteImages
}: {
    skus: Skus[] | null;
    valueSku: string | number;
    product: any;
    setActive: any;
    active: boolean;
    handleChange: (newImages: File[]) => void;
    handleDelete: (toDelete: skuImageType) => void;
    toDeleteImages: skuImageType[];
}) => {
    const { loadingMedia } = useSelector((state) => state.product);
    const [toUploadImages, setToUploadImages] = useState<File[]>([]);

    const [images, setImages] = useState<{ source: string; id: number }[]>([]);

    useEffect(() => {
        if (skus && valueSku) {
            const filteredSku = skus.find((item) => Number(item.skuID) === Number(valueSku));

            let newImages: { source: string; id: number }[] = [];

            if (filteredSku && filteredSku.images) {
                newImages = filteredSku?.images.map((item) => ({ source: item.ImageURL, id: item.IdImage }));
            }

            const notRenderToDelete = newImages.filter((item) => {
                const willDelete = !toDeleteImages.find((itemB) => itemB.IdImage === item.id);
                return willDelete;
            });

            setImages(notRenderToDelete);
        }
    }, [skus, valueSku, toDeleteImages]);

    useEffect(() => {
        handleChange(toUploadImages);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toUploadImages]);

    if (loadingMedia) {
        return (
            <Box
                sx={{
                    width: 1,
                    position: 'sticky',
                    top: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pt: 5
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    const deleteLocal = (fileName: string) => {
        setToUploadImages((prev) => [...prev.filter((item) => item.name !== fileName)]);
    };

    const deleteImage = (imageId: number) => {
        if (skus && valueSku) {
            const filteredSku = skus.find((item) => Number(item.skuID) === Number(valueSku));

            if (filteredSku) {
                const filteredImage = filteredSku?.images.find((item) => item.IdImage === imageId);

                if (filteredImage) {
                    handleDelete(filteredImage);
                }

                setImages((prev) => [...prev.filter((item) => item.id !== imageId)]);
            }
        }
    };

    return (
        <Box
            sx={{
                width: 1,
                position: 'sticky',
                top: 100
            }}
        >
            <RenderImages images={images} localImages={toUploadImages} deleteLocal={deleteLocal} deleteImage={deleteImage} />

            <ImageUploader
                onImageUpload={(files) => {
                    setToUploadImages((prev) => [...prev, ...files]);
                }}
            />
        </Box>
    );
};

export default ProductImages;

/* {images.length > 0
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
                              ))} */
