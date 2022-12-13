import React, { FormEvent, useEffect, useState } from 'react';

// material-ui
import {
    MenuItem,
    Grid,
    TextField,
    Divider,
    Button,
    Box,
    InputLabel,
    Select,
    FormControl,
    SelectChangeEvent,
    Typography
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import { useIntl } from 'react-intl';

// project imports
import { gridSpacing } from 'store/constant';
import { useSelector } from 'store';
import { SupplierType } from 'types/catalogue';

// assets
// flags
import flagMX from '../../../assets/images/countries/mx.png';
import flagUS from '../../../assets/images/countries/us.png';

type newSupplierType = {
    id?: number;
    name: string;
    countryId: string;
};

const initialDataState: newSupplierType = {
    name: '',
    countryId: ''
};

type SupplierFormProps = {
    initialData?: SupplierType;
    handleSave: (data: any) => void;
};

export default function SupplierForm({ initialData, handleSave }: SupplierFormProps) {
    const intl = useIntl();
    const [newData, setNewData] = useState<newSupplierType>(initialDataState);
    const { updating } = useSelector((state) => state.catalogue);

    useEffect(() => {
        if (initialData) {
            setNewData({
                name: initialData.name,
                countryId: initialData.countryId
            });
        }
    }, [initialData]);

    const handleChange = (event: SelectChangeEvent) => {
        setNewData({ ...newData, countryId: event.target.value as string });
    };

    const onchangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewData({ ...newData, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handleSave(newData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <TextField
                        value={newData.name}
                        fullWidth
                        label={intl.formatMessage({
                            id: 'supplier_name'
                        })}
                        name="name"
                        onChange={onchangeText}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <FormControl fullWidth>
                        <InputLabel id="select-country-label">
                            {intl.formatMessage({
                                id: 'country'
                            })}
                        </InputLabel>
                        <Select
                            labelId="select-country-label"
                            id="select-country"
                            value={newData.countryId}
                            label={intl.formatMessage({
                                id: 'country'
                            })}
                            onChange={handleChange}
                            renderValue={(selected) => <RenderCountryLabel country={selected} />}
                        >
                            <MenuItem value="MX">
                                <Box
                                    component="img"
                                    alt="MX"
                                    src={flagMX}
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: '50%'
                                    }}
                                />
                                <Typography ml={1}>México</Typography>
                            </MenuItem>
                            <MenuItem value="US">
                                <Box
                                    component="img"
                                    alt="US"
                                    src={flagUS}
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: '50%'
                                    }}
                                />
                                <Typography ml={1}>Estados Unidos</Typography>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} pt={4} pl={3}>
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button disabled={updating} variant="outlined" startIcon={<SaveIcon />} type="submit">
                            Guardar
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
}

type RenderCountryLabelProps = {
    country: string;
};

const RenderCountryLabel = ({ country }: RenderCountryLabelProps) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Box
            component="img"
            alt={country}
            src={flagsImg[country]}
            sx={{
                width: 25,
                height: 25,
                borderRadius: '50%'
            }}
        />
        <Typography ml={1}>{countryName[country]}</Typography>
    </Box>
);

const countryName: { [key: string]: any } = {
    MX: 'México',
    US: 'Estados Unidos'
};

const flagsImg: { [key: string]: any } = {
    MX: flagMX,
    US: flagUS
};

// <></>
