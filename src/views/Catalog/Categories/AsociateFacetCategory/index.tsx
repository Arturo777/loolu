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
import AddIcon from '@mui/icons-material/Add';

// third-party imports
import { FormattedMessage, useIntl } from 'react-intl';

// project imports
import { getFacetVariant } from 'store/slices/catalog';
import { useDispatch } from 'store';

// type
import { CategoryType, FacetType, SpecificationGroupType, SpecificationsType, SpecificationGroupMode } from 'types/catalog';
import AssociateFormComponent from './AssociateFormComponent';
import { MerchantType } from 'types/security';

type AsociateFacetCategoryComponentProps = {
    open: boolean;
    toggleDrawer: () => void;
    category: CategoryType | null;
    selectedMerchant: MerchantType | undefined;
};

export default function AsociateFacetCategoryComponent({
    open,
    toggleDrawer,
    category,
    selectedMerchant
}: AsociateFacetCategoryComponentProps) {
    // hooks
    const dispatch = useDispatch();
    const intl = useIntl();

    // vars
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [specificationGroups, setSpecificationsGroups] = useState<SpecificationGroupType[]>();
    // collapse group
    const [openGroup, setOpenGroup] = useState<number | null>(null);
    // edit

    const [editingForm, setEditingForm] = useState<{
        show: boolean;
        specification: SpecificationsType | null;
        facet?: FacetType | null;
        mode: 'EDIT' | 'ADD';
        specificationGroupMode?: SpecificationGroupMode;
    }>({ show: false, specification: null, facet: null, mode: 'EDIT', specificationGroupMode: SpecificationGroupMode.PRODUCT });

    const handleCloseForm = () => {
        if (!specificationGroups?.length) {
            toggleDrawer();
        } else {
            setEditingForm({
                specification: null,
                show: false,
                facet: null,
                mode: 'EDIT'
            });
        }
    };

    useEffect(() => {
        // reset
        if (!open) {
            setOpenGroup(null);
            handleCloseForm();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const getCategory = () => {
        if (!selectedMerchant) return;
        if (category) {
            setIsLoading(true);
            dispatch(getFacetVariant({ idMerchant: selectedMerchant.merchantId, catId: category.id }))
                .then(({ payload }) => {
                    const dataElement = payload.response[0];
                    const newSpecs: SpecificationGroupType[] = dataElement?.specificationGroups ?? [];
                    setSpecificationsGroups(newSpecs);
                    if (!newSpecs.length) {
                        setEditingForm({
                            specification: null,
                            facet: null,
                            show: true,
                            mode: 'ADD'
                        });
                    }
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

    const handleEditSpec = (spec: SpecificationsType | null, type: SpecificationGroupMode) => {
        setEditingForm({
            specification: spec,
            show: spec !== null,
            mode: 'EDIT',
            specificationGroupMode: type
        });
    };

    const handeAdd = () => {
        if (specificationGroups) {
            setEditingForm({
                specification: null,
                facet: null,
                show: true,
                mode: 'ADD'
            });
        }
    };

    const handleSuccesFetch = () => {
        getCategory();
        handleCloseForm();
    };

    const content = () => (
        <>
            {/* SPECS */}
            <Collapse in={!editingForm.show} collapsedSize={0} sx={{ p: 0 }}>
                <Box>
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handeAdd} variant="text" startIcon={<AddIcon />}>
                            Asociar nuevo facet
                        </Button>
                    </Box>
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
                                            titleType={SpecificationGroupMode.PRODUCT}
                                        />
                                    )}
                                    {specificationGroup.skuSpecs.length > 0 && (
                                        <RenderSpecifications
                                            onEditClick={handleEditSpec}
                                            specifications={specificationGroup.skuSpecs}
                                            titleType={SpecificationGroupMode.SKU}
                                        />
                                    )}
                                </Collapse>
                            </React.Fragment>
                        ))}
                </Box>
            </Collapse>
            {/* FORM */}
            <AssociateFormComponent
                selectedMerchant={selectedMerchant}
                show={editingForm.show}
                handleCancel={handleCloseForm}
                handleSuccesFetch={handleSuccesFetch}
                mode={editingForm.mode}
                specificationGroups={specificationGroups}
                category={category!}
                specificationData={editingForm?.specification ?? undefined}
                specificationGroupMode={editingForm.specificationGroupMode ?? SpecificationGroupMode.PRODUCT}
                canCancel={(specificationGroups?.length ?? 0) > 0}
            />
        </>
    );

    if (!category) return null;

    return (
        <Drawer anchor="right" open={open} onClose={toggleDrawer}>
            <Box
                sx={{
                    minWidth: {
                        xs: '100%',
                        sm: 350,
                        md: 400
                    },
                    maxWidth: 550,
                    height: '100vh',
                    overflowY: 'scroll',
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gridTemplateRows: '1fr 100%'
                }}
            >
                <Stack sx={{ padding: 2, gridArea: '1 / 1 / 2 / 2' }}>
                    <Typography mb={1} variant="h4">
                        {`${intl.formatMessage({
                            id: 'associate_facet_category'
                        })}: ${category.name}`}
                    </Typography>

                    <Divider />
                </Stack>

                {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 10 }}>
                        <CircularProgress />
                    </Box>
                )}
                <Box sx={{ gridArea: '2 / 1 / 3 / 2' }}>{!isLoading && specificationGroups && content()}</Box>
            </Box>
        </Drawer>
    );
}

type RenderSpecificationsProps = {
    specifications: SpecificationsType[];
    titleType: SpecificationGroupMode;
    // titleType: 'PRODUCT' | 'SKU';
    onEditClick: (spec: SpecificationsType, type: SpecificationGroupMode) => void;
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
