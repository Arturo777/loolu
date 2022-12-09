/* eslint-disable @typescript-eslint/dot-notation */
import item from '../../assets/images/item.png';
import packageitem from '../../assets/images/package.png';
import './style.css';

const ProductDimensions = ({ valueSku, product }: { valueSku: any; product: any }) => {
    const resultDim = product.skus.filter((itemSku: any) => itemSku?.skuID === valueSku);
    return (
        <div className="item-package">
            <div className="content-pack">
                <div className="content-pack">
                    <p className="dim dim-height">{resultDim[0]?.height}</p>
                    <img src={item} alt="item" className="img-itemPack" />
                    {resultDim.length ? <p className="dim dim-length">{resultDim[0]['length']}</p> : <></>}
                    <p className="dim dim-width">{resultDim[0]?.width}</p>
                </div>
            </div>
            <div className="content-pack">
                <p>Peso (kg): {resultDim[0]?.weightKg}</p>
                <p>Peso Paquete (Kg): {resultDim[0]?.packagedWeightKg}</p>
            </div>
            <div className="content-pack">
                <p className="dim dim-height">{resultDim[0]?.packagedHeight}</p>
                <img src={packageitem} alt="package" className="img-itemPack" />
                <p className="dim dim-length">{resultDim[0]?.packagedLength}</p>
                <p className="dim dim-width">{resultDim[0]?.packagedWidth}</p>
            </div>
        </div>
    );
};

export default ProductDimensions;
