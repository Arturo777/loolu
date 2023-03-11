import React, { useState } from 'react';
import { useDropzone, DropzoneOptions, FileRejection } from 'react-dropzone';

interface Image {
    file: File;
    src: string;
}

interface Props {
    images: Image[];
    setImages: (images: Image[]) => void;
}

const DragAndDrop: React.FC<Props> = ({ images, setImages }) => {
    const [currentImage, setCurrentImage] = useState<Image | null>(null);

    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                const newImage = { file, src: reader.result as string };
                setCurrentImage(newImage);
                setImages([...images, newImage]);
            };
            reader.readAsDataURL(file);
        });
    };

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const onDropRejected = (rejectedFiles: FileRejection[]) => {
        console.log('File rejected:', rejectedFiles[0].file.name);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        onDragOver,
        onDragEnter,
        onDragLeave,
        onDropRejected,
        accept: 'image/*' as unknown as DropzoneOptions['accept'],
        multiple: true
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? <p>Drop the images here ...</p> : <p>Drag and drop some images here, or click to select images</p>}
            {currentImage && <img src={currentImage.src} alt="UploadedImage" />}
        </div>
    );
};

export default DragAndDrop;
