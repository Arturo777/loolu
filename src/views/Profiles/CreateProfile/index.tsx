import React, { useState } from 'react';

// mui imports

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ProfileForm from '../ProfileForm';
import { useIntl } from 'react-intl';
import { NewProfileType } from 'types/user';
import { useDispatch } from 'store';
import { createProfileService } from 'store/slices/user';
import { openSnackbar } from 'store/slices/snackbar';
import { useNavigate } from 'react-router-dom';

const ProfileFormView = () => {
    const intl = useIntl();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSave = (data: NewProfileType) => {
        setIsLoading(true);
        // dispatch();
        dispatch(createProfileService({ ...data, idStatus: true }))
            .then(({ response }: any) => {
                setIsLoading(false);

                if (response) {
                    throw new Error('Error');
                }

                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Perfil creado correctamente',
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: true
                    })
                );

                navigate(-1);
            })
            .catch(() => {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Error al crear el perfil',
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        close: true
                    })
                );
            });
    };

    return (
        <MainCard
            title={intl.formatMessage({
                id: 'edit_profile'
            })}
        >
            <ProfileForm handleSaveClick={handleSave} fetching={isLoading} mode="create" />
        </MainCard>
    );
};

export default ProfileFormView;
