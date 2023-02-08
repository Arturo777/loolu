import React from 'react';

// mui imports
import { Card, Fade, Stack, Typography, IconButton, useTheme, useMediaQuery, Box, Modal } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

// third-party imports
import { useIntl } from 'react-intl';

// project imports
import { useDispatch } from 'store';
import ProfileForm, { modalStyle } from './ProfileForm';
import { createProfileService } from 'store/slices/security';

// types
import { NewProfileType } from 'types/security';

export default function CreateProfile({
    handleCancel,
    show,
    handleSuccess
}: {
    handleSuccess: () => void;
    handleCancel: () => void;
    show: boolean;
}) {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();

    const theme = useTheme();
    const downXl = useMediaQuery(theme.breakpoints.down('xl'));

    const handleSave = async (data: NewProfileType) => {
        await dispatch(createProfileService({ ...data, idStatus: true }));
        handleSuccess();
    };

    const content = () => (
        <>
            <Stack mb={2} direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h3">
                    {intl.formatMessage({
                        id: 'create_profile'
                    })}
                </Typography>
                <IconButton onClick={handleCancel} sx={{ color: 'divider' }}>
                    <CloseOutlinedIcon />
                </IconButton>
            </Stack>
            <ProfileForm handleCancel={handleCancel} handleSaveClick={handleSave} mode="CREATE" />
        </>
    );

    if (downXl) {
        return (
            <Modal
                open={show}
                onClose={handleCancel}
                aria-labelledby="modal-edit-category"
                aria-describedby="modal-render-form-edit-category"
            >
                <Box sx={modalStyle}> {content()}</Box>
            </Modal>
        );
    }

    return (
        <Fade in={show}>
            <Card elevation={2} sx={{ p: 3, position: 'sticky', top: 100, bottom: 100 }}>
                {content()}
            </Card>
        </Fade>
    );
}
