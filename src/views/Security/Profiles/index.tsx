import React, { useState, useEffect } from 'react';

// material-ui
import { Button, Fade, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// third party imports
import { useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';

// project imports
import { useSelector, useDispatch } from 'store';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import SearchInput from 'ui-component/SearchInput';
import Loader from 'ui-component/Loader';
import ProfilesList from './ProfilesList';
import CreateProfile from './CreateProfileComponent';
import EditProfileComponent from './EditProfileComponent';

// types
import { ProfileType } from 'types/user-profile';
import { getProfiles } from 'store/slices/security';

export default function ProfilesMainPage() {
    // hooks
    const dispatch = useDispatch();
    const intl = useIntl();
    const [searchParams, setSearchParams] = useSearchParams();

    // store
    const { loading } = useSelector((state) => state.user);

    // consts
    const [sideMode, setSideMode] = useState<'EDIT' | 'CREATE' | null>(null);
    const [profileToEdit, setProfileToEdit] = useState<ProfileType | null>(null);
    const [search, setSearch] = React.useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getProfilesList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getProfilesList = () => {
        setIsLoading(true);
        dispatch(getProfiles()).finally(() => {
            setIsLoading(false);
        });
    };

    useEffect(() => {
        const searchText = searchParams.get('search');
        setSearch(searchText ?? '');
    }, [searchParams]);

    const handleSearch = async (newSearchText: string) => {
        setSearch(newSearchText);
        setSearchParams(`?search=${newSearchText}`);
    };

    const openEdit = (profile: ProfileType) => {
        if (profileToEdit?.id === profile?.id) {
            return;
        }
        setSideMode(null);
        setTimeout(() => {
            setSideMode('EDIT');
            setProfileToEdit(profile);
        }, 100);
    };

    const handleSuccess = () => getProfilesList();

    return (
        <MainCard
            sx={{
                overflow: 'initial'
            }}
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">
                            {intl.formatMessage({
                                id: 'profiles'
                            })}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Fade in={sideMode !== 'CREATE'}>
                            <Button
                                onClick={() => {
                                    setSideMode('CREATE');
                                }}
                                variant="contained"
                                startIcon={<AddIcon />}
                                sx={{ mr: 3 }}
                            >
                                {intl.formatMessage({
                                    id: 'create_profile'
                                })}
                            </Button>
                        </Fade>
                        <SearchInput initialValue={search ?? ''} onSearch={handleSearch} />
                    </Grid>
                </Grid>
            }
        >
            <Grid container direction="row" spacing={gridSpacing}>
                {loading && <Loader />}
                <Grid item xs={12} md={5} lg={5}>
                    <ProfilesList isLoading={isLoading} filterText={search} onEditClick={openEdit} />
                </Grid>

                <Grid item xs={12} md={7} lg={7}>
                    <CreateProfile handleSuccess={handleSuccess} handleCancel={() => setSideMode(null)} show={sideMode === 'CREATE'} />
                    {profileToEdit && (
                        <EditProfileComponent
                            handleSuccess={handleSuccess}
                            handleCancel={() => {
                                setSideMode(null);
                                setProfileToEdit(null);
                            }}
                            show={sideMode === 'EDIT'}
                            profileToEdit={profileToEdit}
                        />
                    )}
                </Grid>
            </Grid>
        </MainCard>
    );
}
