import React, { useEffect, useMemo, useState } from 'react';

// mui imports
import { Avatar, Menu, Stack, MenuItem, IconButton, Paper, Box, Fade, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useIntl } from 'react-intl';

// helpers
import { stringToColor } from 'utils/helpers';

// types
import { MerchantType } from 'types/security';

interface MerchantChipType extends MerchantType {
    isSelected: boolean;
}

type MultiMerchantProps = {
    blockDefaults?: boolean;
    defaultSelected: MerchantType[];
    merchants: MerchantType[];
    onChange?: (selectedMerchats: MerchantType[]) => void;
    readOnly?: boolean;
    maxShow?: number;
    justOne?: boolean;
};

export default function MultiMerchant({
    blockDefaults = true,
    defaultSelected,
    merchants,
    onChange = () => {},
    readOnly = false,
    maxShow = 5,
    justOne = false
}: MultiMerchantProps) {
    // hooks
    const theme = useTheme();
    const intl = useIntl();

    const [merchantsList, setMerchantsList] = useState<MerchantChipType[]>([]);

    const isAllSelected = useMemo(() => merchantsList.every((item) => item.isSelected), [merchantsList]);

    // menu triggers
    const [anchorMenu, setAnchorMenu] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorMenu);

    // change event
    useEffect(() => {
        const selectedMerchants = merchantsList.filter((item) => item.isSelected);
        onChange(selectedMerchants);
    }, [merchantsList, onChange]);

    // create initial array
    useEffect(() => {
        const initialList = merchants.map((item) => {
            const isDefaultSelected = item.isFather ? true : defaultSelected.some((itemA) => itemA.merchantId === item.merchantId);

            return { ...item, isSelected: isDefaultSelected };
        });

        setMerchantsList(initialList);
    }, [merchants, defaultSelected]);

    // menu actions - open
    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorMenu(event.currentTarget);
    };

    // menu actions - close
    const handleCloseMenu = () => {
        setAnchorMenu(null);
    };

    // toggle buttons (external)
    const toggleItem = (merchant: MerchantChipType) => {
        if (readOnly) return;

        // only select one
        if (justOne) {
            setMerchantsList((currentList) => [
                ...currentList.map((item) => {
                    if (item.merchantId === merchant.merchantId) {
                        return { ...item, isSelected: true };
                    }
                    return { ...item, isSelected: false };
                })
            ]);
            return;
        }

        const isDefaultSelected = defaultSelected.some((itemA) => itemA.merchantId === merchant.merchantId);

        const isBlocked = (isDefaultSelected && blockDefaults) || merchant.isFather;

        if (!isBlocked) {
            setMerchantsList((currentList) => [
                ...currentList.map((item) => {
                    if (item.merchantId === merchant.merchantId) {
                        return { ...item, isSelected: !item.isSelected };
                    }
                    return item;
                })
            ]);
        }
    };

    // toggle between select all and unselect
    const selectAll = () => {
        if (readOnly) return;
        if (!isAllSelected) {
            handleCloseMenu();
        }

        const newVal = !isAllSelected;

        if (newVal) {
            // set all as selected
            setMerchantsList((currentList) => [...currentList.map((item) => ({ ...item, isSelected: true }))]);
        } else {
            setMerchantsList((currentList) => [
                ...currentList.map((merchant) => {
                    const isDefaultSelected = defaultSelected.some((itemA) => itemA.merchantId === merchant.merchantId);
                    const isBlocked = isDefaultSelected && blockDefaults;

                    if (merchant.isFather || isBlocked) {
                        return merchant;
                    }

                    return { ...merchant, isSelected: false };
                })
            ]);
        }
    };

    const filteredElementsToRender = useMemo<MerchantChipType[]>(() => {
        let elements: MerchantChipType[] = [];

        // add father as first element
        const fatherElement = merchantsList.find((item) => item.isFather);

        if (fatherElement) {
            elements = [...elements, fatherElement];
        }

        merchantsList.forEach((item) => {
            if (!item.isFather && elements.length < maxShow) {
                elements = [...elements, item];
            }
        });

        return elements;
    }, [merchantsList, maxShow]);

    const renderMore = useMemo<boolean>(() => merchantsList.length > maxShow, [maxShow, merchantsList.length]);

    const renderMenu = useMemo<React.ReactNode>(() => {
        if (!renderMore) return null;
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
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {!justOne && (
                    <MenuItem onClick={selectAll} selected={isAllSelected}>
                        <CheckCircleIcon color="success" />
                        <Typography variant="body1" sx={{ ml: 1, fontSize: 17 }}>
                            {intl.formatMessage({
                                id: 'select_all'
                            })}
                        </Typography>
                    </MenuItem>
                )}

                {merchantsList.map((merchant) => (
                    <MenuItem
                        key={`merchant-menu-item-${merchant.merchantId}`}
                        onClick={() => {
                            toggleItem(merchant);
                        }}
                        selected={merchant.isSelected}
                    >
                        <MerchantAvatar feedback={false} merchant={merchant} />
                        <Typography variant="body1" sx={{ ml: 1, fontSize: 17 }}>
                            {merchant.name}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [anchorMenu, isAllSelected, merchantsList, open, renderMore]);

    return (
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <Paper
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    // justifyContent: 'center',
                    alignItems: 'center',
                    listStyle: 'none',
                    p: 0.5,
                    m: 0
                }}
                component="ul"
            >
                <>
                    {filteredElementsToRender.map((merchant) => (
                        <MerchantAvatar
                            key={`merchant-avatar-item-${merchant.merchantId}`}
                            merchant={merchant}
                            handleClick={() => toggleItem(merchant)}
                        />
                    ))}

                    {renderMore}
                </>
            </Paper>

            {renderMore && (
                <Avatar
                    sx={{
                        ...avatarCommonProps,
                        bgcolor: '#d3d3d3',
                        color: theme.palette.getContrastText('#d3d3d3'),
                        borderColor: '#d3d3d3',
                        mr: 0
                    }}
                >
                    {merchantsList.length - maxShow}+
                </Avatar>
            )}

            {renderMore && (
                <IconButton onClick={handleOpenMenu}>
                    <MoreVertIcon />
                </IconButton>
            )}

            {renderMenu}
        </Stack>
    );
}

const MerchantAvatar = ({
    merchant,
    handleClick = () => {},
    feedback = true
}: {
    feedback?: boolean;
    merchant: MerchantChipType;
    handleClick?: () => void;
}) => {
    const theme = useTheme();

    const { sx, children } = useStringAvatarProps({ merchant });

    const bColor = theme.palette.mode === 'dark' ? theme.palette.success.main : '#008724';

    const borderColor = merchant.isSelected && feedback ? bColor : 'transparent';

    return (
        <Box onClick={handleClick} sx={{ cursor: 'pointer', position: 'relative', zIndex: 2 }}>
            <Fade in={merchant.isSelected && feedback}>
                <Box
                    component={CheckCircleIcon}
                    sx={{
                        position: 'absolute',
                        right: 2,
                        bottom: 0,
                        fontSize: 17,
                        color: bColor,
                        zIndex: 1
                    }}
                />
            </Fade>
            <Avatar sx={{ ...sx, borderColor }}>{children}</Avatar>
        </Box>
    );
};

//  borderColor: string; color: string
const useStringAvatarProps = ({ merchant }: { merchant: MerchantChipType }) => {
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
            ...avatarCommonProps
        },
        children: shortName.toUpperCase()
    };
};

const customScrollBar = {
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

const avatarCommonProps = {
    mr: 1,
    border: '2px solid #fff',
    width: 40,
    height: 40,
    transitions: 'all 420ms linear',
    fontSize: 16
};

//  npx browserslist@latest --update-db
// Browserslist: caniuse-lite is outdated.
