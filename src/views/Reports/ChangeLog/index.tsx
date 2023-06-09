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
    InputLabel,
    CircularProgress,
    Collapse,
    useTheme
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
import { ChangeLog, ChangeLogMulticatalogo } from 'types/reports';
import { compareAsc } from 'date-fns';
import Loader from 'ui-component/Loader';
import MultiMerchant from 'ui-component/MultiMerchantButton';
import { MerchantType } from 'types/security';

enum sortOptions {
    'prodId' = 'prodId',
    'skuId' = 'skuId',
    'userLog' = 'userLog',
    'dateChange' = 'dateChange'
}
type merchant = {
    isFather: boolean;
    isSelected: boolean;
    merchantId: number;
    name: string;
};
export default function ChangeLogPage() {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();

    // store
    const { changeLog, loading } = useSelector((state) => state.reports);

    // vars
    const [filterText, setFilterText] = useState<string>('');
    const [formattedList, setFormattedList] = useState<any[]>([]);

    const [selectedItem, setSelectedItem] = useState<ChangeLog | null>(null);

    const [selectedMerchant, setSelectedMerchant] = useState<number | null>(null);

    const [sortBy, setSortBy] = useState<sortOptions>(sortOptions.prodId);
    useEffect(() => {
        if (selectedMerchant) {
            const filterCahgeloft = changeLog.filter((item) => item.idMerchant === selectedMerchant);
            console.log({ filterCahgeloft });
            const filterChangeLogs = filterCahgeloft.filter((item) => item.changeLogs);
            console.log('filterChangeLogs', filterChangeLogs);
            const data = filterCahgeloft[0]?.changeLogs;
            console.log([data]);
            setFormattedList([data]);
        }
    }, [changeLog, selectedMerchant]);

    useEffect(() => {
        dispatch(getChangeLogList(1));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
        const newString = event?.target.value;
        setFilterText(newString ?? '');
    };

    const handleSelect = (item: any) => {
        setSelectedItem(null);
        setTimeout(() => {
            setSelectedItem(item);
        }, 200);
    };

    const handleSelectedMerchant = (idMerchant: MerchantType[]) => {
        if (idMerchant.length) {
            setSelectedMerchant(idMerchant[0].merchantId);
        }
    };
    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const selectedMerchanLogs = changeLog.find((item) => item.idMerchant === selectedMerchant);
        console.log({ selectedMerchanLogs });

        // const filterChangeLogs = selectedMerchanLogs.filter((item) => item.changeLogs);
        // const data = filterChangeLogs.flatMap((item) => item);
        const filteredList =
            filterText !== ''
                ? selectedMerchanLogs.changeLogs.filter(
                      (item: any) =>
                          JSON.stringify(item || {})
                              .toLowerCase()
                              .indexOf(filterText) > -1
                  )
                : [...selectedMerchanLogs.changeLogs];
        // const filteredListMerchants = filteredList.filter((item) => item.idMerchant === selectedMerchant);

        // const filteredListMerchantsFlat = filteredListMerchants.flatMap((item) => item.changeLogs);
        const sortList = filteredList.sort((a: any, b: any) => {
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
                <Grid container direction="row" alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid container alignItems="center" item md={4}>
                        <Typography variant="h3">
                            {intl.formatMessage({
                                id: 'change_log'
                            })}
                        </Typography>
                        <MultiMerchant
                            onChange={(merchants: MerchantType[]) => handleSelectedMerchant(merchants)}
                            maxShow={3}
                            justOne
                            defaultSelected={[]}
                        />
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
            {loading && <Loader />}
            <Grid container spacing={gridSpacing} p={2}>
                <Grid item xs={12} sm={6} md={8} lg={8} xl={8}>
                    <Collapse in={loading}>
                        <Stack sx={{ width: 1, p: 5 }} alignItems="center" justifyContent="center">
                            <CircularProgress />
                        </Stack>
                    </Collapse>
                    <Fade in={!loading}>
                        <Box>
                            <ChangeLogList changeLog={formattedList} handleSelect={handleSelect} />
                        </Box>
                    </Fade>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
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
    const theme = useTheme();
    useEffect(() => {
        if (selected) {
            const newData = getDataFormatted(selected.productLog);

            setFormatted(newData);
        }
    }, [selected]);

    return (
        <Card
            elevation={2}
            sx={{
                p: 2,
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.grey[100],
                '&:hover': {
                    border: `1px solid${theme.palette.primary.main}`
                }
            }}
        >
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
