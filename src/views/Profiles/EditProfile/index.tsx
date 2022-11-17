import React, { useState } from 'react';

// mui imports
import { FormControlLabel, FormGroup, Switch } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ProfileForm from '../ProfileForm';
import { FormattedMessage, useIntl } from 'react-intl';
import { NewProfileType } from 'types/user';

const ProfileFormView = () => {
    const intl = useIntl();
    const [profileStatus, setProfileStatus] = useState<boolean>(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfileStatus(event.target.checked);
    };

    const handleSave = (data: NewProfileType) => {
        console.log(data);
    };

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
            <ProfileForm handleSaveClick={handleSave} fetching={false} />
        </MainCard>
    );
};

export default ProfileFormView;
