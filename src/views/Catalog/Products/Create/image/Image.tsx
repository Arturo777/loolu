import { Box, InputLabel, TextField, Typography } from '@mui/material';
import ProductImages from './ProductImages';
import { FormattedMessage } from 'react-intl';

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function Image({ removeImages, uploadImages, uploadedImages = [] }: any) {
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
                                flexDirection: 'column'
                            }}
                            width={618}
                            height={618}
                        >
                            <Typography variant="h4" sx={{ mt: 2 }}>
                                <FormattedMessage id="upload-images" />
                            </Typography>
                            <KeyboardDoubleArrowDownIcon sx={{ fontSize: '50px' }} />
                        </Box>
                    ) : (
                        <ProductImages images={uploadedImages} removeImages={removeImages} />
                    )}
                </Box>
            </Box>
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
        </Box>
    );
}
