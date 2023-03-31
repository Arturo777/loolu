// material-ui
import { useTheme } from '@mui/material/styles';
import { Fab, IconButton } from '@mui/material';

// assets
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

// ==============================|| CART ITEMS - FLOATING BUTTON ||============================== //

const FloatingHistorialApproval = ({ handleDrawerOpenHistorial }: { handleDrawerOpenHistorial: any }) => {
    const theme = useTheme();

    return (
        <Fab
            onClick={handleDrawerOpenHistorial}
            size="large"
            sx={{
                top: '18%',
                position: 'fixed',
                right: 0,
                zIndex: theme.zIndex.speedDial,
                boxShadow: theme.customShadows.warning,
                bgcolor: 'secondary.main',
                color: 'secondary.light',
                borderRadius: '8px',
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                '&:hover': {
                    bgcolor: 'warning.dark',
                    color: 'warning.light'
                }
            }}
        >
            <IconButton component="div" disableRipple aria-label="cart" sx={{ '&:hover': { bgcolor: 'secondary' } }} size="large">
                <WorkHistoryIcon sx={{ color: 'grey.800' }} />
            </IconButton>
        </Fab>
    );
};

export default FloatingHistorialApproval;
