import React, { FormEvent, useState, useEffect } from 'react';

// material-ui
import { Fade, IconButton, Stack, TextField, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// assets
// import { IconSearch } from '@tabler/icons';
import { useIntl } from 'react-intl';
import { Box } from '@mui/system';

export default function SearchInput({ initialValue, onSearch }: { initialValue?: string; onSearch: (searchText: string) => void }) {
    // hooks
    const intl = useIntl();
    const theme = useTheme();

    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        setSearchText(initialValue ?? '');
    }, [initialValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);

        if (e.target.value === '') {
            onClear();
        }
    };

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearchSubmit();
    };

    const onSearchSubmit = () => {
        onSearch(searchText);
    };

    const onClear = () => {
        console.log('onClear');
        setSearchText('');
        onSearch('');
    };

    return (
        <Box component="form" onSubmit={handleSearch} sx={{ display: 'inline' }}>
            <TextField
                InputProps={{
                    endAdornment: (
                        <Stack direction="row" alignItems="center">
                            <Fade in={Boolean(searchText)}>
                                <ClearIcon
                                    onClick={onClear}
                                    sx={{
                                        fontSize: 16,
                                        opacity: 0,
                                        transitions: 'all 420ms ease',
                                        cursor: 'pointer',
                                        mr: 1,
                                        '&:hover': {
                                            opacity: 1,
                                            color: '#ff6347',
                                            transitions: 'all 420ms ease'
                                        }
                                    }}
                                />
                            </Fade>
                            <Fade in={Boolean(searchText)}>
                                <IconButton
                                    onClick={onSearchSubmit}
                                    size="small"
                                    sx={{
                                        '&:hover': {
                                            color: theme.palette.primary.main
                                        }
                                    }}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </Fade>
                        </Stack>
                    )
                }}
                value={searchText}
                variant="outlined"
                placeholder={intl.formatMessage({ id: 'search' })}
                size="small"
                onChange={handleChange}
            />
        </Box>
    );
}
