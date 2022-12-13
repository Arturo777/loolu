// project imports
import Specification from './Specification';
import Aditionalinfo from './AditionalInfo';
import Accordion from 'ui-component/extended/Accordion';
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
            content: <Specification />
        },
        {
            id: 'basic3',
            title: 'Add on data',
            content:
                'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary'
        }
    ];
    return <Accordion data={descriptionData} />;
};

export default ProductDescription;
