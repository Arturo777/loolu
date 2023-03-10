import React, { useCallback, useEffect, useMemo, useState } from 'react';

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
    size?: 'small' | 'medium' | 'large';
};

export default function MultiMerchant({
    blockDefaults = true,
    defaultSelected,
    merchants,
    onChange,
    readOnly,
    maxShow,
    justOne,
    size = 'large'
}: MultiMerchantProps) {
    // hooks
    const theme = useTheme();
    const intl = useIntl();
    const [merchantsList, setMerchantsList] = useState<MerchantChipType[]>([]);
    const [firstRender, setFirstRender] = useState<boolean>(true);

    const isAllSelected = useMemo(() => merchantsList.every((item) => item.isSelected), [merchantsList]);

    // menu triggers
    const [anchorMenu, setAnchorMenu] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorMenu);

    // change event
    useEffect(() => {
        const selectedMerchants = merchantsList.filter((item) => item.isSelected);
        if (onChange) {
            onChange(selectedMerchants);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [merchantsList]);

    // create initial array
    useEffect(() => {
        if (firstRender) {
            const initialList = merchants.map((item) => {
                const isDefaultSelected = item.isFather ? true : defaultSelected.some((itemA) => itemA.merchantId === item.merchantId);

                return { ...item, isSelected: isDefaultSelected };
            });
            console.log('initialList');
            setMerchantsList(initialList);
            setFirstRender(false);
            // handleChangeList(initialList);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            const newList = merchantsList.map((item) => {
                if (item.merchantId === merchant.merchantId) {
                    return { ...item, isSelected: true };
                }
                return { ...item, isSelected: false };
            });

            setMerchantsList([...newList]);
            // handleChangeList(newList);
            return;
        }

        const isDefaultSelected = defaultSelected.some((itemA) => itemA.merchantId === merchant.merchantId);

        const isBlocked = (isDefaultSelected && blockDefaults) || merchant.isFather;

        if (!isBlocked) {
            // setMerchantsList((currentList) => [
            //     ...currentList.map((item) => {
            //         if (item.merchantId === merchant.merchantId) {
            //             return { ...item, isSelected: !item.isSelected };
            //         }
            //         return item;
            //     })
            // ]);
            const newList = merchantsList.map((item) => {
                if (item.merchantId === merchant.merchantId) {
                    return { ...item, isSelected: !item.isSelected };
                }
                return item;
            });
            setMerchantsList([...newList]);
            // handleChangeList(newList);
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
            const newList = merchantsList.map((item) => ({ ...item, isSelected: true }));

            setMerchantsList([...newList]);
            // handleChangeList(newList);
        } else {
            const newList = merchantsList.map((merchant) => {
                const isDefaultSelected = defaultSelected.some((itemA) => itemA.merchantId === merchant.merchantId);
                const isBlocked = isDefaultSelected && blockDefaults;

                if (merchant.isFather || isBlocked) {
                    return merchant;
                }

                return { ...merchant, isSelected: false };
            });
            setMerchantsList([...newList]);
            // handleChangeList(newList);
        }
    };

    // const handleChangeList = (list: MerchantChipType[]) => {
    //     const selectedMerchants = list.filter((item) => item.isSelected);
    //     if (onChange) {
    //         onChange(selectedMerchants);
    //     }
    // };

    const filteredElementsToRender = useMemo<MerchantChipType[]>(() => {
        if (justOne && merchantsList.length < maxShow!) {
            return [...merchantsList];
        }

        if (justOne) {
            return [
                ...merchantsList.filter((item) => {
                    console.log(item);
                    return item.isSelected;
                })
            ];
        }

        let elements: MerchantChipType[] = [];

        // add father as first element
        const fatherElement = merchantsList.find((item) => item.isFather);

        if (fatherElement) {
            elements = [...elements, fatherElement];
        }

        merchantsList.forEach((item) => {
            if (!item.isFather && elements.length < maxShow!) {
                elements = [...elements, item];
            }
        });

        return elements;
    }, [justOne, merchantsList, maxShow]);

    const moreText = useMemo(() => {
        if (justOne && merchantsList.length < maxShow!) {
            return 0;
        }

        if (justOne) {
            return merchantsList.length - 1;
        }

        return merchantsList.length - maxShow!;
    }, [justOne, maxShow, merchantsList.length]);

    const renderMore = useMemo<boolean>(
        () => (merchantsList.length > maxShow! || justOne!) && moreText > 0,
        [justOne, maxShow, merchantsList.length, moreText]
    );

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
                {!justOne && !readOnly && (
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
                        sx={{ cursor: readOnly ? 'initial' : 'pointer' }}
                    >
                        <MerchantAvatar readOnly feedback={false} merchant={merchant} size="medium" />
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
                            readOnly={readOnly}
                            key={`merchant-avatar-item-${merchant.merchantId}`}
                            merchant={merchant}
                            handleClick={() => toggleItem(merchant)}
                            size={size}
                        />
                    ))}

                    {renderMore}
                </>
            </Paper>

            {renderMore && (
                <Avatar
                    onClick={handleOpenMenu}
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

const multiDefaultProps = {
    onChange: () => {},
    readOnly: false,
    maxShow: 5,
    justOne: false,
    size: 'large'
};

MultiMerchant.defaultProps = multiDefaultProps;

const MerchantAvatar = ({
    merchant,
    handleClick = () => {},
    feedback = true,
    readOnly = false,
    size
}: {
    feedback?: boolean;
    merchant: MerchantChipType;
    readOnly?: boolean;
    size: 'small' | 'medium' | 'large';
    handleClick?: () => void;
}) => {
    const theme = useTheme();

    const { sx, children } = useStringAvatarProps({ merchant, size });

    const bColor = theme.palette.mode === 'dark' ? theme.palette.success.main : '#008724';

    const borderColor = merchant.isSelected && feedback ? bColor : 'transparent';

    const font = {
        small: 14,
        medium: 16,
        large: 17
    };

    return (
        <Box onClick={handleClick} sx={{ cursor: readOnly ? 'initial' : 'pointer', position: 'relative', zIndex: 2 }}>
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
            <Avatar sx={{ ...sx, borderColor, cursor: readOnly ? 'initial' : 'pointer' }} title={merchant.name}>
                {children}
            </Avatar>
        </Box>
    );
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
    transitions: 'all 420ms linear'
    // width: 40,
    // height: 40,
    // fontSize: 16
};

const getSizeProps = (size: 'small' | 'medium' | 'large') => {
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

//  npx browserslist@latest --update-db
// Browserslist: caniuse-lite is outdated.
