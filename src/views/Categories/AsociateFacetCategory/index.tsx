import React, { useEffect, useState, useMemo } from 'react';

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
    Collapse
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';

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
        specType: SpecificationValuesType | null;
        facet?: FacetType | null;
    }>({ show: false, specification: null, specType: null, facet: null });

    const handleCloseForm = () => {
        setEditingForm({
            specification: null,
            show: false,
            specType: null,
            facet: null
        });
    };

    useEffect(() => {
        // reset
        if (!open) {
            setOpenGroup(null);
            handleCloseForm();
        }
    }, [open]);

    const getCategory = () => {
        if (category) {
            setIsLoading(true);
            dispatch(getFacetVariant({ idMerchant: 1, catId: category.id }))
                .then(({ payload }) => {
                    console.log(payload.response);
                    const newSpecs: SpecificationGroupType[] = payload.response[0].specificationGroups;
                    setSpecificationsGroups(newSpecs);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    useEffect(() => {
        getCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, dispatch]);

    const handleEditSpec = (spec: SpecificationsType | null, type: SpecificationValuesType) => {
        setEditingForm({
            specification: spec,
            show: spec !== null,
            specType: type
        });
    };

    const handeAdd = (facet: FacetType, specType: SpecificationValuesType) => {
        setEditingForm({
            specification: null,
            facet,
            show: true,
            specType
        });
    };

    const handleSuccesFetch = () => {
        getCategory();
        handleCloseForm();
    };

    const getSpecificationGroupId = useMemo(
        () => (specificationGroups ? specificationGroups[specificationGroups?.length - 1].groupId : 0),
        [specificationGroups]
    );

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
                                    <ListItemText primary={specificationGroup.name} secondary={specificationGroup.groupId} />
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
                handleSuccesFetch={handleSuccesFetch}
                groupId={getSpecificationGroupId}
                categoryId={category?.id ?? 1}
                specificationToEdit={editingForm.specification}
                show={editingForm.show}
                mode={editingForm.specification !== null && editingForm.show ? 'EDIT' : 'ADD'}
                facet={editingForm.facet}
                specType={editingForm.specType ?? SpecificationValuesType.PRODUCT}
                handleCancel={handleCloseForm}
            />
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
    onEditClick: (spec: SpecificationsType, type: SpecificationValuesType) => void;
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
                    <EditIcon onClick={() => onEditClick(spec, titleType)} />
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
