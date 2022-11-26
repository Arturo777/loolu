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
import { NewBrandType } from 'types/catalogue';
import { createBrand } from 'store/slices/catalogue';

const EditSupplierPage = () => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSave = async (data: NewBrandType) => {
        const dataBrand: NewBrandType = {
            ...data,
            isActive: true
        };
        await dispatch(createBrand({ dataBrand }));

        navigate('/suppliers');
    };

    return (
        <MainCard
            title={intl.formatMessage({
                id: 'edit_supplier'
            })}
        >
            <p>FORM EDIT</p>
        </MainCard>
    );
};

export default EditSupplierPage;
