import React, { useEffect, useState } from 'react';

// mui imports
import {
    Card,
    Grid,
    InputAdornment,
    Typography,
    Box,
    Stack,
    Divider,
    Fade,
    Button,
    Select,
    MenuItem,
    SelectChangeEvent,
    TextField,
    FormControl,
    InputLabel
} from '@mui/material';

// assets
import { IconSearch } from '@tabler/icons';

// third party imports
import { useIntl } from 'react-intl';

// project imports
import { useDispatch, useSelector } from 'store';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import ChangeLogList from './ChangeLogList';
import { getChangeLogList } from 'store/slices/reports';
import { ChangeLog } from 'types/reports';
import { compareAsc } from 'date-fns';

enum sortOptions {
    'prodId' = 'prodId',
    'skuId' = 'skuId',
    'userLog' = 'userLog',
    'dateChange' = 'dateChange'
}

export default function ChangeLogPage() {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();

    // store
    const { changeLog } = useSelector((state) => state.reports);

    // vars
    const [filterText, setFilterText] = useState<string>('');
    const [formattedList, setFormattedList] = useState<ChangeLog[]>([]);

    const [selectedItem, setSelectedItem] = useState<ChangeLog | null>(null);

    const [sortBy, setSortBy] = useState<sortOptions>(sortOptions.prodId);

    useEffect(() => {
        setFormattedList(changeLog);
    }, [changeLog]);

    useEffect(() => {
        dispatch(getChangeLogList({ idMerchant: 1 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
        const newString = event?.target.value;
        setFilterText(newString ?? '');
    };

    const handleSelect = (item: ChangeLog) => {
        setSelectedItem(null);
        setTimeout(() => {
            setSelectedItem(item);
        }, 200);
    };

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const filteredList =
            filterText !== '' ? changeLog.filter((item) => JSON.stringify(item).toLowerCase().indexOf(filterText) > -1) : [...changeLog];

        const sortList = filteredList.sort((a, b) => {
            if (sortBy === sortOptions.userLog) {
                return a.userLog < b.userLog ? -1 : 1;
            }
            if (sortBy === sortOptions.prodId || sortOptions.skuId) {
                return Number(a[sortBy]) < Number(b[sortBy]) ? -1 : 1;
            }
            if (sortBy === sortOptions.dateChange) {
                const dateA = new Date(a.dateChange);
                const dateB = new Date(b.dateChange);

                return compareAsc(dateB, dateA);
            }

            return 1;
        });

        setFormattedList(sortList);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setSortBy(event.target.value as sortOptions);
    };

    return (
        <MainCard
            sx={{
                overflow: 'initial'
            }}
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">
                            {intl.formatMessage({
                                id: 'change_log'
                            })}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Box component="form" onSubmit={handleFilter}>
                            <FormControl sx={{ minWidth: 120 }}>
                                <InputLabel>
                                    {intl.formatMessage({
                                        id: 'sort_by'
                                    })}
                                </InputLabel>
                                <Select onChange={handleChange} value={sortBy} size="small" sx={{ mr: 1 }}>
                                    <MenuItem value={sortOptions.prodId}>Producto</MenuItem>
                                    <MenuItem value={sortOptions.skuId}>Sku</MenuItem>
                                    <MenuItem value={sortOptions.userLog}>User</MenuItem>
                                    <MenuItem value={sortOptions.dateChange}>Fecha</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Search"
                                id="input-search-list-style1"
                                placeholder={intl.formatMessage({
                                    id: 'filter'
                                })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconSearch stroke={1.5} size="16px" />
                                        </InputAdornment>
                                    )
                                }}
                                size="small"
                                value={filterText}
                                onChange={handleSearch}
                                sx={{ mr: 2 }}
                            />
                            <Button type="submit" variant="outlined">
                                {intl.formatMessage({
                                    id: 'apply'
                                })}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            }
            content={false}
        >
            <Grid container spacing={gridSpacing} p={2}>
                <Grid item xs={12} sm={6} md={5} lg={5} xl={4}>
                    <ChangeLogList changeLog={formattedList} handleSelect={handleSelect} />
                </Grid>
                <Grid item xs={12} sm={6} md={5} lg={5} xl={4}>
                    <Box sx={{ position: 'sticky', top: 100, bottom: 20 }}>
                        <Fade in={selectedItem != null}>
                            <Box>
                                <RenderItem selected={selectedItem} />
                            </Box>
                        </Fade>
                    </Box>
                </Grid>
            </Grid>
        </MainCard>
    );
}

const RenderItem = ({ selected }: { selected: ChangeLog | null }) => {
    const [formatted, setFormatted] = useState<{ [key: string]: string }>();

    useEffect(() => {
        if (selected) {
            const newData = getDataFormatted(selected.productLog);

            setFormatted(newData);
        }
    }, [selected]);

    return (
        <Card elevation={2} sx={{ p: 2 }}>
            <Typography variant="h3">Log</Typography>
            <Box component={Divider} sx={{ mb: 2, mt: 2 }} />

            {formatted &&
                Object.keys(formatted).map((keyName) => (
                    <Stack direction="row" alignItems="flex-end" sx={{ mb: 1 }}>
                        <Typography variant="body1" sx={{ mr: 1 }}>{`${keyName}: `}</Typography>
                        <Typography variant="body1" fontWeight="bold">
                            {formatted[keyName]}
                        </Typography>
                    </Stack>
                ))}
        </Card>
    );
};

const getDataFormatted = (data: string): { [key: string]: string } => {
    const cleaned = data.replace('VtexProductCatalog(', '').replace(')', '');

    const splitted = cleaned.split(', ');

    const newData: { [key: string]: string } = {};

    splitted.forEach((item) => {
        const itemSplitted = item.split('=');

        newData[itemSplitted[0]] = itemSplitted[1];
    });

    return newData;
};
