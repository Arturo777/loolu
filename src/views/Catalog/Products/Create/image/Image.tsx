import { useEffect, useState } from 'react';
import { Box, InputLabel, TextField, Typography } from '@mui/material';
import ProductImages from './ProductImages';
import { FormattedMessage } from 'react-intl';

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { borderRadius } from '@mui/system';

const ButtonUploadImages = ({ uploadImages }: any) => (
    <Box className="file-label">
        <input
            multiple
            type="file"
            name="files"
            className="file-input"
            accept="image/jpg, image/jpeg, image/png"
            id="file-upload"
            onChange={uploadImages}
            style={{ display: 'none' }}
        />
        <InputLabel
            htmlFor="file-upload"
            sx={{
                py: 2.5,
                px: 0,
                textAlign: 'center',
                borderRadius: '4px',
                cursor: 'pointer',
                '& > svg': {
                    verticalAlign: 'sub',
                    mr: 0.5
                }
            }}
        >
            <CloudUploadIcon /> <FormattedMessage id="click_here" />
        </InputLabel>
    </Box>
);

export default function Image({ removeImages, uploadImages, uploadedImages = [] }: any) {
    const [buttonUploadImagesVisible, setButtonUploadImagesVisible] = useState(true);

    useEffect(() => {
        if (uploadedImages?.length) {
            setButtonUploadImagesVisible(false);
            return;
        }
        setButtonUploadImagesVisible(true);
    }, [uploadedImages]);

    return (
        <Box className="field">
            <Box className="block px-3 py-3">
                <Box className="columns is-multiline">
                    {!uploadedImages.length ? (
                        <Box
                            sx={{
                                background: '#212946',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                width: '100%',
                                border: '1px dashed rgba(60, 63, 76, 1)',
                                borderRadius: '10px'
                            }}
                            height={618}
                        >
                            {buttonUploadImagesVisible === true && <ButtonUploadImages uploadImages={uploadImages} />}
                        </Box>
                    ) : (
                        <ProductImages images={uploadedImages} removeImages={removeImages} />
                    )}
                </Box>
            </Box>
            {buttonUploadImagesVisible === false && <ButtonUploadImages uploadImages={uploadImages} />}
        </Box>
    );
}
