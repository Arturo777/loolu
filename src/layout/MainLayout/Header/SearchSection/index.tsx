import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Card,
    FormControl,
    FormControlLabel,
    Grid,
    InputAdornment,
    OutlinedInput,
    Popper,
    Radio,
    RadioGroup
} from '@mui/material';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';
// import { usePopupState, bindTrigger, bindPopper as bindPopperHook } from 'material-ui-popup-state/hooks';

// project imports
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom';
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
    handleOptionsCick: (e: any) => void;
    handleEnter: (e: any) => void;
    cleanSearch: () => void;
    searchProps: SearchPopProps;
}

// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = ({ value, setValue, popupState, handleOptions, handleEnter, cleanSearch, searchProps, handleOptionsCick }: Props) => {
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
                    <HeaderAvatarStyle variant="rounded" onClick={handleOptionsCick}>
                        <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                    </HeaderAvatarStyle>
                    <SearchPopOptions {...searchProps} />
                    <Box
                        sx={{ ml: 2 }}
                        onClick={() => {
                            handleOptions(false);
                            cleanSearch();
                        }}
                    >
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
    const location = useLocation();
    const [value, setValue] = useState('');
    const [searchField, setSearchField] = useState<string>('productName');
    const [valueIsNumber, setValueIsNumber] = useState<boolean>(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    useEffect(() => {
        const searchText = location.search.replace('?', '');

        if (location.pathname === '/products' && searchText.length > 0) {
            const keyField = searchText.split('=')[0];
            const newValue = searchText.split('=')[1];

            setValue(newValue);
            setSearchField(keyField);
        }
    }, [location]);

    useEffect(() => {
        const isNum = !isNaN(Number(value));
        setValueIsNumber(isNum);

        if (!isNum && searchField !== 'productName') {
            setSearchField('productName');
        }
    }, [searchField, value]);

    const handelFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchField((event.target as HTMLInputElement).value);
    };

    const handleEnter = (event: any): void => {
        if (event.key === 'Enter') {
            if (value.length > 0) {
                handleSearch();
            } else {
                navigate({ pathname: '/products' });
            }
        }
    };

    const handleSearch = () => {
        const params = { [searchField]: value };
        // CLOSE
        setAnchorEl(null);
        // REDIRECT
        navigate({ pathname: '/products', search: `?${createSearchParams(params)}` });
    };

    const handleCleanSearch = () => {
        navigate({ pathname: '/products', search: `` });
        setValue('');
    };

    const handleButtonOptionsClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper-a' : undefined;

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
                                                                handleOptions={() => {}}
                                                                cleanSearch={handleCleanSearch}
                                                                handleOptionsCick={handleButtonOptionsClick}
                                                                searchProps={{
                                                                    handelFilter,
                                                                    valueIsNumber,
                                                                    searchField,
                                                                    show: open,
                                                                    id,
                                                                    anchorEl
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
                        <InputAdornment position="end">
                            <HeaderAvatarStyle variant="rounded" onClick={handleButtonOptionsClick}>
                                <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                            </HeaderAvatarStyle>
                            {value.length > 0 && (
                                <Box sx={{ ml: 2 }} onClick={handleCleanSearch}>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.mediumAvatar,
                                            background:
                                                theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.orange.light,
                                            color: theme.palette.orange.dark,
                                            '&:hover': {
                                                background: theme.palette.orange.dark,
                                                color: theme.palette.orange.light
                                            }
                                        }}
                                    >
                                        <IconX stroke={1.5} size="1.3rem" />
                                    </Avatar>
                                </Box>
                            )}
                            <SearchPopOptions
                                handelFilter={handelFilter}
                                valueIsNumber={valueIsNumber}
                                searchField={searchField}
                                show={open}
                                id={id}
                                anchorEl={anchorEl}
                            />
                        </InputAdornment>
                    }
                    aria-describedby="search-helper-text"
                    inputProps={{ 'aria-label': 'weight' }}
                />
            </Box>
            {/* OPTIONS POP UP */}
        </Box>
    );
};

interface SearchPopProps {
    valueIsNumber: boolean;
    handelFilter: (e: any) => void;
    searchField: string;
    show: boolean;
    anchorEl: null | HTMLElement;
    id: string | undefined;
}

const SearchPopOptions = ({ valueIsNumber, handelFilter, searchField, show, anchorEl, id }: SearchPopProps) => (
    <Popper open={show} anchorEl={anchorEl} id={id} placement="bottom-end">
        <Box
            sx={{
                zIndex: 1000,
                position: 'relative',
                // top: { xs: '120%', md: `100%` },
                // left: 0,
                // width: { xs: '100%', md: '125%' },
                minWidth: 200,
                backgroundColor: 'white',
                p: 1,
                paddingRight: 2,
                borderRadius: 2,
                paddingTop: 3
            }}
        >
            <FormControl>
                <RadioGroup
                    aria-labelledby="radio-filter-type"
                    defaultValue="productName"
                    name="radio-filter-type-group"
                    onChange={handelFilter}
                    value={searchField}
                >
                    <FormControlLabel value="productName" control={<Radio />} label="Nombre del producto" />
                    <FormControlLabel disabled={!valueIsNumber} value="idProd" control={<Radio />} label="ID de producto" />
                    <FormControlLabel disabled={!valueIsNumber} value="idSKU" control={<Radio />} label="SKU" />
                    <FormControlLabel disabled={!valueIsNumber} value="productRefID" control={<Radio />} label="Código de referencia" />
                    <FormControlLabel disabled={!valueIsNumber} value="ean" control={<Radio />} label="EAN" />
                </RadioGroup>
            </FormControl>
        </Box>
    </Popper>
);

export default SearchSection;
