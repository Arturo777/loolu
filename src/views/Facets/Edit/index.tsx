import React, { useEffect, useState } from 'react';

// mui imports

// third imports
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// import ProfileForm from '../ProfileForm';

import { useDispatch, useSelector } from 'store';

// services

// types
import { FacetType, SupplierType } from 'types/catalogue';
import { getFacetsService } from 'store/slices/catalogue';
import FacetFormComponent from '../FacetForm';

const EditFacetPage = () => {
    const intl = useIntl();
    const { facetId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [facetData, setFacetData] = useState<FacetType>();

    const {
        facetsInfo: { facets }
    } = useSelector((state) => state.catalogue);

    useEffect(() => {
        dispatch(getFacetsService({ idMerchant: 1, page: 0, term: facetId ?? '' }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [facetId]);

    useEffect(() => {
        if (facets && facets.length) {
            const newData = facets.find((item) => item.id === Number(facetId));
            if (!newData) {
                navigate('/facets');
            }
            setFacetData(newData!);
        }
    }, [navigate, facetId, facets]);

    const handleSave = async (data: SupplierType) => {
        console.log('DAT');
    };

    return (
        <MainCard
            title={intl.formatMessage({
                id: 'edit_supplier'
            })}
        >
            {facetData && <FacetFormComponent handleSave={handleSave} />}
        </MainCard>
    );
};

export default EditFacetPage;
