// material-ui
import { useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Button, Box, TextField } from '@mui/material';

function createData(key: string, value: string) {
    return { key, value };
}

const rows = [
    createData('Sales Package', '5 Items'),
    createData('Gift Box', 'Yes'),
    createData('Plastic Wrapper', 'Yes'),
    createData('Safety Wrapper', 'No')
];

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

// ==============================|| PRODUCT DETAILS - SPECIFICATION ||============================== //

const Specification = () => {
    const [spectObj, setSpectObj] = useState([
        {
            key: '',
            value: ''
        }
    ]);

    const handleClick = () => {
        setSpectObj((prev: any) => [
            ...prev,
            {
                key: '',
                value: ''
            }
        ]);
    };
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
                            {spectObj.map((row) => (
                                <TableRow key={row?.key} sx={{ '& td, & th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row?.key !== '' ? (
                                            <Typography variant="caption" sx={{ fontWeight: 500 }}>
                                                {row?.key}
                                            </Typography>
                                        ) : (
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
                                                    name="key"
                                                    value={row?.key}
                                                />
                                            </Box>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {row?.value !== '' ? (
                                            row?.value
                                        ) : (
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
                                                    name="value"
                                                    value={row?.value}
                                                />
                                            </Box>
                                        )}
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
