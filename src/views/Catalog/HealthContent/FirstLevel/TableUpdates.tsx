// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { SkuHC } from 'types/health-content';
import FolderOffIcon from '@mui/icons-material/FolderOff';

// project imports
import Chip from 'ui-component/extended/Chip';
import { useEffect, useState } from 'react';

// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //

const TableUpdates = ({ updates }: { updates: SkuHC[] }) => {
    const [emptyTable, setEmptyTable] = useState<Boolean>(true);

    useEffect(() => {
        if (updates?.length) {
            setEmptyTable(false);
            return;
        }
        setEmptyTable(true);
    }, [updates]);

    return (
        <>
            {updates && (
                <>
                    <TableContainer sx={{ maxHeight: 750 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ pl: 3 }}>
                                        <FormattedMessage id="sku_name" />
                                    </TableCell>
                                    <TableCell>
                                        <FormattedMessage id="reference_code" />
                                    </TableCell>
                                    <TableCell>EAN / UPC</TableCell>
                                    <TableCell align="right" sx={{ pr: 3 }}>
                                        <FormattedMessage id="date_insert" />
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody sx={{ overflow: 'scroll' }}>
                                {updates?.map((row: any, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell sx={{ pl: 3 }}>{row.skuName}</TableCell>
                                        <TableCell>{row.skuReferenceCode}</TableCell>
                                        <TableCell>{row.eanUpc}</TableCell>
                                        <TableCell align="right" sx={{ pr: 3 }}>
                                            <Chip chipcolor="primary" label={row?.dateInsert} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {emptyTable && (
                        <Box
                            sx={{
                                minWidth: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                mt: 3
                            }}
                        >
                            <FolderOffIcon sx={{ width: 50, height: 50, opacity: 0.5 }} />
                            <Typography variant="h3" sx={{ mt: 2 }}>
                                <FormattedMessage id="no_recent_updates" />
                            </Typography>
                        </Box>
                    )}
                </>
            )}
        </>
    );
};

export default TableUpdates;
