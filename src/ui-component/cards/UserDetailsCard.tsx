// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Card, Grid, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import { UserType } from 'types/user-profile';
import Avatar from '../extended/Avatar';

// assets
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

const avatarImage = require.context('assets/images/profile', true);

// ==============================|| USER DETAILS CARD ||============================== //

const UserDetailsCard = ({ id, email, firstName, lastName, user, name, profile, phoneNumber, avatar }: UserType) => {
    const theme = useTheme();

    const avatarProfile = avatar && avatarImage(`./${avatar}`).default;

    return (
        <Card
            sx={{
                p: 2,
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                border: theme.palette.mode === 'dark' ? '1px solid transparent' : `1px solid${theme.palette.grey[100]}`,
                '&:hover': {
                    borderColor: theme.palette.primary.main
                }
            }}
        >
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs zeroMinWidth>
                            <Avatar alt={name} size="lg" src={avatarProfile} />
                        </Grid>
                        {/* <Grid item>
                            <IconButton size="small" sx={{ mt: -0.75, mr: -0.75 }} onClick={handleClick}>
                                <MoreHorizOutlinedIcon
                                    fontSize="small"
                                    color="inherit"
                                    aria-controls="menu-friend-card"
                                    aria-haspopup="true"
                                    sx={{ opacity: 0.6 }}
                                />
                            </IconButton>
                            <Menu
                                id="menu-user-details-card"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                variant="selectedMenu"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                            >
                                <MenuItem onClick={handleClose}>Edit</MenuItem>
                                <MenuItem onClick={handleClose}>Delete</MenuItem>
                            </Menu>
                        </Grid> */}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h3" component="div">
                        {name}
                    </Typography>
                    <Typography variant="caption">{profile.type}</Typography>
                </Grid>
                {/* <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.grey[700] }}>
                        {about}
                    </Typography>
                </Grid> */}
                <Grid item xs={12}>
                    <Typography variant="caption">Email</Typography>
                    <Typography variant="h6">{email}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={6}>
                            <Typography variant="caption">Phone</Typography>
                            <Typography variant="h6">{phoneNumber}</Typography>
                        </Grid>
                        {/* <Grid item xs={6}>
                            <Typography variant="caption">Location</Typography>
                            <Typography variant="h6">{location}</Typography>
                        </Grid> */}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1} justifyContent="flex-end">
                        {/* <Grid item xs={6}>
                            <Button variant="outlined" fullWidth startIcon={<ChatBubbleTwoToneIcon />}>
                                Message
                            </Button>
                        </Grid> */}
                        <Grid item xs={6}>
                            <Button component={Link} to={`/users/${id}/edit`} variant="outlined" fullWidth startIcon={<EditIcon />}>
                                Editar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

export default UserDetailsCard;
