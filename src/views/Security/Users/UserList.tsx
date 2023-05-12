import React from 'react';

// material-ui
import {
    Card,
    Divider,
    ListItemText,
    Avatar,
    ListItemAvatar,
    Typography,
    Stack,
    ListItem,
    List,
    ListItemIcon,
    IconButton,
    CircularProgress,
    Collapse
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EditIcon from '@mui/icons-material/Edit';

// types
import { UserType } from 'types/user-profile';

const avatarImage = require.context('assets/images/profile', true);

export default function UserListComponent({
    users,
    loading,
    onEditClick
}: {
    users: UserType[];
    loading: boolean;
    onEditClick: (user: UserType) => void;
}) {
    const theme = useTheme();
    return (
        <>
            <Collapse in={loading}>
                <Stack justifyContent="center" alignItems="center" sx={{ pt: 5, mb: 5 }}>
                    <CircularProgress />
                </Stack>
            </Collapse>
            <Collapse in={!loading}>
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
                    {users && users.map((user) => <UserListItem key={`user-item-${user.id}`} user={user} onEditClick={onEditClick} />)}
                </List>
            </Collapse>
        </>
    );
}

// bgcolor: 'background.paper'

const UserListItem = ({ user, onEditClick }: { user: UserType; onEditClick: (user: UserType) => void }) => {
    const avatarProfile = user.avatar && avatarImage(`./${user.avatar}`).default;

    return (
        <>
            <ListItem sx={{ userSelect: 'none' }}>
                <ListItemAvatar>
                    <Avatar alt={user.name} src={avatarProfile} />
                </ListItemAvatar>
                <ListItemText
                    sx={{ p: 1 }}
                    primary={
                        <>
                            <Typography sx={{ display: 'inline', fontSize: 16 }} variant="subtitle1" color="text.primary">
                                {user.name}
                            </Typography>
                            <Typography sx={{ display: 'inline', fontSize: 13 }} component="span" variant="body1" color="text.secondary">
                                {' - '}
                                {user.profile.type}
                            </Typography>
                        </>
                    }
                    secondary={
                        <Stack component="span">
                            {user.email && (
                                <Stack component="span" direction="row" alignItems="center" sx={{ mt: 1 }}>
                                    <EmailIcon fontSize="small" />
                                    <Typography sx={{ mr: 1, ml: 1 }} component="span" variant="body2" color="text.primary">
                                        {user.email}
                                    </Typography>
                                    <IconButton
                                        onClick={() => {
                                            navigator.clipboard.writeText(`${user.email}`);
                                        }}
                                        sx={{ opacity: 0, transition: 'all 350ms ease', '&:hover': { opacity: 0.7 } }}
                                    >
                                        <ContentCopyIcon sx={{ fontSize: 18 }} />
                                    </IconButton>
                                </Stack>
                            )}
                            {user.phoneNumber && (
                                <Stack component="span" direction="row" alignItems="center" sx={{ mt: 1 }}>
                                    <LocalPhoneIcon fontSize="small" />
                                    <Typography sx={{ mr: 1, ml: 1 }} component="span" variant="body2" color="text.primary">
                                        {user.phoneNumber}
                                    </Typography>
                                    <IconButton
                                        onClick={() => {
                                            navigator.clipboard.writeText(`${user.phoneNumber}`);
                                        }}
                                        sx={{ opacity: 0, transition: 'all 350ms ease', '&:hover': { opacity: 0.7 } }}
                                    >
                                        <ContentCopyIcon sx={{ fontSize: 18 }} />
                                    </IconButton>
                                </Stack>
                            )}
                        </Stack>
                    }
                />
                <ListItemIcon>
                    <IconButton onClick={() => onEditClick(user)}>
                        <EditIcon />
                    </IconButton>
                </ListItemIcon>
            </ListItem>
            <Divider variant="inset" />
        </>
    );
};
