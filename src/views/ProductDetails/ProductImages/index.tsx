/* eslint-disable prettier/prettier */

// material-ui
import { Box } from '@mui/material';

// project import
import RenderImages from './RenderImages';

// third-party

// styles
import '../style.css';
import ImageUploader from './ImageUploader';
import { useEffect, useMemo, useState } from 'react';
import { Skus } from 'types/e-commerce';

// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //

const ProductImages = ({
    skus,
    valueSku,
    product,
    setActive,
    active
}: {
    skus: Skus[] | null;
    valueSku: string | number;
    product: any;
    setActive: any;
    active: boolean;
}) => {
    const [toUploadImages, setToUploadImages] = useState<File[]>([]);

    useEffect(() => {}, [skus, valueSku]);

    const images: { source: string; id: number }[] = useMemo(() => {
        if (skus && valueSku) {
            const filteredSku = skus.find((item) => Number(item.skuID) === Number(valueSku));

            let newImages: { source: string; id: number }[] = [];

            if (filteredSku && filteredSku.images) {
                newImages = filteredSku?.images.map((item) => ({ source: item.ImageURL, id: item.IdImage }));
            }

            return newImages;
        }

        return [];
    }, [skus, valueSku]);

    // const images: { source: string; id: number }[] = [
    //     // { source: 'https://via.placeholder.com/300x200/8B4513', id: 1 },
    //     // { source: 'https://via.placeholder.com/300x200/A0522D', id: 2 }
    //     // { source: 'https://via.placeholder.com/300x200/CD853F', id: 3 }
    //     // { source: 'https://via.placeholder.com/300x200/D2691E', id: 4 },
    //     // { source: 'https://via.placeholder.com/300x200/8B7E66', id: 5 },
    //     // { source: 'https://via.placeholder.com/300x200/8B7765', id: 6 },
    //     // { source: 'https://via.placeholder.com/300x200/8B4513', id: 7 },
    //     // { source: 'https://via.placeholder.com/300x200/A0522D', id: 8 },
    //     // { source: 'https://via.placeholder.com/300x200/CD853F', id: 9 },
    //     // { source: 'https://via.placeholder.com/300x200/D2691E', id: 10 },
    //     // { source: 'https://via.placeholder.com/300x200/8B7E66', id: 11 },
    //     // { source: 'https://via.placeholder.com/300x200/8B7765', id: 12 }
    // ];

    return (
        <Box
            sx={{
                width: 1,
                position: 'sticky',
                top: 100
            }}
        >
            <RenderImages images={images} localImages={toUploadImages} />

            <ImageUploader
                onImageUpload={(files) => {
                    console.log(files);
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
