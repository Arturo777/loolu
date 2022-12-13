import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Box, Stack, Typography, Chip, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { Link } from 'react-router-dom';

// project imports
import { ProfileType } from 'types/user-profile';
import { useDispatch, useSelector } from 'store';

// assets
import { getProfiles } from 'store/slices/user';
import { gridSpacing } from 'store/constant';
import { FormattedMessage } from 'react-intl';

type UserListProps = {
    filterText: string;
};

const UserList = ({ filterText }: UserListProps) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [filteredProfiles, setFilteredProfiles] = useState<ProfileType[]>([]);
    const { profiles } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getProfiles());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (filterText?.length === 0) {
            setFilteredProfiles(profiles);
        } else {
            const filtered = profiles.filter(
                (profile: ProfileType) =>
                    JSON.stringify(profile)
                        .toLowerCase()
                        .indexOf(filterText?.toLowerCase() ?? '') > -1
            );

            setFilteredProfiles(filtered);
        }
    }, [filterText, profiles]);

    return (
        <Box p={gridSpacing}>
            <Grid container spacing={gridSpacing}>
                {filteredProfiles &&
                    filteredProfiles.map((item: ProfileType) => (
                        <Grid item xs={6} sm={6} md={4} lg={3} key={`profile-card-${item.id}`}>
                            <Card
                                key={`card-profile-${item.id}`}
                                sx={{
                                    p: 3,
                                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                    border: '1px solid',
                                    borderColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.grey[100],
                                    '&:hover': {
                                        border: `1px solid${theme.palette.primary.main}`
                                    }
                                }}
                            >
                                <Stack direction="row" spacing={1} justifyContent="space-between">
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="caption">
                                            <FormattedMessage id="type" />
                                        </Typography>
                                        <Typography variant="h6">{item.type}</Typography>
                                    </Box>
                                    <Chip
                                        label={<FormattedMessage id={item.idStatus ? 'active' : 'inactive'} />}
                                        size="small"
                                        // color={item.idStatus ? 'success' : 'error'}
                                        sx={
                                            item.idStatus
                                                ? {
                                                      bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : 'success.light',
                                                      color: 'success.dark'
                                                  }
                                                : {
                                                      bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : 'error.light',
                                                      color: 'error.dark'
                                                  }
                                        }
                                    />
                                </Stack>

                                <Box sx={{ mb: 5 }}>
                                    <Typography variant="caption">
                                        <FormattedMessage id="description" />
                                    </Typography>
                                    <Typography variant="h6">{item.description}</Typography>
                                </Box>

                                <Grid item xs={12}>
                                    <Grid container spacing={1} justifyContent="flex-end">
                                        <Grid item xs={6}>
                                            <Button
                                                component={Link}
                                                to={`/profiles/${item.id}/edit`}
                                                variant="outlined"
                                                fullWidth
                                                startIcon={<EditIcon />}
                                            >
                                                Editar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};

export default UserList;

/*


<TableCell>{row.location}</TableCell>
                                <TableCell>{row.friends}</TableCell>
                                <TableCell>{row.followers}</TableCell>
                                <TableCell>
                                    {row.status === 'Active' && (
                                        <Chip
                                            label="Active"
                                            size="small"
                                            sx={{
                                                background:
                                                    theme.palette.mode === 'dark'
                                                        ? theme.palette.dark.main
                                                        : theme.palette.success.light + 60,
                                                color: theme.palette.success.dark
                                            }}
                                        />
                                    )}
                                    {row.status === 'Rejected' && (
                                        <Chip
                                            label="Rejected"
                                            size="small"
                                            sx={{
                                                background:
                                                    theme.palette.mode === 'dark'
                                                        ? theme.palette.dark.main
                                                        : theme.palette.orange.light + 80,
                                                color: theme.palette.orange.dark
                                            }}
                                        />
                                    )}
                                    {row.status === 'Pending' && (
                                        <Chip
                                            label="Pending"
                                            size="small"
                                            sx={{
                                                background:
                                                    theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
                                                color: theme.palette.warning.dark
                                            }}
                                        />
                                    )}
                                </TableCell>

*/
