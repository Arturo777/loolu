import React from 'react';

// mui imports

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ProfileForm from '../ProfileForm';
import { useIntl } from 'react-intl';
import { NewProfileType } from 'types/security';
import { useDispatch } from 'store';
import { createProfileService } from 'store/slices/security';
import { useNavigate } from 'react-router-dom';

const ProfileFormView = () => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSave = async (data: NewProfileType) => {
        await dispatch(createProfileService({ ...data, idStatus: true }));

        navigate('/profiles');
    };

    return (
        <MainCard
            title={intl.formatMessage({
                id: 'create_profile'
            })}
        >
            <ProfileForm handleSaveClick={handleSave} mode="create" />
        </MainCard>
    );
};

export default ProfileFormView;
