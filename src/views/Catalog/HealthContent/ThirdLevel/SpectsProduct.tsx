// material-ui
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { SkuHC } from 'types/health-content';

// project imports
import Chip from 'ui-component/extended/Chip';

// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //

const SpectsProduct = ({ product }: { product: any }) => {
    const formateFechas = (fh: string) => {
        let h = [];
        let f = [];
        let fechaTotal = '';
        f = fh?.split(' ');
        h = f[1].split('.');
        fechaTotal = `${f[0].split('-').reverse().join('/')} ${h[0]}`;
        return fechaTotal;
    };
    console.log(product);
    return (
        <>
            {product.length > 0 && (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 3 }}>Aspects to evaluate</TableCell>
                                <TableCell>Complete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ overflow: 'scroll' }}>
                            {product?.map((row: any, index: any) => (
                                <TableRow hover key={index}>
                                    <TableCell sx={{ pl: 3 }}>{product[index]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
};

export default SpectsProduct;
