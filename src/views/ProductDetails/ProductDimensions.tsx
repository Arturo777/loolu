/* eslint-disable @typescript-eslint/dot-notation */
import item from '../../assets/images/item.png';
import packageitem from '../../assets/images/package.png';
import './style.css';

const ProductDimensions = ({ valueSku, product }: { valueSku: any; product: any }) => {
    console.log(valueSku);
    const resultDim = product.skusimg.filter((itemSku: any) => itemSku?.sku?.skuID === valueSku);
    return (
        <div className="item-package">
            <div className="content-pack">
                <div className="content-pack">
                    <p className="dim dim-height">{resultDim[0]?.sku?.height}</p>
                    <img src={item} alt="item" className="img-itemPack" />
                    <p className="dim dim-length">{resultDim[0]?.sku['length']}</p>
                    <p className="dim dim-width">{resultDim[0]?.sku?.width}</p>
                </div>
            </div>
            <div className="content-pack">
                <p className="dim dim-height">{resultDim[0]?.sku?.packagedHeight}</p>
                <img src={packageitem} alt="package" className="img-itemPack" />
                <p className="dim dim-length">{resultDim[0]?.sku?.packagedLength}</p>
                <p className="dim dim-width">{resultDim[0]?.sku?.packagedWidth}</p>
            </div>
        </div>
    );
};

export default ProductDimensions;
