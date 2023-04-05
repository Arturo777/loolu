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
    availableMerchantsId?: number[] | null;
};

export default function MultiMerchantButtons({ onAvatarClick, size, availableMerchantsId }: MultiMerchantButtonProps) {
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

    // useEffect(() => {
    //     if (availableMerchantsId) {

    //         }
    // }, [availableMerchantsId]);

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

    const toRenderMerchants: MerchantChipType[] = useMemo(() => {
        if (transformedMerchants.length === 0) {
            return [];
        }
        let newList: MerchantChipType[] = [];
        const maxLength = 2;
        let i = 0;

        do {
            const item = transformedMerchants[i];
            if (availableMerchantsId?.includes(item.merchantId)) {
                newList = [...newList, item];
            }
            i += 1;
        } while (newList.length < maxLength && i < transformedMerchants.length);

        return newList;
    }, [transformedMerchants, availableMerchantsId]);

    const showMore: boolean = useMemo(() => (merchants?.length ?? 0) > 2, [merchants]);

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

    const handleBoxClick = (merchant: MerchantChipType) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!showMore) {
            onAvatarClick(merchant);
        } else {
            handleOpenMenu(event);
        }
    };

    return (
        <Stack direction="row" alignItems="center">
            {toRenderMerchants.map((merchant) => (
                <Box onClick={handleBoxClick(merchant)} key={`merchant-button-${merchant.merchantId}`}>
                    <MerchantAvatar
                        containerStyles={{ mr: -1.5 }}
                        avatarStyles={{ border: `2px solid red`, borderColor: theme.palette.background.paper, boxSizing: 'content-box' }}
                        size={size!}
                        merchant={merchant}
                    />
                </Box>
            ))}

            {showMore && (
                <Box sx={{ zIndex: 2 }}>
                    <ShowMoreButton size={size} handleClick={handleOpenMenu} moreText={`${(merchants?.length ?? 0) - 2 ?? 0}`} />
                </Box>
            )}

            {renderMenu}
        </Stack>
    );
}

MultiMerchantButtons.defaultProps = {
    size: 'small'
};
