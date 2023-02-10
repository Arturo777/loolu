/* eslint-disable react/destructuring-assignment */
// material-ui
import { styled } from '@mui/material/styles';
import {
    Collapse,
    Box,
    CircularProgress,
    /* Grid, */
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    Paper
} from '@mui/material';
import { CircularProgressProps } from '@mui/material/CircularProgress';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Key, useState } from 'react';

// project imports
import DrawerProduct from '../ThirdLevel/DrawerProduct';

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
                variant="determinate"
                // eslint-disable-next-line no-nested-ternary
                color={props.value <= 34 ? 'error' : props.value >= 35 && props.value <= 80 ? 'warning' : 'success'}
                size={60}
                {...props}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
    })
}));
// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //

const TableProducts = ({ products, typeReq }: { products: any; typeReq: string }) => {
    const [expanded, setExpanded] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [idProd, setIdProd] = useState<number | null>(null);
    const handledClickProduct =
        (open: boolean, prod: number | null = null) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            setOpenModal(open);
            if (prod !== null) {
                setIdProd(prod);
            }
        };
    /* const [idProd, setIdProd] = useState<number>(0); */
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            {products && (
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 850, bgcolor: 'background.paper' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ pl: 3 }}>Name</TableCell>
                                    <TableCell>Reference Code</TableCell>
                                    <TableCell>EAN / UPC</TableCell>
                                    <TableCell align="right" sx={{ pr: 3 }}>
                                        Complete
                                    </TableCell>
                                    <TableCell align="right" sx={{ pr: 3 }} />
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ overflow: 'scroll' }}>
                                {products?.map((row: any, index: Key | null | undefined) => (
                                    <TableRow hover key={index}>
                                        <TableCell sx={{ pl: 3 }}>{row.productName}</TableCell>
                                        <TableCell>{row.productReferenceCode}</TableCell>
                                        <TableCell>
                                            {row?.eanUpc?.length > 1 ? (
                                                <>
                                                    <div style={{ display: 'flex' }}>
                                                        <p>{row?.eanUpc[0]}</p>
                                                        <ExpandMore
                                                            expand={expanded}
                                                            onClick={handleExpandClick}
                                                            aria-expanded={expanded}
                                                            aria-label="show more"
                                                            style={{ marginLeft: '2px' }}
                                                        >
                                                            <ExpandMoreIcon />
                                                        </ExpandMore>
                                                    </div>
                                                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                                                        {row?.eanUpc?.map((ean: any) => (
                                                            <p>{ean}</p>
                                                        ))}
                                                    </Collapse>
                                                </>
                                            ) : (
                                                <p>{row?.eanUpc}</p>
                                            )}
                                        </TableCell>
                                        <TableCell align="right" sx={{ pr: 3 }}>
                                            <CircularProgressWithLabel value={row?.completeness} />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={handledClickProduct(true, row.productId)}
                                            >
                                                Ver más
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            )}
            <DrawerProduct handledClickProduct={handledClickProduct} openModal={openModal} idProd={idProd} typeReq={typeReq} />
        </>
    );
};

export default TableProducts;
