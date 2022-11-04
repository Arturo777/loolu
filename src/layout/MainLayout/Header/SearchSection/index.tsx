import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Card, Checkbox, FormControlLabel, Grid, InputAdornment, OutlinedInput, Popper, Zoom } from '@mui/material';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';
// import { usePopupState, bindTrigger, bindPopper as bindPopperHook } from 'material-ui-popup-state/hooks';

// project imports
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';
import { useNavigate, createSearchParams } from 'react-router-dom';

// styles
const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
    zIndex: 1100,
    width: '99%',
    top: '-55px !important',
    padding: '0 12px',
    [theme.breakpoints.down('sm')]: {
        padding: '0 10px'
    }
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 434,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : '#fff'
    }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
    color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
    '&:hover': {
        background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
        color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
    }
}));

interface Props {
    value: string;
    setValue: (value: string) => void;
    popupState: any;
    handleOptions: (val?: boolean) => void;
    handleEnter: (e: any) => void;
}

// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = ({ value, setValue, popupState, handleOptions, handleEnter }: Props) => {
    const theme = useTheme();

    return (
        <OutlineInputStyle
            id="input-search-header"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search"
            onKeyDown={handleEnter}
            startAdornment={
                <InputAdornment position="start">
                    <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                </InputAdornment>
            }
            endAdornment={
                <InputAdornment position="end">
                    <HeaderAvatarStyle variant="rounded" onClick={() => handleOptions()}>
                        <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                    </HeaderAvatarStyle>
                    <Box sx={{ ml: 2 }} onClick={() => handleOptions(false)}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                ...theme.typography.commonAvatar,
                                ...theme.typography.mediumAvatar,
                                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.orange.light,
                                color: theme.palette.orange.dark,
                                '&:hover': {
                                    background: theme.palette.orange.dark,
                                    color: theme.palette.orange.light
                                }
                            }}
                            {...bindToggle(popupState)}
                        >
                            <IconX stroke={1.5} size="1.3rem" />
                        </Avatar>
                    </Box>
                </InputAdornment>
            }
            aria-describedby="search-helper-text"
            inputProps={{ 'aria-label': 'weight' }}
        />
    );
};

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [fields, setFields] = useState<string[]>([]);
    const [showOptions, setShowOptions] = useState<boolean>(false);

    const handelFilter = (newValue: string) => {
        const exist = fields.includes(newValue);

        if (exist) {
            const newFields = fields.filter((item) => item !== newValue);

            setFields(newFields);
        } else {
            setFields([...fields, newValue]);
        }
    };

    const handleEnter = (event: any): void => {
        if (event.key === 'Enter') {
            if (value.length >= 2) {
                handleSearch();
            }
        }
    };

    const handleSearch = () => {
        const params = { productName: value };
        // CLOSE
        setShowOptions(false);
        // REDIRECT
        navigate({ pathname: '/products', search: `?${createSearchParams(params)}` });
    };

    return (
        <Box sx={{ position: 'relative' }}>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <PopupState variant="popper" popupId="demo-popup-popper">
                    {(popupState) => (
                        <>
                            <Box sx={{ ml: 2 }}>
                                <HeaderAvatarStyle variant="rounded" {...bindToggle(popupState)}>
                                    <IconSearch stroke={1.5} size="1.2rem" />
                                </HeaderAvatarStyle>
                            </Box>
                            <PopperStyle {...bindPopper(popupState)} transition>
                                {({ TransitionProps }) => (
                                    <>
                                        <Transitions type="zoom" {...TransitionProps} sx={{ transformOrigin: 'center left' }}>
                                            <Card
                                                sx={{
                                                    background: theme.palette.mode === 'dark' ? theme.palette.dark[900] : '#fff',
                                                    [theme.breakpoints.down('sm')]: {
                                                        border: 0,
                                                        boxShadow: 'none'
                                                    }
                                                }}
                                            >
                                                <Box sx={{ p: 2 }}>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item xs>
                                                            <MobileSearch
                                                                value={value}
                                                                setValue={setValue}
                                                                popupState={popupState}
                                                                handleEnter={handleEnter}
                                                                handleOptions={(val) => {
                                                                    if (val !== undefined) {
                                                                        setShowOptions(val);
                                                                    } else {
                                                                        setShowOptions((prevState) => !prevState);
                                                                    }
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Card>
                                        </Transitions>
                                    </>
                                )}
                            </PopperStyle>
                        </>
                    )}
                </PopupState>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <OutlineInputStyle
                    id="input-search-header"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Buscar"
                    onKeyDown={handleEnter}
                    startAdornment={
                        <InputAdornment position="start">
                            <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end" onClick={() => setShowOptions((prevState) => !prevState)}>
                            <HeaderAvatarStyle variant="rounded">
                                <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                            </HeaderAvatarStyle>
                        </InputAdornment>
                    }
                    aria-describedby="search-helper-text"
                    inputProps={{ 'aria-label': 'weight' }}
                />
            </Box>
            {/* OPTIONS POP UP */}
            <Zoom in={showOptions}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: { xs: '120%', md: `100%` },
                        left: 0,
                        width: { xs: '100%', md: '125%' },
                        minWidth: 200,
                        backgroundColor: 'white',
                        p: 1,
                        borderRadius: 2
                    }}
                >
                    <FormControlLabel
                        control={<Checkbox checked={fields.some((item) => item === 'productName')} color="secondary" />}
                        onChange={() => handelFilter('productName')}
                        label="Nombre"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={fields.some((item) => item === 'productId')}
                                onChange={() => handelFilter('productId')}
                                color="secondary"
                            />
                        }
                        label="Id de producto"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={fields.some((item) => item === 'idSKU')}
                                onChange={() => handelFilter('idSKU')}
                                color="secondary"
                            />
                        }
                        label="SKU"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={fields.some((item) => item === 'productRefID')}
                                onChange={() => handelFilter('productRefID')}
                                color="secondary"
                            />
                        }
                        label="Código de referencia"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={fields.some((item) => item === 'ean')}
                                onChange={() => handelFilter('ean')}
                                color="secondary"
                            />
                        }
                        label="EAN"
                    />
                </Box>
            </Zoom>
        </Box>
    );
};

export default SearchSection;
