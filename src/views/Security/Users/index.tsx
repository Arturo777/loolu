import React, { useEffect } from 'react';

// material-ui
import { Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';

// project imports
import { useSearchParams } from 'react-router-dom';
import UserDetailsCard from 'ui-component/cards/UserDetailsCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { getUsersList } from 'store/slices/security';

// assets
import { IconSearch } from '@tabler/icons';

// types
import { UserType } from 'types/user-profile';
import Loader from 'ui-component/Loader';

// ==============================|| USER CARD STYLE 1 ||============================== //

const UsersList = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [users, setUsers] = React.useState<UserType[]>([]);
    const [search, setSearch] = React.useState<string | undefined>('');
    const { usersList, loading } = useSelector((state) => state.user);

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

    let usersResult: React.ReactElement | React.ReactElement[] = <></>;
    if (users) {
        usersResult = users.map((user, index) => (
            <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                <UserDetailsCard {...user} />
            </Grid>
        ));
    }

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">Usuarios</Typography>
                    </Grid>
                    <Grid item>
                        <OutlinedInput
                            id="input-search-card-style1"
                            placeholder="Search"
                            value={search}
                            onChange={handleSearch}
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconSearch stroke={1.5} size="16px" />
                                </InputAdornment>
                            }
                            size="small"
                        />
                    </Grid>
                </Grid>
            }
        >
            <Grid container direction="row" spacing={gridSpacing}>
                {!loading && usersResult}
                {loading && <Loader />}
                <Grid item xs={12}>
                    <Grid container justifyContent="flex-end" spacing={gridSpacing}>
                        <Grid item>
                            <Typography variant="h5">Mostrando {users.length} resultados</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default UsersList;
