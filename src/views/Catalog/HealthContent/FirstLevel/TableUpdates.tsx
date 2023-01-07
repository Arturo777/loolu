// material-ui
import { Avatar, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { SkuHC } from 'types/health-content';

// project imports
import Chip from 'ui-component/extended/Chip';

// table data
const createData = (
    avtar: string,
    name: string,
    designation: string,
    product: string,
    date: string,
    badgeText: string,
    badgeType: string
) => ({ avtar, name, designation, product, date, badgeText, badgeType });

// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //

const TableUpdates = ({ updates }: { updates: SkuHC[] }) => {
    const formateFechas = (fh: string) => {
        let h = [];
        let f = [];
        let fechaTotal = '';
        f = fh?.split(' ');
        h = f[1].split('.');
        fechaTotal = `${f[0].split('-').reverse().join('/')} ${h[0]}`;
        console.log(fechaTotal);
        return fechaTotal;
    };
    return (
        <>
            {updates && (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 3 }}>Nombre Sku</TableCell>
                                <TableCell>Codigo de Referencia</TableCell>
                                <TableCell>EAN / UPC</TableCell>
                                <TableCell align="right" sx={{ pr: 3 }}>
                                    Fecha de Inserción
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
};

export default TableUpdates;
