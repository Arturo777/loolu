// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="flex-end">
        <Typography variant="subtitle2" component={Link} href="https://www.vinneren.com/" target="_blank" underline="hover">
            Vinneren.com
        </Typography>
    </Stack>
);

export default AuthFooter;
