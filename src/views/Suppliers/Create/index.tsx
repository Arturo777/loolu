import React from 'react';

// mui imports

// third imports
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// import ProfileForm from '../ProfileForm';

import { useDispatch } from 'react-redux';

// services

// types
import { SupplierType } from 'types/catalogue';
import { createSupplier } from 'store/slices/catalogue';
import SupplierForm from '../SupplierForm';

const CreateSupplierPage = () => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSave = async (data: SupplierType) => {
        const supplierData = {
            country: data.countryId,
            name: data.name
        };
        await dispatch(createSupplier({ data: supplierData }));

        navigate('/suppliers');
    };

    return (
        <MainCard
            title={intl.formatMessage({
                id: 'create_supplier'
            })}
        >
            <SupplierForm handleSave={handleSave} />
        </MainCard>
    );
};

export default CreateSupplierPage;
