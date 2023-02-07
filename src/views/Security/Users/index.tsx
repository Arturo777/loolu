import React, { useEffect, useState } from 'react';

// material-ui
import { Button, Fade, Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// project imports
import { useSearchParams } from 'react-router-dom';
// import UserDetailsCard from 'ui-component/cards/UserDetailsCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { getUsersList } from 'store/slices/security';

// third party imports
import { useIntl } from 'react-intl';

// assets
import { IconSearch } from '@tabler/icons';

// components
import UserListComponent from './UserList';
import EditUser from './EditUser';

// types
import { UserType } from 'types/user-profile';
import Loader from 'ui-component/Loader';
import CreateUser from './CreateUser';

// ==============================|| USER CARD STYLE 1 ||============================== //

const UsersList = () => {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    // store
    const { usersList, loading } = useSelector((state) => state.user);

    // vars
    const [users, setUsers] = React.useState<UserType[]>([]);
    const [search, setSearch] = React.useState<string | undefined>('');

    const [sideMode, setSideMode] = useState<'EDIT' | 'CREATE' | null>(null);
    const [userToEdit, setUserToEdit] = useState<UserType | null>(null);

    useEffect(() => {
        const searchText = searchParams.get('search');
        setSearch(searchText ?? '');
    }, [searchParams]);

    useEffect(() => {
        dispatch(getUsersList());
    }, [dispatch]);

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
        const newString = event?.target.value;
        setSearch(newString);
        setSearchParams(`?search=${newString}`);
    };

    useEffect(() => {
        if (search?.length === 0) {
            setUsers(usersList);
        } else {
            const filtered = usersList.filter(
                (user: UserType) =>
                    JSON.stringify(user)
                        .toLowerCase()
                        .indexOf(search?.toLowerCase() ?? '') > -1
            );

            setUsers(filtered);
        }
    }, [search, usersList]);

    const openEdit = (user: UserType) => {
        setSideMode(null);

        setTimeout(() => {
            setSideMode('EDIT');
            setUserToEdit(user);
        }, 200);
    };

    const handleSuccess = (mode: 'EDIT' | 'CREATE') => {
        dispatch(getUsersList());

        setSideMode(null);
        if (mode === 'EDIT') {
            setUserToEdit(null);
        }
    };

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
                                id: 'users'
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
                                    id: 'create_user'
                                })}
                            </Button>
                        </Fade>

                        <OutlinedInput
                            id="input-search-card-style1"
                            placeholder={intl.formatMessage({ id: 'search' })}
                            value={search}
                            onChange={handleSearch}
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconSearch stroke={1.5} size="16px" />
                                </InputAdornment>
                            }
                            size="small"
                            type="search"
                        />
                    </Grid>
                </Grid>
            }
        >
            <Grid container direction="row" spacing={gridSpacing}>
                {loading && <Loader />}
                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={6}
                    // sx={{ backgroundColor: { xs: 'red', sm: 'orange', md: 'pink', lg: 'navy', xl: 'yellow' } }}
                >
                    <UserListComponent users={users ?? []} loading={loading} onEditClick={openEdit} />
                </Grid>
                <Grid item xs={12} md={6} lg={6} xl={6}>
                    {sideMode === 'EDIT' ? (
                        <EditUser
                            handleSuccess={handleSuccess}
                            handleCancel={() => {
                                setSideMode(null);
                            }}
                            show={sideMode === 'EDIT'}
                            userToEdit={userToEdit!}
                        />
                    ) : (
                        <CreateUser
                            handleSuccess={handleSuccess}
                            handleCancel={() => {
                                setSideMode(null);
                            }}
                            show={sideMode === 'CREATE'}
                        />
                    )}
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default UsersList;
