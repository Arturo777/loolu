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
    Button
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

// third-party imports
import { FormattedMessage } from 'react-intl';

// project imports
import { getFacetVariant } from 'store/slices/catalogue';
import { useDispatch } from 'store';
import SpecificationForm from './SpecificationForm';
import SearchFacetsComponent from './SearchFacetsComponent';

// type
import { CategoryType, FacetType, SpecificationGroupType, SpecificationsType, SpecificationValuesType } from 'types/catalogue';

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

    const [editingForm, setEditingForm] = useState<{
        show: boolean;
        specification: SpecificationsType | null;
        mode: SpecificationValuesType | null;
    }>({ show: false, specification: null, mode: null });

    // const [editingForm.show, setShowSpecForm] = useState<boolean>(false);
    // const [editingSpec, setEditingSpec] = useState<SpecificationsType | null>(null);

    useEffect(() => {
        // reset
        if (!open) {
            setOpenGroup(null);
            setEditingForm({
                specification: null,
                show: false,
                mode: null
            });
        }
    }, [open]);

    useEffect(() => {
        if (category) {
            setIsLoading(true);
            dispatch(getFacetVariant({ idMerchant: 1, catId: category.id }))
                .then(({ payload }) => {
                    const newSpecs: SpecificationGroupType[] = payload.response[0].specificationGroups;
                    setSpecificationsGroups(newSpecs);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [category, dispatch]);

    const handleEditSpec = (spec: SpecificationsType | null) => {
        setEditingForm({
            specification: spec,
            show: spec !== null,
            mode: null
        });
        // setShowSpecForm(spec !== null);
        // setEditingSpec(spec);
    };

    const handeAdd = (facet: FacetType, mode: SpecificationValuesType) => {
        console.log(facet, mode);
        setEditingForm({
            specification: null,
            show: true,
            mode
        });
    };

    const content = () => (
        <>
            {/* SEARCH */}
            <Collapse in={!editingForm.show}>
                <SearchFacetsComponent handleAddFacet={handeAdd} />
            </Collapse>
            {/* SPECS */}
            <Collapse in={!editingForm.show} collapsedSize={0} sx={{ p: 0 }}>
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
                                            titleType={SpecificationValuesType.PRODUCT}
                                        />
                                    )}
                                    {specificationGroup.skuSpecs.length > 0 && (
                                        <RenderSpecifications
                                            onEditClick={handleEditSpec}
                                            specifications={specificationGroup.skuSpecs}
                                            titleType={SpecificationValuesType.SKU}
                                        />
                                    )}
                                </Collapse>
                            </React.Fragment>
                        ))}
                </Box>
            </Collapse>
            {/* FORM */}
            <SpecificationForm
                categoryId={category?.id ?? 1}
                specificationToEdit={editingForm.specification}
                show={editingForm.show}
                edit={editingForm.specification !== null && editingForm.show}
                handleCancel={() => {
                    setEditingForm({
                        specification: null,
                        show: false,
                        mode: null
                    });
                }}
            />
            {/* SAVE BUTTON */}
            {editingForm.show && (
                <Stack sx={saveButtonContainer} direction="row">
                    <Button
                        onClick={() => {
                            setEditingForm({
                                specification: null,
                                show: false,
                                mode: null
                            });
                        }}
                        variant="outlined"
                        startIcon={<CloseIcon />}
                        color="error"
                        sx={{ mr: 2 }}
                    >
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
            <Box sx={{ width: dynamicWidth, height: '100vh', position: 'relative', overflowY: 'scroll' }}>
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
    titleType: SpecificationValuesType;
    // titleType: 'PRODUCT' | 'SKU';
    onEditClick: (spec: SpecificationsType) => void;
};

const RenderSpecifications = ({ specifications, titleType, onEditClick }: RenderSpecificationsProps) => (
    <>
        <Typography sx={{ ml: 3 }} variant="subtitle1">
            <FormattedMessage id={titleType} />
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

const dynamicWidth = {
    xs: 1,
    md: 0.9,
    lg: 480
};

const saveButtonContainer = {
    width: dynamicWidth,
    position: 'fixed',
    bottom: 0,
    right: 0,
    p: 1,
    borderTop: 1,
    borderTopColor: 'rgba(100,100,100,0.3)',
    justifyContent: 'flex-end',
    background: 'white',
    zIndex: 5
};
