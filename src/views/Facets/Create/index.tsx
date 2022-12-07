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
import { FacetType } from 'types/catalogue';
import { createFacetService, createSupplier } from 'store/slices/catalogue';
import FacetFormComponent from '../FacetForm';

const CreateFacetPage = () => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSave = async (data: FacetType) => {
        await dispatch(
            createFacetService({
                idMerchant: 1,
                data: {
                    name: data.name,
                    nameSap: data.nameSap
                }
            })
        );

        navigate('/suppliers');
    };

    return (
        <MainCard
            title={intl.formatMessage({
                id: 'create_supplier'
            })}
        >
            <FacetFormComponent handleSave={handleSave} />
        </MainCard>
    );
};

export default CreateFacetPage;
