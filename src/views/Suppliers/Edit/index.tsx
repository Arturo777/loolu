import React, { useEffect, useState } from 'react';

// mui imports

// third imports
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useSelector } from 'store';
import SupplierForm from '../SupplierForm';

import { useDispatch } from 'react-redux';

// services

// types
import { SupplierType } from 'types/catalogue';
import { editSupplier, getSuppliers } from 'store/slices/catalogue';

const EditSupplierPage = () => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { supplierId } = useParams();
    const [supplier, setSupplier] = useState<SupplierType>();
    const { suppliers } = useSelector((state) => state.catalogue);

    useEffect(() => {
        dispatch(getSuppliers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (suppliers && suppliers.length) {
            const supplierInfo = suppliers.find((item) => item.idProvider === Number(supplierId));
            if (!supplierInfo) {
                navigate('/suppliers');
            }
            setSupplier(supplierInfo);
        }
    }, [navigate, supplierId, suppliers]);

    const handleSave = async (data: SupplierType) => {
        if (supplierId) {
            const supplierData = {
                country: data.countryId,
                name: data.name,
                idProvider: Number(supplierId) ?? 1
            };
            await dispatch(editSupplier({ data: supplierData }));
        }

        navigate('/suppliers');
    };
    return (
        <MainCard
            title={intl.formatMessage({
                id: 'edit_supplier'
            })}
        >
            <SupplierForm initialData={supplier} handleSave={handleSave} />
        </MainCard>
    );
};

export default EditSupplierPage;
