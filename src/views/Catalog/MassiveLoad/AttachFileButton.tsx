import React, { useState, ChangeEvent, useRef, FormEvent } from 'react';

// mui
import { Box, Typography, Collapse, IconButton, Button, Stack } from '@mui/material';
import AttachmentIcon from '@mui/icons-material/Attachment';
import CloseIcon from '@mui/icons-material/Close';

// third-party imports
import { useIntl } from 'react-intl';
import { useDispatch } from 'store';

// project imports
import { openSnackbar } from 'store/slices/snackbar';
import { uploadMassiveFile } from 'store/slices/catalog';

export default function AttachFileButton() {
    // hooks
    const dispatch = useDispatch();
    const intl = useIntl();

    // refs
    const formRef = useRef<HTMLFormElement>(null);

    // store
    // const { user } = useAuth();

    // vars
    const [file, setFile] = useState<File | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
            // setFileName(event.target.files[0].name);

            event.target.files = null;
        }
    };

    const handleCleanForm = () => {
        formRef.current?.reset();
        setFile(null);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!file) return;

        if (file.size > 9437184) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Tamaño de archivo excedido',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
                })
            );
            return;
        }

        setIsLoading(true);

        dispatch(
            uploadMassiveFile({
                idMerchant: 1,
                file,
                user: 'ohuitron'
                // user: user?.user
            })
        )
            .then(() => {
                handleCleanForm();
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Stack component="form" onSubmit={handleSubmit} direction="row" ref={formRef}>
            <Collapse in={Boolean(file && !isLoading)} orientation="horizontal" collapsedSize={0}>
                <IconButton size="small" color="error" onClick={handleCleanForm}>
                    <CloseIcon />
                </IconButton>
            </Collapse>
            <Button
                disabled={isLoading}
                color="secondary"
                variant="outlined"
                component="label"
                sx={{ mr: file ? 2 : 1, display: 'flex', alignItems: 'center' }}
                startIcon={<AttachmentIcon />}
            >
                <Typography>
                    {file
                        ? file.name
                        : intl.formatMessage({
                              id: 'attach_file'
                          })}
                </Typography>
                <Box
                    sx={{
                        display: 'none'
                    }}
                    component="input"
                    multiple={false}
                    onChange={handleChange}
                    type="file"
                    accept=".xls,.xlsx"
                />
            </Button>

            <Collapse in={Boolean(file)} orientation="horizontal" collapsedSize={0}>
                <Button disabled={isLoading} type="submit" variant="contained">
                    {intl.formatMessage({
                        id: isLoading ? 'loading' : 'upload'
                    })}
                </Button>
            </Collapse>
        </Stack>
    );
}
