/* eslint-disable @typescript-eslint/dot-notation */
import item from '../../assets/images/item.png';
import packageitem from '../../assets/images/package.png';
import { TextField } from '@mui/material';
import './style.css';

const ProductDimensions = ({ valueSku, product, active }: { valueSku: string; product: any; active: boolean }) => {
    const resultDim = product.skus.filter((itemSku: any) => itemSku?.skuID === valueSku);
    return (
        <div className="item-package">
            <div className="content-pack">
                <div className="content-pack">
                    {active ? (
                        <>
                            <TextField
                                id="standard-number"
                                label="Height"
                                type="number"
                                name="height"
                                defaultValue={resultDim[0]?.height}
                            />
                            <TextField
                                id="standard-number"
                                label="length"
                                type="number"
                                name="length"
                                defaultValue={resultDim[0]['length']}
                            />
                            <TextField id="standard-number" label="width" type="number" name="width" defaultValue={resultDim[0]?.width} />
                        </>
                    ) : (
                        <>
                            <p className="dim dim-height">{resultDim[0]?.height}</p>
                            <img src={item} alt="item" className="img-itemPack" />
                            {resultDim.length ? <p className="dim dim-length">{resultDim[0]['length']}</p> : <></>}
                            <p className="dim dim-width">{resultDim[0]?.width}</p>
                        </>
                    )}
                </div>
            </div>
            <div className={active ? '' : 'content-pack'}>
                {active ? (
                    <TextField id="standard-number" label="Weight" type="number" name="weightKg" defaultValue={resultDim[0]?.weightKg} />
                ) : (
                    <p>Peso (kg): {resultDim[0]?.weightKg}</p>
                )}
                {active ? (
                    <TextField
                        id="standard-number"
                        label="Packaged Weight"
                        type="number"
                        name="packagedWeightKg"
                        defaultValue={resultDim[0]?.packagedWeightKg}
                    />
                ) : (
                    <p>Peso Paquete (Kg): {resultDim[0]?.packagedWeightKg}</p>
                )}
            </div>
            <div className="content-pack">
                {active ? (
                    <>
                        <TextField
                            id="standard-number"
                            label="Packaged Height"
                            type="number"
                            name="packagedHeight"
                            defaultValue={resultDim[0]?.packagedHeight}
                        />
                        <TextField
                            id="standard-number"
                            label="Packaged Length"
                            type="number"
                            name="packagedLength"
                            defaultValue={resultDim[0]?.packagedLength}
                        />
                        <TextField
                            id="standard-number"
                            label="Packaged Width"
                            type="number"
                            name="packagedWidth"
                            defaultValue={resultDim[0]?.packagedWidth}
                        />
                    </>
                ) : (
                    <>
                        <p className="dim dim-height">{resultDim[0]?.packagedHeight}</p>
                        <img src={packageitem} alt="package" className="img-itemPack" />
                        <p className="dim dim-length">{resultDim[0]?.packagedLength}</p>
                        <p className="dim dim-width">{resultDim[0]?.packagedWidth}</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductDimensions;
