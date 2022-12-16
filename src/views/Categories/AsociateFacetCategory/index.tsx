import React, { useEffect, useState } from 'react';

// mui imports
import {
    Divider,
    Box,
    Drawer,
    Typography,
    Stack,
    CircularProgress,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Button,
    Fade
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

// type
import { useDispatch } from 'store';
import { getFacetVariant } from 'store/slices/catalogue';
import { CategoryType, SpecificationGroupType, SpecificationsType } from 'types/catalogue';
import { FormattedMessage } from 'react-intl';
import SpecificationForm from './SpecificationForm';

type AsociateFacetCategoryComponentProps = {
    open: boolean;
    toggleDrawer: () => void;
    category: CategoryType | null;
};

export default function AsociateFacetCategoryComponent({ open, toggleDrawer, category }: AsociateFacetCategoryComponentProps) {
    // hooks
    const dispatch = useDispatch();

    // vars
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [specificationGroups, setSpecificationsGroups] = useState<SpecificationGroupType[]>();
    // collapse group
    const [openGroup, setOpenGroup] = useState<number | null>(null);
    // edit
    const [editingSpec, setEditingSpec] = useState<SpecificationsType | null>(null);

    useEffect(() => {
        if (category) {
            setIsLoading(true);
            dispatch(getFacetVariant({ idMerchant: 1, catId: category.id }))
                .then(({ payload }) => {
                    const newSpecs: SpecificationGroupType[] = payload.response[0].specificationGroups;
                    console.log(payload.response[0]);
                    setSpecificationsGroups(newSpecs);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [category, dispatch]);

    const handleEditSpec = (spec: SpecificationsType | null) => {
        if (spec !== null) {
            setEditingSpec(spec);
            setOpenGroup(null);
        }
    };

    const content = () => (
        <>
            {/* SEARCH */}
            {/* SPECS */}
            <Collapse in={!editingSpec} collapsedSize={0} sx={{ p: 0 }}>
                <Box>
                    {specificationGroups &&
                        specificationGroups.map((specificationGroup) => (
                            <React.Fragment key={`specification-grup-${specificationGroup.groupId}`}>
                                <ListItemButton
                                    onClick={() => {
                                        if (openGroup !== specificationGroup.groupId) {
                                            setOpenGroup(specificationGroup.groupId);
                                        } else {
                                            setOpenGroup(null);
                                        }
                                    }}
                                >
                                    <ListItemText primary={specificationGroup.name} />
                                    <ListItemIcon>
                                        <KeyboardArrowDownIcon />
                                    </ListItemIcon>
                                </ListItemButton>
                                <Collapse in={openGroup === specificationGroup.groupId}>
                                    {specificationGroup.prodSpecs.length > 0 && (
                                        <RenderSpecifications
                                            onEditClick={handleEditSpec}
                                            specifications={specificationGroup.prodSpecs}
                                            titleType="PRODUCT"
                                        />
                                    )}
                                    {specificationGroup.skuSpecs.length > 0 && (
                                        <RenderSpecifications
                                            onEditClick={handleEditSpec}
                                            specifications={specificationGroup.skuSpecs}
                                            titleType="SKU"
                                        />
                                    )}
                                </Collapse>
                            </React.Fragment>
                        ))}
                </Box>
            </Collapse>{' '}
            {/* FORM */}
            <SpecificationForm specificationToEdit={editingSpec} handleCancel={() => setEditingSpec(null)} />
            {/* SAVE BUTTON */}
            {Boolean(editingSpec) && (
                <Stack sx={saveButtonContainer} direction="row">
                    <Button onClick={() => setEditingSpec(null)} variant="outlined" startIcon={<CloseIcon />} color="error" sx={{ mr: 2 }}>
                        Cancelar
                    </Button>
                    <Button startIcon={<SaveIcon />} variant="outlined" type="submit">
                        Guardar
                    </Button>
                </Stack>
            )}
        </>
    );

    if (!category) return null;

    return (
        <Drawer anchor="right" open={open} onClose={toggleDrawer}>
            <Box sx={{ width: 480, height: 1, position: 'relative' }}>
                <Stack sx={{ padding: 2 }}>
                    <Typography mb={1} variant="h4">
                        Asociar Facet-Categoria: {category.name}
                    </Typography>
                    <Divider />
                </Stack>

                {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 10 }}>
                        <CircularProgress />
                    </Box>
                )}
                {!isLoading && specificationGroups && content()}
            </Box>
        </Drawer>
    );
}

type RenderSpecificationsProps = {
    specifications: SpecificationsType[];
    titleType: 'PRODUCT' | 'SKU';
    onEditClick: (spec: SpecificationsType) => void;
};

const RenderSpecifications = ({ specifications, titleType, onEditClick }: RenderSpecificationsProps) => (
    <>
        <Typography sx={{ ml: 3 }} variant="subtitle1">
            <FormattedMessage id={titleType.toLocaleLowerCase()} />
        </Typography>
        {specifications.map((spec, index) => (
            <ListItemButton key={`specification-${index}`} sx={{ p: 1, pl: 4 }}>
                <ListItemText primary={spec.name} secondary={spec.description} />
                <ListItemIcon>
                    <EditIcon onClick={() => onEditClick(spec)} />
                </ListItemIcon>
            </ListItemButton>
        ))}
    </>
);

const saveButtonContainer = {
    position: 'sticky',
    width: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    p: 1,
    borderTop: 1,
    borderTopColor: 'rgba(100,100,100,0.3)',
    justifyContent: 'flex-end',
    background: 'white',
    zIndex: 5
};
