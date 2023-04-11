import React, { useEffect, useState, useMemo } from 'react';

// material-ui
import { Box, Button, CircularProgress, Collapse, FormControlLabel, FormGroup, Grid, Stack, Switch } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';

// third imports
import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

// project imports
import { BrandType, BrandType2, NewBrandType2 } from 'types/catalog';
import { useDispatch, useSelector } from 'store';

// assets
import { createBrandMultiCatalog, editBrand, getBrands, getBrands2 } from 'store/slices/catalog';
import BrandForm from '../BrandForm';
import MainCard from 'ui-component/cards/MainCard';

type BransListProps = {
    filterText: string;
    selectedMerchants: any;
    isEdit: boolean;
    setIsEdit: any;
    brandData: any;
    setBrandData: any;
};

const BrandsList = ({ brandData, setBrandData, isEdit, setIsEdit, selectedMerchants, filterText }: BransListProps) => {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();
    const handleSave = async (data: any) => {
        if (isEdit === false) {
            await dispatch(createBrandMultiCatalog(data));
        } else {
            const idMerchant = selectedMerchants[0].merchantId;
            const newData: BrandType = {
                idBrand: Number(idBrand ?? ''),
                idMerchant: data.idMerchant || idMerchant,
                ...data[0].brandData,
                isActive: brandStatus
            };
            await dispatch(editBrand({ dataBrand: newData, idMerchant }));
            console.log({ newData });
        }
        selectedMerchants && dispatch(getBrands2(selectedMerchants[0].merchantId));
    };
    const editbrand = () => {
        setIsEdit(true);
        const brandInfo = brands.find((item) => item.idBrand === Number(idBrand));
        console.log('brandInfo', brandInfo);

        setBrandData(brandInfo);
        setBrandStatus(brandInfo?.isActive ?? false);
    };
    // store
    const { brands2, brands, loading } = useSelector((state) => state.catalogue);
    // merchants
    // state
    const [pageSize, setPageSize] = useState<number>(10);
    const [filteredBrands, setFilteredBrands] = useState<BrandType[] | undefined>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [brandStatus, setBrandStatus] = useState<boolean>(false);

    const [idBrand, setIdBrand] = useState<boolean>();
    useEffect(() => {
        console.log('idBrand', idBrand);
        editbrand();
    }, [idBrand]);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBrandStatus(event.target.checked);
    };
    useEffect(() => {
        if (!selectedMerchants?.length) {
            return;
        }
        setIsLoading(true);
        const idMerchant = selectedMerchants[0].merchantId;
        dispatch(getBrands(Number(idMerchant))).then((res: any) => {
            console.log(res);
        });
        selectedMerchants && dispatch(getBrands2(selectedMerchants[0].merchantId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMerchants]);
    const marcas = useMemo(() => {
        if (!selectedMerchants?.length) {
            return null;
        }
        console.log('selectedMerchants', selectedMerchants);
        const marcas2 = brands2.filter((marca: any) => marca?.merchantId === selectedMerchants[0]?.merchantId);
        setIsLoading(false);
        return marcas2[0];
    }, [brands2, selectedMerchants]);

    useEffect(() => {
        if (filterText?.length === 0) {
            setFilteredBrands(marcas?.brands);
        } else {
            const filtered = marcas?.brands.filter(
                (brand: BrandType) =>
                    JSON.stringify(brand)
                        .toLowerCase()
                        .indexOf(filterText?.toLowerCase() ?? '') > -1
            );

            setFilteredBrands(filtered);
        }
    }, [filterText, marcas]);

    console.log(selectedMerchants);
    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: intl.formatMessage({
                id: 'name'
            }),
            width: 150,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'title',
            headerName: intl.formatMessage({
                id: 'title'
            }),
            width: 150,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'metaTagDescription',
            headerName: intl.formatMessage({
                id: 'description'
            }),
            width: 150,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'imageUrl',
            headerName: intl.formatMessage({
                id: 'image'
            }),
            width: 220,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'idBrand',
            headerName: '',
            renderCell: (params) => (
                <Box>
                    {/* <Button
                        component={Link}
                        to={`${params.row.idBrand}/edit/?idMerchant=${selectedMerchants[0].merchantId}`}
                        size="small"
                        startIcon={<EditIcon />}
                        variant="outlined"
                    >
                        {intl.formatMessage({ id: 'edit' })}
                    </Button> */}
                    <Button onClick={editbrand} size="small" startIcon={<EditIcon />} variant="outlined">
                        {intl.formatMessage({ id: 'edit' })}
                    </Button>
                </Box>
            ),
            width: 120,
            align: 'center',
            headerAlign: 'center'
        }
    ];
    return (
        <div style={{ display: 'flex' }}>
            <Box sx={{ width: '50%' }}>
                <Collapse in={!loading}>
                    {!isLoading && (
                        <DataGrid
                            loading={loading}
                            rows={filteredBrands ?? []}
                            // eslint-disable-next-line @typescript-eslint/no-shadow
                            getRowId={(row: any) => `${row.idBrand}`}
                            onRowClick={(params) => {
                                setIdBrand(params.row.idBrand);
                            }}
                            columns={columns}
                            pageSize={pageSize}
                            rowsPerPageOptions={[10, 20, 50, 100]}
                            onPageSizeChange={setPageSize}
                            autoHeight
                            disableSelectionOnClick
                        />
                    )}
                </Collapse>
                <Collapse in={loading}>
                    <Stack justifyContent="center" alignItems="center" p={5}>
                        <CircularProgress />
                    </Stack>
                </Collapse>
            </Box>
            <Box sx={{ width: '50%' }}>
                <MainCard
                    title={
                        isEdit
                            ? intl.formatMessage({
                                  id: 'edit_brand'
                              })
                            : intl.formatMessage({
                                  id: 'create_brand'
                              })
                    }
                    secondary={
                        isEdit && (
                            <FormGroup>
                                <FormControlLabel
                                    checked={brandStatus}
                                    control={<Switch onChange={handleChange} />}
                                    labelPlacement="start"
                                    label={
                                        <b>
                                            <FormattedMessage id={brandStatus ? 'active' : 'inactive'} />
                                        </b>
                                    }
                                />
                            </FormGroup>
                        )
                    }
                >
                    <BrandForm isEdit={isEdit} initialData={brandData} handleSave={handleSave} />
                </MainCard>
            </Box>
        </div>
    );
};

export default BrandsList;
