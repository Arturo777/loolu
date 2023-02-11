// material-ui
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { SkuHC } from 'types/health-content';

// project imports
import Chip from 'ui-component/extended/Chip';

// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //

const TableUpdates = ({ updates }: { updates: SkuHC[] }) => (
    <>
        {updates && (
            <TableContainer sx={{ maxHeight: 750, bgcolor: 'background.paper' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 3 }}>Sku Name</TableCell>
                            <TableCell>Reference Code</TableCell>
                            <TableCell>EAN / UPC</TableCell>
                            <TableCell align="right" sx={{ pr: 3 }}>
                                Date Insert
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
        )}
    </>
);

export default TableUpdates;
