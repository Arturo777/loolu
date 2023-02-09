import React, { useEffect, useState } from 'react';

// material-ui
import {
    Grid,
    Divider,
    Button,
    Box,
    Card,
    Fade,
    Typography,
    Stack,
    IconButton,
    useMediaQuery,
    Modal,
    useTheme,
    SelectChangeEvent
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

// third-party imports
import { useIntl } from 'react-intl';

// project imports
import { gridSpacing } from 'store/constant';
import { useDispatch } from 'store';

// types
import { updateUserInfo } from 'store/slices/security';
import { UserType } from 'types/user-profile';
import UserForm, { NewUserType, defaultUser, modalStyle } from './UserForm';
import { openSnackbar } from 'store/slices/snackbar';

export default function EditUser({
    userToEdit,
    show,
    handleCancel,
    handleSuccess
}: {
    userToEdit: UserType;
    show: boolean;
    handleCancel: () => void;
    handleSuccess: (mode: 'EDIT') => void;
}) {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();
    const theme = useTheme();
    const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('xl'));

    // consts
    const [userInfo, setUserInfo] = useState<NewUserType>(defaultUser);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    // set initial data
    useEffect(() => {
        // console.log(userToEdit);
        if (userToEdit) {
            setUserInfo({
                ...userToEdit,
                profileId: userToEdit.profile.id.toString() ?? '',
                providerId: userToEdit?.provider?.idProvider.toString() ?? '',
                employeNumber: `${userToEdit?.employeNumber ?? ''}`
            });
        }
    }, [userToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUserInfo((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;

        setUserInfo((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsFetching(true);
        const dataSend = {
            ...userToEdit,
            ...userInfo,
            employeNumber: userToEdit.employeNumber ?? '',
            profile: { id: userInfo.profileId ?? '' },
            provider: { idProvider: userInfo.providerId ?? '' }
        };

        dispatch(updateUserInfo(dataSend))
            .then(() => {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Usuario actualizado correctamente',
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: false
                    })
                );
                handleSuccess('EDIT');
            })
            .finally(() => {
                setIsFetching(false);
            });
    };

    const content = () => (
        <>
            <Stack mb={2} direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h3">
                    {intl.formatMessage({
                        id: 'edit_user'
                    })}
                </Typography>
                <IconButton onClick={handleCancel} sx={{ color: 'divider' }}>
                    <CloseOutlinedIcon />
                </IconButton>
            </Stack>
            <Divider sx={{ mb: 3 }} />

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={gridSpacing}>
                    <UserForm user={userInfo} handleChange={handleChange} handleSelectChange={handleSelectChange} />

                    <Grid item xs={12}>
                        <Divider sx={{ mb: 1 }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={handleCancel} variant="outlined" color="error" sx={{ mr: 2 }} startIcon={<CloseIcon />}>
                                {intl.formatMessage({ id: 'cancel' })}
                            </Button>

                            <Button disabled={isFetching} variant="outlined" startIcon={<SaveIcon />} type="submit">
                                {intl.formatMessage({ id: 'save' })}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );

    if (!userToEdit) {
        return null;
    }

    if (onlyMediumScreen) {
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
            <Card elevation={2} sx={{ p: 3, position: 'sticky', top: 100, bottom: 0 }}>
                {content()}
            </Card>
        </Fade>
    );
}
