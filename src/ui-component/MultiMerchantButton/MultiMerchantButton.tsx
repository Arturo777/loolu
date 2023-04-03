import React, { useMemo, useState, useEffect } from 'react';
import { Menu, MenuItem, Typography, Box, useTheme, Stack } from '@mui/material';
import { MerchantType } from 'types/security';
import { customScrollBar, MerchantAvatar, MerchantChipType, ShowMoreButton } from './components';
import { useSelector, useDispatch } from 'store';
import { getMerchantsList } from 'store/slices/auth';
import useAuth from 'hooks/useAuth';

type MultiMerchantButtonProps = {
    size?: 'small' | 'medium' | 'large';
    onAvatarClick: (merchant: MerchantType) => void;
};

export default function MultiMerchantButtons({ onAvatarClick, size }: MultiMerchantButtonProps) {
    // hooks
    const theme = useTheme();
    const dispatch = useDispatch();

    const { user } = useAuth();
    const { merchants } = useSelector((state) => state.auth);

    // menu triggers
    const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorMenu);

    // menu actions - open
    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorMenu(event.currentTarget);
    };

    // menu actions - close
    const handleCloseMenu = () => {
        setAnchorMenu(null);
    };

    useEffect(() => {
        if (user && user.user) {
            dispatch(getMerchantsList(user?.user));
        }
    }, [dispatch, merchants?.length, user]);

    const transformedMerchants: MerchantChipType[] = useMemo(() => {
        if (merchants) {
            const tranformItem = (item: MerchantType): MerchantChipType => ({ ...item, isSelected: false });

            return [...merchants?.map(tranformItem)];
        }
        return [];
    }, [merchants]);

    const toRenderButtons = useMemo(() => {
        let newList: MerchantChipType[] = [];

        // search father
        const fatherItem = transformedMerchants.find((item) => item.isFather);

        if (fatherItem) {
            newList = [fatherItem];
        }

        if (transformedMerchants.length > 1) {
            newList = [...newList, transformedMerchants[1]];
        }

        return newList;
    }, [transformedMerchants]);

    const showMore = useMemo(() => (merchants?.length ?? 0) > 0, [merchants]);

    const renderMenu = useMemo<React.ReactNode>(() => {
        if (!showMore) return null;
        return (
            <Menu
                anchorEl={anchorMenu}
                id="account-menu"
                open={open}
                onClose={handleCloseMenu}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflowY: 'scroll',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        maxHeight: 450,
                        minWidth: 200,
                        paddingVertical: 1,
                        mt: 1.5,
                        ...customScrollBar,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            fontSize: 14,
                            ml: -0.5,
                            mr: 1
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0
                        }
                    }
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
                {transformedMerchants.map((merchant) => (
                    <MenuItem
                        onClick={() => onAvatarClick(merchant)}
                        key={`merchant-menu-item-${merchant.merchantId}`}
                        selected={merchant.isSelected}
                    >
                        <MerchantAvatar readOnly feedback={false} merchant={merchant} size="small" />
                        <Typography variant="body1" sx={{ ml: 1, fontSize: 17 }}>
                            {merchant.name}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [anchorMenu, merchants, open]);

    return (
        <Stack direction="row" alignItems="center">
            {toRenderButtons.map((merchant, index) => (
                <MerchantAvatar
                    containerStyles={{ mr: -1.5 }}
                    avatarStyles={{ border: `2px solid red`, borderColor: theme.palette.background.paper, boxSizing: 'content-box' }}
                    key={`merchant-button-${merchant.merchantId}`}
                    size={size!}
                    merchant={merchant}
                />
            ))}

            {showMore && (
                <Box sx={{ zIndex: 2 }}>
                    <ShowMoreButton size={size} handleClick={handleOpenMenu} moreText={`${merchants?.length ?? 0}`} />
                </Box>
            )}

            {renderMenu}
        </Stack>
    );
}

MultiMerchantButtons.defaultProps = {
    size: 'small'
};