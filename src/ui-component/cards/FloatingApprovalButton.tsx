// material-ui
import { useTheme } from '@mui/material/styles';
import { Fab, IconButton } from '@mui/material';

// assets
import GroupsIcon from '@mui/icons-material/Groups';

// ==============================|| CART ITEMS - FLOATING BUTTON ||============================== //

const FloatingApprovalButton = ({ handleDrawerOpen }: { handleDrawerOpen: any }) => {
    const theme = useTheme();

    return (
        <Fab
            onClick={handleDrawerOpen}
            size="large"
            sx={{
                top: '10%',
                position: 'fixed',
                right: 0,
                zIndex: theme.zIndex.speedDial,
                boxShadow: theme.customShadows.warning,
                bgcolor: 'primary.main',
                color: 'primary.light',
                borderRadius: '8px',
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                '&:hover': {
                    bgcolor: 'success.dark',
                    color: 'success.light'
                }
            }}
        >
            <IconButton component="div" disableRipple aria-label="cart" sx={{ '&:hover': { bgcolor: 'transparent' } }} size="large">
                <GroupsIcon sx={{ color: 'grey.800' }} />
            </IconButton>
        </Fab>
    );
};

export default FloatingApprovalButton;
