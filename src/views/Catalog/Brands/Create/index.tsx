import React from 'react';

// mui imports

// third imports
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// import ProfileForm from '../ProfileForm';

import { useDispatch } from 'react-redux';
import BrandForm from '../BrandForm';

// services

// types
import { NewBrandType2 } from 'types/catalog';
import { createBrandMultiCatalog } from 'store/slices/catalog';

const CreateBrandPage = () => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSave = async (data: NewBrandType2) => {
        // const dataBrand: NewBrandType2 = {
        //     ...data,
        //     brandData: {
        //         imageUrl: '',
        //         ...data.brandData
        //     }
        // };
        await dispatch(createBrandMultiCatalog(data));

        navigate('/brands');
    };

    return (
        <MainCard
            title={intl.formatMessage({
                id: 'create_brand'
            })}
        >
            <BrandForm handleSave={handleSave} />
        </MainCard>
    );
};

export default CreateBrandPage;
