import React from 'react';

// mui imports
import { Card, Fade, Stack, Typography, IconButton, useTheme, useMediaQuery, Box, Modal } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

// third-party imports
import { useIntl } from 'react-intl';

// project imports
import { useDispatch } from 'store';
import ProfileForm, { modalStyle } from './ProfileForm';
import { deleteMenusService, updateProfileService } from 'store/slices/security';

// types
import { NewProfileType } from 'types/security';
import { ProfileType } from 'types/user-profile';

export default function EditProfileComponent({
    handleCancel,
    show,
    profileToEdit,
    handleSuccess
}: {
    handleSuccess: () => void;
    handleCancel: () => void;
    show: boolean;
    profileToEdit: ProfileType;
}) {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();
    const theme = useTheme();
    const downXl = useMediaQuery(theme.breakpoints.down('xl'));

    const handleSave = async (data: NewProfileType) => {
        if (profileToEdit) {
            const newData = {
                description: data.description,
                idPerfil: Number(profileToEdit.id),
                idStatus: data.idStatus ?? false,
                menus: data.menus.map((menuId) => Number(menuId)),
                type: data.type
            };

            const currentMenus = profileToEdit?.menuDetails
                .map((item) => {
                    const children = item.children.map((itemA) => itemA.id);

                    return [item.id, ...children];
                })
                .flat();

            const toDelete = currentMenus?.filter((itemA) => newData.menus.indexOf(itemA) === -1) ?? [];

            await dispatch(updateProfileService({ data: newData, idMerchant: 1 }));

            await dispatch(
                deleteMenusService({
                    menus: toDelete,
                    idPerfil: Number(profileToEdit.id),
                    idMerchant: 1
                })
            );

            handleSuccess();
        }
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
            <ProfileForm defaultData={profileToEdit} handleCancel={handleCancel} handleSaveClick={handleSave} mode="EDIT" />
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
            <Card
                elevation={2}
                sx={{
                    p: 3,
                    position: 'sticky',
                    bottom: '100%',
                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.grey[100],
                    '&:hover': {
                        border: `1px solid${theme.palette.primary.main}`
                    }
                }}
            >
                {content()}
            </Card>
        </Fade>
    );
}
