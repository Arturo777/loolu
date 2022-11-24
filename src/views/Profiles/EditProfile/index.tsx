import React, { useEffect, useState } from 'react';

// mui imports
import { FormControlLabel, FormGroup, Switch } from '@mui/material';

// third imports
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ProfileForm from '../ProfileForm';

import { NewProfileType } from 'types/user';

import { getProfiles, updateProfileService } from 'store/slices/user';
import { useSelector } from 'store';
import { useDispatch } from 'react-redux';
import { ProfileType } from 'types/user-profile';
import Loader from 'ui-component/Loader';

const ProfileFormView = () => {
    const intl = useIntl();
    const [profileStatus, setProfileStatus] = useState<boolean>(false);
    const { profileId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState<ProfileType>();
    const { profiles } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getProfiles());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (profiles && profiles.length) {
            const profileInfo = profiles.find((item) => item.id === Number(profileId));
            if (!profileInfo) {
                navigate('/profiles');
            }
            setProfileData(profileInfo);
            setProfileStatus(profileInfo?.idStatus!);
        }
    }, [navigate, profileId, profiles]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfileStatus(event.target.checked);
    };

    const handleSave = (data: NewProfileType) => {
        console.log(data);

        if (profileId) {
            dispatch(updateProfileService({ ...data, id: profileId }));
        }
    };

    if (!profileData) return <Loader />;

    return (
        <MainCard
            title={intl.formatMessage({
                id: 'edit_profile'
            })}
            secondary={
                <FormGroup>
                    <FormControlLabel
                        checked={profileStatus}
                        control={<Switch onChange={handleChange} />}
                        labelPlacement="start"
                        label={
                            <b>
                                <FormattedMessage id={profileStatus ? 'active' : 'inactive'} />
                            </b>
                        }
                    />
                </FormGroup>
            }
        >
            <ProfileForm handleSaveClick={handleSave} fetching={false} defaultData={profileData} />
        </MainCard>
    );
};

export default ProfileFormView;
