// material-ui
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { ImageScore } from 'types/health-content';
import noImahe from '../../../../assets/images/noimage.png';
// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //

const SpectsImages = ({ product }: { product: any }) => {
    console.log(product);

    return (
        <>
            {product ? (
                <TableContainer sx={{ maxHeight: '90vh', bgcolor: 'background.paper' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ ml: 3 }}>
                                <TableCell>Aspects to evaluate</TableCell>
                                <TableCell>Complete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ overflow: 'scroll' }}>
                            <TableRow sx={{ ml: 3 }}>
                                <TableCell>Dimensions</TableCell>
                                <TableCell>
                                    {product?.imageScore?.dimensionScore ? (
                                        <CheckCircleIcon color="success" />
                                    ) : (
                                        <DoNotDisturbOnIcon color="error" />
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ ml: 3 }}>
                                <TableCell>Image Quality</TableCell>
                                <TableCell>
                                    {product?.imageScore?.qualityScore ? (
                                        <CheckCircleIcon color="success" />
                                    ) : (
                                        <DoNotDisturbOnIcon color="error" />
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ ml: 3 }}>
                                <TableCell>Images Quantity</TableCell>
                                <TableCell>
                                    {product?.imageScore?.quantityScore ? (
                                        <CheckCircleIcon color="success" />
                                    ) : (
                                        <DoNotDisturbOnIcon color="error" />
                                    )}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Image</TableCell>
                                            <TableCell>Caracteristics</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {product?.imageDetailScore?.map((detail: ImageScore) => (
                                            <TableRow>
                                                <TableCell>
                                                    {detail?.url !== '' ? (
                                                        <img src={detail.url} alt="imagen" width="150" height="150" />
                                                    ) : (
                                                        <img src={noImahe} alt="imagen" width="150" height="150" />
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <TableRow>
                                                        <TableRow>
                                                            <TableCell>Dimensions: </TableCell>
                                                            <TableCell>
                                                                {detail.dimensionScore ? (
                                                                    <CheckCircleIcon color="success" />
                                                                ) : (
                                                                    <DoNotDisturbOnIcon color="error" />
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Size:</TableCell> <TableCell>{detail.imgSize}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Quality:</TableCell> <TableCell>{detail.imgQuality}</TableCell>
                                                        </TableRow>
                                                    </TableRow>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
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

export default SpectsImages;
