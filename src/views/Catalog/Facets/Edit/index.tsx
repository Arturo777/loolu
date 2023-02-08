import React, { useEffect, useState } from 'react';

// mui imports
import { Card, Fade, Stack, Typography, Divider, Box, CircularProgress, useTheme, useMediaQuery, Modal } from '@mui/material';

// third imports
import { useIntl } from 'react-intl';

// project imports
import { useDispatch } from 'store';
import FacetFormComponent from '../FacetForm';

// services
import { editFacetService, getFacetService } from 'store/slices/catalog';

// types
import { FacetType } from 'types/catalog';
import { openSnackbar } from 'store/slices/snackbar';

type EditFacetComponentProps = {
    show: boolean;
    handleCancel: () => void;
    facetId: number | null;
};

const EditFacetComponent = ({ show, handleCancel, facetId }: EditFacetComponentProps) => {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();
    const theme = useTheme();
    const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    // info
    const [facetData, setFacetData] = useState<FacetType>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (facetId) {
            // get facet info
            setIsLoading(true);
            dispatch(getFacetService({ merchantId: 1, facetId }))
                .then(({ payload }) => {
                    setFacetData(payload);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [facetId]);

    // save new info
    const handleSave = async (data: FacetType) => {
        dispatch(
            editFacetService({
                merchantId: 1,
                data: [
                    {
                        ...data,
                        id: facetId ?? 1
                    }
                ]
            })
        )
            .then(({ payload }) => {
                if (payload.status === 500) throw new Error();
                dispatch(
                    openSnackbar({
                        open: true,
                        message: `Facet actualizado correctamente`,
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: false
                    })
                );
            })
            .catch(() => {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: `Error al actualizar el facet`,
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        close: false
                    })
                );
            })
            .finally(() => {
                handleCancel();
            });
    };

    const renderContent = () => (
        <>
            <Stack sx={{ mb: 3 }}>
                <Typography variant="h4">
                    {intl.formatMessage({
                        id: 'edit_facet'
                    })}
                </Typography>
            </Stack>
            <Divider sx={{ mb: 3 }} />
            {isLoading && (
                <Fade in={isLoading}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 10 }}>
                        <CircularProgress />
                    </Box>
                </Fade>
            )}
            {!isLoading && <FacetFormComponent editingData={facetData} handleSave={handleSave} handleCancel={handleCancel} />}
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
                <Box sx={modalStyle}>
                    {isLoading && (
                        <Fade in={isLoading}>
                            <Box component={Card} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 10 }}>
                                <CircularProgress />
                            </Box>
                        </Fade>
                    )}
                    {!isLoading && renderContent()}
                </Box>
            </Modal>
        );
    }

    return (
        <Fade in={show}>
            <Card sx={{ boxShadow: 2, p: 2, position: 'sticky', top: 100, bottom: 20, zIndex: 5 }}>{renderContent()}</Card>
        </Fade>
    );
};

export default EditFacetComponent;

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
