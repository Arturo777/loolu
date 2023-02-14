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
                <List component={Card} elevation={2} sx={{ bgcolor: 'background.paper', p: 2 }}>
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
