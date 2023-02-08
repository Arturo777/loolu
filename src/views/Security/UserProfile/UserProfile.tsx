import React, { FormEvent, useEffect, useState } from 'react';

// material-ui
import { Grid, TextField, Divider, Select, MenuItem, FormControl, InputLabel, Button, SelectChangeEvent, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

// third-party imports
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';

// project imports
import { gridSpacing } from 'store/constant';
import Loader from 'ui-component/Loader';
import { useDispatch, useSelector } from 'store';

// actions
import { openSnackbar } from 'store/slices/snackbar';
import { getApprovalProfiles, getProfiles, getProviders, getUserInfo, updateUserInfo } from 'store/slices/security';

// assets

// types
import { UserType } from 'types/user-profile';

const UserProfile = () => {
    // hooks
    const { userId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();

    // store
    const { currentUser, loading, loadingEditInfo, profiles, providers, approvalProfiles, fetching } = useSelector((state) => state.user);

    // vars
    const [user, setUser] = useState<UserType | undefined>();

    useEffect(() => {
        setUser(currentUser);
    }, [currentUser]);

    useEffect(() => {
        if (userId) {
            dispatch(getUserInfo(Number(userId))).then(() => {
                dispatch(getProfiles({ idMerchant: 1 }));
                dispatch(getProviders());
                dispatch(getApprovalProfiles());
            });
        }
    }, [userId, dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const newUser: UserType = { ...user!, [name]: value };

        setUser(newUser);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dataSend = {
            ...user,
            employeNumber: user?.employeNumber ?? '',
            profile: { id: user?.profile.id ?? '' },
            provider: { idProvider: user?.provider?.idProvider ?? '' }
        };

        dispatch(updateUserInfo(dataSend)).then(() => {
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
            navigate('/users');
        });
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;

        if (name === 'provider-select') {
            const newUser: UserType = { ...user!, provider: { ...user?.provider!, idProvider: value } };
            setUser(newUser);
        } else if (name === 'profile-select') {
            const newUser: UserType = { ...user!, profile: { ...user?.profile!, id: value } };
            setUser(newUser);
        } else if (name === 'approval-select') {
            const newUser: UserType = { ...user!, idApprovalProfile: value };
            setUser(newUser);
        }
    };

    if (loading || user === null) return <Loader />;

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <TextField fullWidth label="Usuario" value={user?.user ?? ''} name="user" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <TextField fullWidth label="Nombre" value={user?.firstName ?? ''} name="firstName" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <TextField fullWidth label="Apellidos" value={user?.lastName ?? ''} name="lastName" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <TextField fullWidth label="Email" value={user?.email ?? ''} name="email" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <TextField fullWidth label="Teléfono" value={user?.phoneNumber ?? ''} name="phoneNumber" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <TextField
                        fullWidth
                        label="Número de empleado"
                        value={user?.employeNumber ?? ''}
                        name="employeNumber"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} pt={4} pl={3}>
                    <Divider />
                </Grid>
                {!loadingEditInfo && !loading && !!profiles.length && (
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel id="select-profile-id">Perfil</InputLabel>
                            <Select
                                labelId="select-profile-id"
                                id="select-profile"
                                label="Perfil"
                                fullWidth
                                value={user?.profile.id.toString() ?? ''}
                                name="profile-select"
                                onChange={handleSelectChange}
                            >
                                {profiles.map(({ id, type }) => (
                                    <MenuItem key={`profile-${id}`} value={id}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                )}
                {!loadingEditInfo && !loading && !!providers.length && (
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel id="select-provider-id">Proveedor</InputLabel>
                            <Select
                                labelId="select-provider-id"
                                id="select-provider"
                                label="Proveedor"
                                fullWidth
                                value={user?.provider?.idProvider?.toString() ?? ''}
                                name="provider-select"
                                onChange={handleSelectChange}
                            >
                                {providers.map(({ idProvider, name }) => (
                                    <MenuItem key={`provider-${idProvider}`} value={idProvider}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                )}
                {!loadingEditInfo && !loading && !!approvalProfiles.length && (
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel id="select-aproval-profile-id">Perfil de aprobación</InputLabel>
                            <Select
                                labelId="select-aproval-profile-id"
                                id="select-aproval-profile"
                                label="Perfil de aprobación"
                                fullWidth
                                value={user?.idApprovalProfile?.toString() ?? ''}
                                name="approval-select"
                                onChange={handleSelectChange}
                            >
                                {approvalProfiles.map(({ idProfile, profileName }) => (
                                    <MenuItem key={`aproval-provider-${idProfile}`} value={idProfile}>
                                        {profileName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button disabled={fetching || loading || loadingEditInfo} variant="outlined" startIcon={<SaveIcon />} type="submit">
                            {intl.formatMessage({ id: 'save' })}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default UserProfile;
