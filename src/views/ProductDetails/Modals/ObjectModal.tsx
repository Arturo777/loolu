import { Modal, Box, Button } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
};

const ObjectModal = ({
    setModal,
    modal,
    search,
    setSearch,
    newObject,
    setFlag
}: {
    setModal: any;
    modal: boolean;
    search: string;
    setSearch: any;
    newObject: any;
    setFlag: any;
}) => {
    const handleClose = (value: string) => {
        newObject(value);
        setModal(false);
    };
    const handleReject = () => {
        setFlag(false);
        setModal(false);
        setSearch('');
    };

    return (
        <>
            <Modal
                hideBackdrop
                open={modal}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 500 }}>
                    <h2 id="child-modal-title">Confirmar Creación de Marca</h2>
                    <p id="child-modal-description">
                        Por favor, confirma que el nombre <span style={{ fontWeight: 'bold' }}>{search}</span> asignado a tu Marca es
                        correcto.
                    </p>
                    <Button onClick={handleReject} variant="outlined" sx={{ mr: 2 }}>
                        Revisar
                    </Button>
                    <Button onClick={() => handleClose(search)} variant="contained">
                        Confirmar
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default ObjectModal;
