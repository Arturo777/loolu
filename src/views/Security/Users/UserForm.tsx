import React, { useEffect } from 'react';

// material-ui
import { Fade, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

import { useIntl } from 'react-intl';

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
    const intl = useIntl();
    const dispatch = useDispatch();

    // store
    const { profiles, providers, approvalProfiles, loadingEditInfo } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getProfiles({}));
        dispatch(getProviders());
        dispatch(getApprovalProfiles());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Grid item {...gridInputProps}>
                <TextField
                    fullWidth
                    label={intl.formatMessage({ id: 'user' })}
                    value={user?.user ?? ''}
                    name="user"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item {...gridInputProps}>
                <TextField
                    fullWidth
                    label={intl.formatMessage({ id: 'first_name' })}
                    value={user?.firstName ?? ''}
                    name="firstName"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item {...gridInputProps}>
                <TextField
                    fullWidth
                    label={intl.formatMessage({ id: 'last_name' })}
                    value={user?.lastName ?? ''}
                    name="lastName"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item {...gridInputProps}>
                <TextField
                    fullWidth
                    label={intl.formatMessage({ id: 'email' })}
                    value={user?.email ?? ''}
                    name="email"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item {...gridInputProps}>
                <TextField
                    fullWidth
                    label={intl.formatMessage({ id: 'phone' })}
                    value={user?.phoneNumber ?? ''}
                    name="phoneNumber"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item {...gridInputProps}>
                <TextField
                    fullWidth
                    label={intl.formatMessage({ id: 'employee_number' })}
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
                        <InputLabel id="select-profile-id">{intl.formatMessage({ id: 'profile' })}</InputLabel>
                        <Select
                            labelId="select-profile-id"
                            id="select-profile"
                            label={intl.formatMessage({ id: 'profile' })}
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
                        <InputLabel id="select-provider-id">{intl.formatMessage({ id: 'provider' })}</InputLabel>
                        <Select
                            labelId="select-provider-id"
                            id="select-provider"
                            label={intl.formatMessage({ id: 'provider' })}
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
                        <InputLabel id="select-aproval-profile-id">{intl.formatMessage({ id: 'approval_profile' })}</InputLabel>
                        <Select
                            labelId="select-aproval-profile-id"
                            id="select-aproval-profile"
                            label={intl.formatMessage({ id: 'approval_profile' })}
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

export type NewUserType = Omit<UserType, 'profile' | 'provider' | 'employeNumber'> & {
    profileId: string;
    providerId: string;
    employeNumber: string;
};

const gridInputProps = {
    xs: 12,
    sm: 6,
    xl: 4
};

export const defaultUser: NewUserType = {
    id: 0,
    email: '',
    name: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    status: 1,
    user: '',
    employeNumber: '',
    avatar: '',
    idApprovalProfile: '',
    pass: '',
    profileId: '',
    providerId: ''
};

export const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    maxWidth: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 3,
    pb: 3,
    borderRadius: 2
};
