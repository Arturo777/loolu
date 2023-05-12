import React, { useEffect, useState } from 'react';

// material-ui
import {
    Card,
    Collapse,
    ListItem,
    ListItemIcon,
    IconButton,
    ListItemText,
    Divider,
    List,
    Switch,
    Stack,
    CircularProgress
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';

// third-party imports

// project imports
import { ProfileType } from 'types/user-profile';
import { useSelector } from 'store';

// assets

export default function ProfilesList({
    filterText,
    onEditClick,
    isLoading
}: {
    isLoading: boolean;
    filterText: string;
    onEditClick: (user: ProfileType) => void;
}) {
    const theme = useTheme();
    // store
    const { profiles } = useSelector((state) => state.user);

    // vars
    const [filteredProfiles, setFilteredProfiles] = useState<ProfileType[]>([]);

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
        <>
            <Collapse in={isLoading}>
                <Stack justifyContent="center" alignItems="center" sx={{ pt: 5, mb: 3 }}>
                    <CircularProgress />
                </Stack>
            </Collapse>
            <Collapse in={!isLoading}>
                <List
                    component={Card}
                    elevation={2}
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
                    {filteredProfiles &&
                        filteredProfiles.map((profile) => (
                            <ProfileListItem key={`profile-item-${profile.id}`} profile={profile} onEditClick={onEditClick} />
                        ))}
                </List>
            </Collapse>
        </>
    );
}

const ProfileListItem = ({ profile, onEditClick }: { profile: ProfileType; onEditClick: (user: ProfileType) => void }) => (
    <>
        <ListItem sx={{ userSelect: 'none' }}>
            <ListItemIcon>
                <Switch checked={profile.idStatus} />
            </ListItemIcon>
            <ListItemText sx={{ p: 1 }} primary={profile.type} secondary={profile.description} />
            <ListItemIcon>
                <IconButton onClick={() => onEditClick(profile)}>
                    <EditIcon />
                </IconButton>
            </ListItemIcon>
        </ListItem>
        <Divider variant="inset" />
    </>
);
