// material-ui
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //

const SpectsProduct = ({ product }: { product: any }) => {
    console.log(product);

    return (
        <>
            {product ? (
                <TableContainer sx={{ maxHeight: 850, bgcolor: 'background.paper' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ ml: 3 }}>
                                <TableCell>Aspects to evaluate</TableCell>
                                <TableCell>Complete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ overflow: 'scroll' }}>
                            <TableRow sx={{ ml: 3 }}>
                                <TableCell>Category</TableCell>
                                <TableCell>
                                    {product.categoryScore ? <CheckCircleIcon color="success" /> : <DoNotDisturbOnIcon color="error" />}
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ ml: 3 }}>
                                <TableCell>EAN</TableCell>
                                <TableCell>
                                    {product.eanUpcScore ? <CheckCircleIcon color="success" /> : <DoNotDisturbOnIcon color="error" />}
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ ml: 3 }}>
                                <TableCell>Title</TableCell>
                                <TableCell>
                                    {product.pageTitleScore ? <CheckCircleIcon color="success" /> : <DoNotDisturbOnIcon color="error" />}
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ ml: 3 }}>
                                <TableCell>Product Reference Code</TableCell>
                                <TableCell>
                                    {product.productReferenceCodeScore ? (
                                        <CheckCircleIcon color="success" />
                                    ) : (
                                        <DoNotDisturbOnIcon color="error" />
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ ml: 3 }}>
                                <TableCell>Sku Reference Code</TableCell>
                                <TableCell>
                                    {product.skuReferenceCodeScore ? (
                                        <CheckCircleIcon color="success" />
                                    ) : (
                                        <DoNotDisturbOnIcon color="error" />
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ ml: 3 }}>
                                <TableCell>Text Link</TableCell>
                                <TableCell>
                                    {product.textLinkScore ? <CheckCircleIcon color="success" /> : <DoNotDisturbOnIcon color="error" />}
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ ml: 3, background: '#000' }}>
                                <TableCell>Dimensions</TableCell>
                                <TableCell />
                            </TableRow>
                            <TableRow>
                                <TableCell>Width</TableCell>
                                <TableCell>
                                    {product.dimensionWidthScore ? (
                                        <CheckCircleIcon color="success" />
                                    ) : (
                                        <DoNotDisturbOnIcon color="error" />
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Height</TableCell>
                                <TableCell>
                                    {product.dimensionHeightScore ? (
                                        <CheckCircleIcon color="success" />
                                    ) : (
                                        <DoNotDisturbOnIcon color="error" />
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Weight</TableCell>
                                <TableCell>
                                    {product.dimensionWeightScore ? (
                                        <CheckCircleIcon color="success" />
                                    ) : (
                                        <DoNotDisturbOnIcon color="error" />
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Large</TableCell>
                                <TableCell>
                                    {product.dimensionLargeScore ? (
                                        <CheckCircleIcon color="success" />
                                    ) : (
                                        <DoNotDisturbOnIcon color="error" />
                                    )}
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

export default SpectsProduct;
