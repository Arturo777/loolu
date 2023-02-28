// third party imports
import { useIntl } from 'react-intl';

// project imports
import Specification from './Specification';
import Aditionalinfo from './AditionalInfo';
import Accordion from 'ui-component/extended/Accordion';
import AdditionalFields from './AdditionalFields';

// ==============================|| PRODUCT DETAILS - DESCRIPTION ||============================== //

const ProductDescription = ({
    product,
    active,
    productInfo,
    setProductInfo
}: {
    product: any;
    active: boolean;
    productInfo: any;
    setProductInfo: any;
}) => {
    // hooks
    const intl = useIntl();

    // accordion data
    const descriptionData = [
        {
            id: 'basic1',
            defaultExpand: true,
            title: 'Product Aditional Info',
            content: <Aditionalinfo product={product} productInfo={productInfo} setProductInfo={setProductInfo} active={active} />
        },
        {
            id: 'basic2',
            title: 'Specifications',
            content: <Specification productInfo={productInfo} setProductInfo={setProductInfo} active={active} />
        },
        {
            id: 'basic3',
            title: intl.formatMessage({
                id: 'additional_fields'
            }),
            content: <AdditionalFields />
        }
    ];
    return <Accordion data={descriptionData} />;
};

export default ProductDescription;
