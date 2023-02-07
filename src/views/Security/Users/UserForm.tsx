import React, { useEffect } from 'react';

// material-ui
import {
    CircularProgress,
    Collapse,
    Divider,
    Fade,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from '@mui/material';

// project imports
import { useDispatch, useSelector } from 'store';

// types
import { UserType } from 'types/user-profile';
import { getApprovalProfiles, getProfiles, getProviders } from 'store/slices/security';

export default function UserForm({
    handleChange,
    user,
    handleSelectChange
}: {
    user: NewUserType;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange: (e: SelectChangeEvent) => void;
}) {
    // hooks
    const dispatch = useDispatch();

    // store
    const { profiles, providers, approvalProfiles, loadingEditInfo } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getProfiles());
        dispatch(getProviders());
        dispatch(getApprovalProfiles());
    }, []);

    return (
        <>
            <Grid item {...gridInputProps}>
                <TextField fullWidth label="Usuario" value={user?.user ?? ''} name="user" onChange={handleChange} />
            </Grid>
            <Grid item {...gridInputProps}>
                <TextField fullWidth label="Nombre" value={user?.firstName ?? ''} name="firstName" onChange={handleChange} />
            </Grid>
            <Grid item {...gridInputProps}>
                <TextField fullWidth label="Apellidos" value={user?.lastName ?? ''} name="lastName" onChange={handleChange} />
            </Grid>
            <Grid item {...gridInputProps}>
                <TextField fullWidth label="Email" value={user?.email ?? ''} name="email" onChange={handleChange} />
            </Grid>
            <Grid item {...gridInputProps}>
                <TextField fullWidth label="Teléfono" value={user?.phoneNumber ?? ''} name="phoneNumber" onChange={handleChange} />
            </Grid>
            <Grid item {...gridInputProps}>
                <TextField
                    fullWidth
                    label="Número de empleado"
                    value={user?.employeNumber ?? ''}
                    name="employeNumber"
                    onChange={handleChange}
                />
            </Grid>

            {/* <Grid item xs={12} pt={4} pl={3}>
                <Divider />
            </Grid> */}

            <Grid item {...gridInputProps}>
                <Fade in={!loadingEditInfo}>
                    <FormControl fullWidth>
                        <InputLabel id="select-profile-id">Perfil</InputLabel>
                        <Select
                            labelId="select-profile-id"
                            id="select-profile"
                            label="Perfil"
                            fullWidth
                            value={user?.profileId}
                            name="profileId"
                            onChange={handleSelectChange}
                        >
                            {profiles &&
                                profiles.map(({ id, type }) => (
                                    <MenuItem key={`profile-${id}`} value={id}>
                                        {type}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Fade>
            </Grid>

            <Grid item {...gridInputProps}>
                <Fade in={!loadingEditInfo}>
                    <FormControl fullWidth>
                        <InputLabel id="select-provider-id">Proveedor</InputLabel>
                        <Select
                            labelId="select-provider-id"
                            id="select-provider"
                            label="Proveedor"
                            fullWidth
                            value={user?.providerId}
                            name="providerId"
                            onChange={handleSelectChange}
                        >
                            {providers &&
                                providers.map(({ idProvider, name }) => (
                                    <MenuItem key={`provider-${idProvider}`} value={idProvider}>
                                        {name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Fade>
            </Grid>

            <Grid item {...gridInputProps}>
                <Fade in={!loadingEditInfo}>
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
                            {approvalProfiles &&
                                approvalProfiles.map(({ idProfile, profileName }) => (
                                    <MenuItem key={`aproval-provider-${idProfile}`} value={idProfile}>
                                        {profileName}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Fade>
            </Grid>
        </>
    );
}

export type NewUserType = Omit<UserType, 'profile' | 'provider'> & {
    profileId: string;
    providerId: string;
};

const gridInputProps = {
    xs: 12,
    sm: 6,
    xl: 4
};
