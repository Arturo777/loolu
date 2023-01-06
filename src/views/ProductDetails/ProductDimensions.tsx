/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/dot-notation */
import item from '../../assets/images/item.png';
import packageitem from '../../assets/images/package.png';
import { TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { catalogUnits } from 'utils/unitMeasurement';
import './style.css';
import { Key } from 'react';

const ProductDimensions = ({ skuFilter, setSkuInfo, active }: { skuFilter: any; setSkuInfo: any; active: boolean }) => {
    const handleChangeSku = (event: any) => {
        console.log('datavalue', event.target);
        // eslint-disable-next-line no-constant-condition

        setSkuInfo((prev: any) => ({
            ...prev,
            [event.target.name]: event.target.name === 'measurementUnit' ? event.target.value : parseInt(event.target.value, 10)
        }));
    };

    return (
        <>
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
                                    defaultValue={skuFilter?.height}
                                    onChange={handleChangeSku}
                                />
                                <TextField
                                    id="standard-number"
                                    label="length"
                                    type="number"
                                    name="length"
                                    defaultValue={skuFilter['length']}
                                    onChange={handleChangeSku}
                                />
                                <TextField
                                    id="standard-number"
                                    label="width"
                                    type="number"
                                    name="width"
                                    defaultValue={skuFilter?.width}
                                    onChange={handleChangeSku}
                                />
                            </>
                        ) : (
                            <>
                                <p className="dim dim-height">{skuFilter?.height}</p>
                                <img src={item} alt="item" className="img-itemPack" />
                                {skuFilter ? <p className="dim dim-length">{skuFilter['length']}</p> : <></>}
                                <p className="dim dim-width">{skuFilter?.width}</p>
                            </>
                        )}
                    </div>
                </div>
                <div className="content-pack">
                    {skuFilter &&
                        (active ? (
                            <>
                                <TextField
                                    id="standard-number"
                                    label="Weight"
                                    type="number"
                                    name="weightKg"
                                    defaultValue={skuFilter?.weightKg}
                                    onChange={handleChangeSku}
                                />
                                <TextField
                                    id="standard-number"
                                    label="Packaged Weight"
                                    type="number"
                                    name="packagedWeightKg"
                                    defaultValue={skuFilter?.packagedWeightKg}
                                    onChange={handleChangeSku}
                                />
                                <FormControl sx={{ minWidth: 120 }}>
                                    <InputLabel id="label-unit-measurement">Unidad de Medida</InputLabel>
                                    <Select
                                        labelId="label-unit-measurement"
                                        id="unit-measurement"
                                        name="measurementUnit"
                                        label="Unidad de Medida"
                                        defaultValue={skuFilter?.measurementUnit}
                                        onChange={handleChangeSku}
                                    >
                                        {catalogUnits.map(({ name, unit }: { name: string; unit: string | undefined }, index: Key) => (
                                            <MenuItem sx={{ p: 1.25 }} key={index} value={name}>
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </>
                        ) : (
                            <>
                                <p>Peso (kg): {skuFilter?.weightKg}</p>
                                <p>Peso Paquete (Kg): {skuFilter?.packagedWeightKg}</p>
                                <p>Unidad de Medida: {skuFilter?.measurementUnit}</p>
                            </>
                        ))}
                </div>
                <div className="content-pack">
                    {active ? (
                        <>
                            <TextField
                                id="standard-number"
                                label="Packaged Height"
                                type="number"
                                name="packagedHeight"
                                defaultValue={skuFilter?.packagedHeight}
                                onChange={handleChangeSku}
                            />
                            <TextField
                                id="standard-number"
                                label="Packaged Length"
                                type="number"
                                name="packagedLength"
                                defaultValue={skuFilter?.packagedLength}
                                onChange={handleChangeSku}
                            />
                            <TextField
                                id="standard-number"
                                label="Packaged Width"
                                type="number"
                                name="packagedWidth"
                                defaultValue={skuFilter?.packagedWidth}
                                onChange={handleChangeSku}
                            />
                        </>
                    ) : (
                        <>
                            <p className="dim dim-pheight">{skuFilter?.packagedHeight}</p>
                            <img src={packageitem} alt="package" className="img-itemPack" />
                            <p className="dim dim-plength">{skuFilter?.packagedLength}</p>
                            <p className="dim dim-pwidth">{skuFilter?.packagedWidth}</p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductDimensions;
