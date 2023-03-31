import React, { useEffect, useState } from 'react';

// mui imports
import { FormControlLabel, FormGroup, Switch } from '@mui/material';

// third imports
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// import ProfileForm from '../ProfileForm';

import { useSelector } from 'store';
import { useDispatch } from 'react-redux';
import Loader from 'ui-component/Loader';
import BrandForm from '../BrandForm';

// services
import { editBrand, getBrands } from 'store/slices/catalog';

// types
import { BrandType, NewBrandType } from 'types/catalog';

const EditBrandPage = () => {
    const intl = useIntl();
    const [brandStatus, setBrandStatus] = useState<boolean>(false);
    const { brandId } = useParams();
    const urlParams = new URLSearchParams(window.location.search);
    const idMerchant = urlParams.get('idMerchant');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [brandData, setBrandData] = useState<BrandType>();
    const { brands } = useSelector((state) => state.catalogue);
    useEffect(() => {
        dispatch(getBrands(Number(idMerchant)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (brands && brands.length && idMerchant) {
            console.log('brandId', brandId);
            console.log('idMerchant', idMerchant);
            const brandInfo = brands.find((item) => item.idBrand === Number(brandId));
            if (!brandInfo) {
                navigate('/brands');
            }
            setBrandData(brandInfo);
            setBrandStatus(brandInfo?.isActive ?? false);
        }
    }, [navigate, brandId, brands]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBrandStatus(event.target.checked);
    };

    const handleSave = async (data: any) => {
        const newData: BrandType = {
            idBrand: Number(brandId ?? ''),
            idMerchant: data.idMerchant || idMerchant,
            ...data[0].brandData,
            isActive: brandStatus
        };

        await dispatch(editBrand({ dataBrand: newData }));
        navigate('/brands');
    };

    if (!brandData) return <Loader />;

    return (
        <MainCard
            title={intl.formatMessage({
                id: 'edit_brand'
            })}
            secondary={
                <FormGroup>
                    <FormControlLabel
                        checked={brandStatus}
                        control={<Switch onChange={handleChange} />}
                        labelPlacement="start"
                        label={
                            <b>
                                <FormattedMessage id={brandStatus ? 'active' : 'inactive'} />
                            </b>
                        }
                    />
                </FormGroup>
            }
        >
            <BrandForm initialData={brandData} handleSave={handleSave} />
        </MainCard>
    );
};

export default EditBrandPage;
