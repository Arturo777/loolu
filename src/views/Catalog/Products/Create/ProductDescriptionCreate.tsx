// third party imports
import { useIntl } from 'react-intl';

// project imports
import Specification from 'ui-component/Specification';
import AditionalInfoCreate from './AditionalinfoCreate';
import Accordion from 'ui-component/extended/Accordion';

// ==============================|| PRODUCT DETAILS - DESCRIPTION ||============================== //

const ProductDescriptionCreate = ({
    setProductInfo,
    productInfo,
    merchantMulti
}: {
    setProductInfo: any;
    productInfo: any;
    merchantMulti: any;
}) => {
    // hooks
    const intl = useIntl();

    // accordion data
    const descriptionData = [
        {
            id: 'basic1',
            defaultExpand: true,
            title: 'Descriptions & Keywords',
            content: <AditionalInfoCreate setProductInfo={setProductInfo} />
        },
        {
            id: 'basic2',
            title: 'Specifications',
            content: <Specification productInfo={productInfo} setProductInfo={setProductInfo} active={false} merchantMulti={1} />
        }
        /* {
            id: 'basic3',
            title: intl.formatMessage({
                id: 'additional_fields'
            }),
            content: <AdditionalFields />
        } */
    ];
    return <Accordion data={descriptionData} />;
};

export default ProductDescriptionCreate;
