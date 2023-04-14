import { styled } from '@mui/material/styles';
import { appDrawerWidth } from 'store/constant';

// eslint-disable-next-line import/prefer-default-export
export const ProductListContainer = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{ open?: boolean }>(
    ({ theme, open }) => ({
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter
        }),
        marginRight: -appDrawerWidth,
        [theme.breakpoints.down('xl')]: {
            paddingRight: 0,
            marginRight: 0
        },
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.shorter
            }),
            marginRight: 0
        })
    })
);
