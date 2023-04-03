// material-ui
import React, { useState, useEffect } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Button, Box, TextField } from '@mui/material';

import { useDispatch, useSelector } from 'store';
import { facetsToProduct } from 'store/slices/product';

function createData(key: string, value: string) {
    return { key, value };
}

const rowsGeneral = [
    createData('Type', 'Hooded Neck, Paint Clothes'),
    createData('Sleeve', 'Full'),
    createData('Fit', 'Regular'),
    createData('Fabric', 'Hosiery, Smooth, Silk'),
    createData('Style', 'CV-TS9865'),
    createData('Ideal For', 'All'),
    createData('Size', 'Free'),
    createData('Pattern', 'Printed'),
    createData('Reversible', 'No'),
    createData('Secondary Color', 'Black, Brown')
];
interface Specifi {
    key: string;
    value: string;
}
// ==============================|| PRODUCT DETAILS - SPECIFICATION ||============================== //

const Specification = ({
    productInfo,
    setProductInfo,
    active,
    merchantMulti
}: {
    productInfo: any;
    setProductInfo: any;
    active: boolean;
    merchantMulti: any;
}) => {
    const dispatch = useDispatch();
    const [tam, setTam] = useState<Specifi[]>([]);
    const [spectObj, setSpectObj] = useState<Specifi[]>([]);
    useEffect(() => {
        if (productInfo) {
            const infoFacets = { categoryId: productInfo?.categoryId, merchantId: merchantMulti };
            // dispatch(facetsToProduct(infoFacets));
        }
    }, [dispatch, merchantMulti, productInfo]);

    const handleClick = () => {
        setTam((prev: any) => [
            ...prev,
            {
                key: '',
                value: ''
            }
        ]);
    };
    const handleTempSpect = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpectObj((prev: any) => ({ ...prev, [event.target.name]: event.target.value }));
    };
    /* const handleChangeProd = () => {
        setProductInfo((prev: any) => ({ ...prev, [event.target.name]: event.target.value }));
    }; */
    console.log(spectObj);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
                <Typography variant="h4" sx={{ pb: 1.5 }}>
                    General
                </Typography>
                <TableContainer>
                    <Table sx={{ maxWidth: 380 }} size="small" aria-label="simple table">
                        <TableBody>
                            {rowsGeneral.map((row) => (
                                <TableRow key={row.key} sx={{ '& td, & th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="caption" sx={{ fontWeight: 500 }}>
                                            {row.key}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{row.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer>
                    <Table sx={{ maxWidth: 380 }} size="small" aria-label="simple table">
                        <TableBody>
                            <TableRow sx={{ '& td, & th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                                        Name
                                    </Typography>
                                </TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="contained" color="success" sx={{ mt: 3 }} onClick={handleClick}>
                    Add Specifications
                </Button>
            </Grid>

            <Grid item xs={12} lg={6}>
                <Typography variant="h4" sx={{ pb: 1.5 }}>
                    In The Box
                </Typography>
                <TableContainer>
                    <Table sx={{ maxWidth: 280 }} size="small" aria-label="simple table">
                        <TableBody>
                            {tam?.map((row, index) => (
                                <TableRow sx={{ '& td, & th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <Box
                                            sx={{
                                                '& .MuiTextField-root': { mt: 2 }
                                            }}
                                        >
                                            <TextField
                                                fullWidth
                                                multiline
                                                id="outlined-basic"
                                                label="Facet"
                                                variant="outlined"
                                                name={`key-${index}`}
                                                value={productInfo[`key-${index}`]}
                                                onChange={handleTempSpect}
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                '& .MuiTextField-root': { mt: 2 }
                                            }}
                                        >
                                            <TextField
                                                fullWidth
                                                multiline
                                                id="outlined-basic"
                                                label="Valor"
                                                variant="outlined"
                                                name={`value-${index}`}
                                                value={productInfo[`value-${index}`]}
                                                onChange={handleTempSpect}
                                            />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default Specification;
