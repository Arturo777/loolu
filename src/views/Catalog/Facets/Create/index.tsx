import React, { useState } from 'react';

// mui imports
import { Card, Fade, Typography, Stack, Divider, Box, useTheme, useMediaQuery, Modal } from '@mui/material';

// third imports
import { useIntl } from 'react-intl';

// project imports
import FacetFormComponent from '../FacetForm';
import { useDispatch } from 'store';
import facets from '../List/facetlist';

// services
import { createFacetService } from 'store/slices/catalog';

// types
import { FacetType } from 'types/catalog';
import { openSnackbar } from 'store/slices/snackbar';
import MultiMerchant from 'ui-component/MultiMerchantButton';

type CreateFacetComponentProps = {
    show: boolean;
    handleCancel: () => void;
};

const CreateFacetComponent = ({ show, handleCancel }: CreateFacetComponentProps) => {
    const [merchs, setMerchs] = useState<any>([{}]);
    const [merchantFacets, setMerchantFacets] = useState<any>([]);

    const intl = useIntl();
    const dispatch = useDispatch();
    const theme = useTheme();
    const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    const facetList = facets;

    const handleSave = (data: FacetType) => {
        const filteredFacets = facetList.facets.map((facet: any) => {
            merchs.map((merch: any) => {
                if (facet.merchantId === merch.merchantId) facet.facets.push(data);
            });
        });

        // dispatch(
        //     createFacetService({
        //         idMerchant: 1,
        //         data: {
        //             name: data.name,
        //             nameSap: data.nameSap
        //         }
        //     })
        // )
        //     .then(({ payload }) => {
        //         if (payload.status === 500) throw new Error();
        //         dispatch(
        //             openSnackbar({
        //                 open: true,
        //                 message: `Facet creado correctamente`,
        //                 variant: 'alert',
        //                 alert: {
        //                     color: 'success'
        //                 },
        //                 close: false
        //             })
        //         );
        //     })
        //     .catch(() => {
        //         dispatch(
        //             openSnackbar({
        //                 open: true,
        //                 message: `Error al crear el facet`,
        //                 variant: 'alert',
        //                 alert: {
        //                     color: 'error'
        //                 },
        //                 close: false
        //             })
        //         );
        //     })
        //     .finally(() => {
        //         handleCancel();
        //     });
    };

    const content = () => (
        <>
            <Stack sx={{ mb: 3 }} direction="row" alignItems="center">
                <Typography variant="h4" sx={{ mr: 1 }}>
                    {intl.formatMessage({
                        id: 'create_facet'
                    })}
                </Typography>
                <MultiMerchant
                    onChange={(merchants) => {
                        console.log('SELECTED MERCHANTS', merchants);
                        setMerchs(merchants);
                    }}
                    maxShow={4}
                    defaultSelected={[]}
                />
            </Stack>
            <Divider sx={{ mb: 3 }} />
            <FacetFormComponent handleSave={handleSave} handleCancel={handleCancel} />
        </>
    );

    if (onlyMediumScreen) {
        return (
            <Modal
                open={show}
                onClose={handleCancel}
                aria-labelledby="modal-edit-category"
                aria-describedby="modal-render-form-edit-category"
            >
                <Box sx={modalStyle}>{content()}</Box>
            </Modal>
        );
    }

    return (
        <Fade in={show}>
            <Card sx={{ boxShadow: 2, p: 2, position: 'sticky', top: 100, bottom: 20, zIndex: 5 }}>{content()}</Card>
        </Fade>
    );
};

export default CreateFacetComponent;

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 3,
    pb: 3,
    borderRadius: 2
};
