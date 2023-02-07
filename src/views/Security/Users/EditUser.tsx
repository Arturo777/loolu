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
    CircularProgress,
    Modal,
    useTheme,
    SelectChangeEvent
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

// third-party imports
import { useIntl } from 'react-intl';
import { useNavigate, useSearchParams } from 'react-router-dom';

// project imports
import { gridSpacing } from 'store/constant';

// types
import { UserType } from 'types/user-profile';
import UserForm, { NewUserType } from './UserForm';

export default function EditUser({ userToEdit, show, handleCancel }: { userToEdit: UserType; show: boolean; handleCancel: () => void }) {
    // hooks
    const intl = useIntl();
    const theme = useTheme();
    const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    // conts
    const [userInfo, setUserInfo] = useState<NewUserType>(defaultUser);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    // set initial data
    useEffect(() => {
        // console.log(userToEdit);
        if (userToEdit) {
            setUserInfo({
                ...userToEdit,
                profileId: userToEdit.profile.id.toString() ?? '',
                providerId: userToEdit?.provider?.idProvider.toString() ?? ''
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

        // if (name === 'provider-select') {
        //     // const newUser: UserType = { ...userInfo!, provider: { ...userInfo?.provider!, idProvider: value } };
        //     setUserInfo((pre));
        // } else if (name === 'profile-select') {
        //     // const newUser: UserType = { ...userInfo!, profile: { ...userInfo?.profile!, id: value } };
        //     setUserInfo(newUser);
        // } else if (name === 'approval-select') {
        //     // const newUser: UserType = { ...userInfo!, idApprovalProfile: value };
        //     setUserInfo(newUser);
        // }
    };

    const content = () => (
        <>
            <Stack mb={2} direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h3">Edit user</Typography>
                <IconButton onClick={handleCancel} sx={{ color: 'divider' }}>
                    <CloseOutlinedIcon />
                </IconButton>
            </Stack>
            <Divider sx={{ mb: 3 }} />

            <Box component="form">
                <Grid container spacing={gridSpacing}>
                    <UserForm user={userInfo} handleChange={handleChange} handleSelectChange={handleSelectChange} />

                    <Grid item xs={12}>
                        <Divider sx={{ mb: 3 }} />
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
            <Card elevation={2} sx={{ p: 3, position: 'sticky', top: 100 }}>
                {content()}
            </Card>
        </Fade>
    );
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 3,
    pb: 3,
    borderRadius: 2
};

const defaultUser: NewUserType = {
    id: 0,
    email: '',
    name: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    status: 1,
    user: '',
    employeNumber: 0,
    avatar: '',
    idApprovalProfile: 1,
    pass: '',
    profileId: '',
    providerId: ''
};
