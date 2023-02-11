// material-ui
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
/* import { ThirdLevel } from 'types/health-content'; */
import { Key } from 'react';

// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //

const SpectsFacets = ({ product }: { product: any }) => {
    console.log(product);
    return (
        <>
            {product ? (
                <TableContainer sx={{ maxHeight: 850, bgcolor: 'background.paper' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ ml: 3 }}>
                                <TableCell>Facets Products</TableCell>
                                <TableCell>Facets Sku</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ overflow: 'scroll', width: '500px' }}>
                            <TableRow sx={{ ml: 3 }}>
                                <TableCell>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Facet</TableCell>
                                                <TableCell>Complete</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {product?.metric1?.map((metric: any, index: Key | null | undefined) => (
                                                <TableRow key={index}>
                                                    <TableCell>{metric?.productValue}</TableCell>
                                                    <TableCell>
                                                        {metric.productValueScore ? (
                                                            <CheckCircleIcon color="success" />
                                                        ) : (
                                                            <DoNotDisturbOnIcon color="error" />
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableCell>
                                <TableCell>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Facet</TableCell>
                                                <TableCell>Complete</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {product?.metric2?.map((metric: any, index: Key | null | undefined) => (
                                                <TableRow key={index}>
                                                    <TableCell>{metric?.skuValue}</TableCell>
                                                    <TableCell>
                                                        {metric.skuValueScore ? (
                                                            <CheckCircleIcon color="success" />
                                                        ) : (
                                                            <DoNotDisturbOnIcon color="error" />
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <p>Cargando ..</p>
            )}
        </>
    );
};

export default SpectsFacets;
