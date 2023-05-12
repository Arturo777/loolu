import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

interface ImageUploaderProps {
    onImageUpload: (files: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files) {
            const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
            onImageUpload(imageFiles);
        }
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
            onImageUpload(imageFiles);
        }

        if (event.target) {
            event.target.value = '';
        }
    };

    return (
        <Box
            sx={{
                border: '1px dashed #ccc',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                p: 2,
                mt: 2,
                width: 1
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleButtonClick}
        >
            <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileInputChange} accept="image/*" multiple />
            <Stack alignItems="center" justifyContent="center">
                <InsertPhotoIcon sx={{ fontSize: 50, mb: 1 }} />
                <Typography sx={{ textAlign: 'center' }} variant="caption">
                    Click or drag and drop images here
                </Typography>
            </Stack>
        </Box>
    );
};

export default ImageUploader;

// import React, { useRef } from 'react';
// import { Box, Stack, Typography } from '@mui/material';

// import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

// interface ImageUploaderProps {
//     onImageUpload: (files: File[]) => void;
// }

// const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const handleDrop = (event: React.DragEvent) => {
//         event.preventDefault();
//         const files = event.dataTransfer.files;
//         if (files && files.type.startsWith('image/')) {
//             onImageUpload(files);
//         }
//     };

//     const handleDragOver = (event: React.DragEvent) => {
//         event.preventDefault();
//     };

//     const handleButtonClick = () => {
//         if (fileInputRef.current) {
//             fileInputRef.current.click();
//         }
//     };

//     const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files && event.target.files[0];
//         if (file && file.type.startsWith('image/')) {
//             onImageUpload(file);
//         }
//     };

//     return (
//         <Box
//             sx={{
//                 border: '1px dashed #ccc',
//                 borderRadius: '4px',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 cursor: 'pointer',
//                 p: 2,
//                 mt: 2,
//                 width: 1
//             }}
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//             onClick={handleButtonClick}
//         >
//             <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileInputChange} accept="image/*" multiple />{' '}
//             <Stack alignItems="center" justifyContent="center">
//                 <InsertPhotoIcon sx={{ fontSize: 50, mb: 1 }} />
//                 <Typography sx={{ textAlign: 'center' }} variant="caption">
//                     Click or drag and drop an image here
//                 </Typography>
//             </Stack>
//         </Box>
//     );
// };

// export default ImageUploader;
