// third party imports
import { useIntl } from 'react-intl';

// project imports
import Specification from '../../ui-component/Specification';
import Aditionalinfo from './AditionalInfo';
import Accordion from 'ui-component/extended/Accordion';
import AdditionalFields from './AdditionalFields';
import { InputType, SelectOptionType } from 'ui-component/MultiMerchant/MerchantsForm/InputComponent';

// ==============================|| PRODUCT DETAILS - DESCRIPTION ||============================== //

const ProductDescription = ({
    product,
    active,
    productInfo,
    setProductInfo,
    handleDrawer
}: {
    product: any;
    active: boolean;
    productInfo: any;
    setProductInfo: any;
    handleDrawer: (options: {
        accessor: string;
        intlLabel: string;
        data?: { [key: string]: any }[];
        options?: null | SelectOptionType[];
        type: InputType;
    }) => void;
}) => {
    // hooks
    const intl = useIntl();

    // accordion data
    const descriptionData = [
        {
            id: 'basic1',
            defaultExpand: true,
            title: 'Product Aditional Info',
            content: (
                <Aditionalinfo
                    handleDrawer={handleDrawer}
                    product={product}
                    productInfo={productInfo}
                    setProductInfo={setProductInfo}
                    active={active}
                />
            )
        },
        {
            id: 'basic2',
            title: 'Specifications',
            content: <Specification productInfo={productInfo} setProductInfo={setProductInfo} active={active} merchantMulti={null} />
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
