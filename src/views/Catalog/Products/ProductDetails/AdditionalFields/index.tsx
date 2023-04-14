import React, { useEffect, useState } from 'react';

// mui imports
import { Grid } from '@mui/material';

// third-party imports
// import { useIntl } from 'react-intl';

// project imports
import { useDispatch } from 'store';
import { gridSpacing } from 'store/constant';
import { useParams } from 'react-router-dom';

// component
import ListFieldComponent from './ListField';
import EditFieldComponent from './EditField';
import NewFieldComponent from './AddField';

// types
import { AdditionalFieldType } from 'types/catalog';
import { deleteAdditionalField, getAdditionalFields } from 'store/slices/catalog';

export default function AdditionalFields() {
    // hooks
    const dispatch = useDispatch();
    const { id } = useParams();

    // const
    const [fieldsList, setFieldsList] = useState<AdditionalFieldType[] | null>(null);
    const [sideMode, setSideMode] = useState<'EDIT' | 'ADD' | null>('ADD');
    const [fieldToEdit, setFieldToEdit] = useState<AdditionalFieldType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getAdditionalFieldsList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openEdit = (additionalField: AdditionalFieldType) => {
        setFieldToEdit(null);

        setTimeout(() => {
            setFieldToEdit(additionalField);
            setSideMode('EDIT');
        }, 200);
    };

    const cancelEdit = () => {
        setFieldToEdit(null);
        setSideMode(null);

        setTimeout(() => {
            setSideMode('ADD');
        }, 200);
    };

    const handleSuccess = () => {
        getAdditionalFieldsList();
    };

    const deleteElement = (fieldId: number) => {
        setIsLoading(true);
        const newFields = (fieldsList ?? []).filter((item) => item.id !== fieldId);

        dispatch(deleteAdditionalField(fieldId))
            .then(() => {
                setFieldsList(newFields);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const getAdditionalFieldsList = () => {
        setIsLoading(true);
        if (id) {
            dispatch(getAdditionalFields({ idMerchant: 1, productId: id }))
                .then(({ payload }) => {
                    if (payload) {
                        const { response } = payload;
                        if (response) {
                            setFieldsList(response.additionalFields ?? []);
                        }
                    } else {
                        // TODO: ADD ERROR
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
            // TODO: ADD ERROR
        }
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={5} lg={6} order={(fieldsList?.length ?? 0) > 0 ? 1 : 2}>
                <ListFieldComponent deleteElement={deleteElement} openEdit={openEdit} isLoading={isLoading} fieldsList={fieldsList} />
            </Grid>
            <Grid item xs={7} lg={6} xl={6} order={(fieldsList?.length ?? 0) > 0 ? 2 : 1}>
                <EditFieldComponent
                    productId={Number(id) ?? 0}
                    handleSuccess={handleSuccess}
                    show={sideMode === 'EDIT'}
                    fieldToEdit={fieldToEdit}
                    onCancel={cancelEdit}
                />
                <NewFieldComponent productId={Number(id) ?? 0} handleSuccess={handleSuccess} show={sideMode === 'ADD'} />
            </Grid>
        </Grid>
    );
}

// { sx }: { sx?: SxProps<Theme> | undefined }
