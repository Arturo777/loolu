import React, { useState } from 'react';

// mui imports
import { FormControlLabel, FormGroup, Switch } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ProfileForm from './form';
import { FormattedMessage } from 'react-intl';

const ProfileFormView = () => {
    const [profileStatus, setProfileStatus] = useState<boolean>(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfileStatus(event.target.checked);
    };

    return (
        <MainCard
            title="Editar perfil"
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
            <ProfileForm />
        </MainCard>
    );
};

export default ProfileFormView;
