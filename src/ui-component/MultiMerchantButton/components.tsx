import { Avatar, Box, Fade, SxProps } from '@mui/material';

import { useTheme } from '@mui/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// helpers
import { stringToColor } from 'utils/helpers';

// types
import { MerchantType } from 'types/security';
import { Theme } from '@mui/system';

export interface MerchantChipType extends MerchantType {
    isSelected: boolean;
}

export const MerchantAvatar = ({
    avatarStyles,
    containerStyles,
    feedback = true,
    handleClick = () => {},
    merchant,
    readOnly = false,
    size
}: {
    avatarStyles?: SxProps<Theme>;
    containerStyles?: SxProps<Theme>;
    feedback?: boolean;
    handleClick?: () => void;
    merchant: MerchantChipType;
    readOnly?: boolean;
    size: 'small' | 'medium' | 'large';
}) => {
    const theme = useTheme();

    const { sx: styles, children } = useStringAvatarProps({ merchant, size });

    const bColor = theme.palette.mode === 'dark' ? theme.palette.success.main : '#008724';

    const borderColor = merchant.isSelected && feedback ? bColor : 'transparent';

    const font = {
        small: 14,
        medium: 16,
        large: 17
    };

    return (
        <Box onClick={handleClick} sx={{ cursor: readOnly ? 'initial' : 'pointer', position: 'relative', zIndex: 2, ...containerStyles }}>
            <Fade in={merchant.isSelected && feedback}>
                <Box
                    component={CheckCircleIcon}
                    sx={{
                        position: 'absolute',
                        right: 2,
                        bottom: 0,
                        fontSize: font[size],
                        color: bColor,
                        zIndex: 1
                    }}
                />
            </Fade>
            <Avatar sx={{ ...styles, borderColor, cursor: readOnly ? 'initial' : 'pointer', ...avatarStyles }} title={merchant.name}>
                {children}
            </Avatar>
        </Box>
    );
};

MerchantAvatar.defaultProps = {
    // eslint-disable-next-line react/default-props-match-prop-types
    size: 'medium'
};

//  borderColor: string; color: string
const useStringAvatarProps = ({ merchant, size }: { merchant: MerchantChipType; size: 'small' | 'medium' | 'large' }) => {
    const theme = useTheme();

    const bgcolor = stringToColor(merchant.name);

    const shortName =
        merchant.name.split(' ').length > 1
            ? `${merchant.name.split(' ')[0][0]}${merchant.name.split(' ')[1][0]}`
            : `${merchant.name.split('')[0]}`;

    return {
        sx: {
            bgcolor,
            color: theme.palette.getContrastText(bgcolor),
            ...avatarCommonProps,
            ...getSizeProps(size)
        },
        children: shortName.toUpperCase()
    };
};

export const ShowMoreButton = ({ moreText, handleClick, size }: { size: any; moreText: String; handleClick: (e: any) => void }) => {
    const theme = useTheme();

    return (
        <Avatar
            onClick={handleClick}
            sx={{
                ...avatarCommonProps,
                ...getSizeProps(size),
                bgcolor: '#d3d3d3',
                color: theme.palette.getContrastText('#d3d3d3'),
                borderColor: '#d3d3d3',
                mr: 0,
                cursor: 'pointer'
            }}
        >
            {moreText}+
        </Avatar>
    );
};

export const customScrollBar = {
    '&::-webkit-scrollbar': {
        width: '5px'
    },
    '&::-webkit-scrollbar-track': {
        background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#c2c2c2',
        borderRadius: '5px'
    }
};

export const customMiniScrollBar = {
    '&::-webkit-scrollbar': {
        height: '5px',
        display: 'none',
        opacity: 0
    },
    '&::-webkit-scrollbar-track': {
        background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'transparent',
        borderRadius: '3px'
    },
    '&:hover::-webkit-scrollbar-thumb': {
        backgroundColor: '#c2c2c2'
    }
};

export const avatarCommonProps = {
    border: '2px solid #fff',
    transitions: 'all 420ms linear'
    // width: 40,
    // height: 40,
    // fontSize: 16
};

export const getSizeProps = (size: 'small' | 'medium' | 'large') => {
    const sizes = {
        small: 28,
        medium: 30,
        large: 35
    };

    const font = {
        small: 13,
        medium: 15,
        large: 16
    };

    return { width: sizes[size], height: sizes[size], fontSize: font[size] };
};
