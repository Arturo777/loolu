type Catalog = {
    unit: string;
    name: string;
};
export const catalogUnits = [
    {
        unit: '1',
        name: 'un'
    },
    {
        unit: '2',
        name: 'kg'
    },
    {
        unit: '3',
        name: 'g'
    }
];
export default function filterUnitM(unit: string | undefined) {
    console.log('unit', unit);
    const resultUnit = catalogUnits.filter((cat: Catalog) => cat.unit === unit);
    console.log('catalog', resultUnit[0]);
    return resultUnit[0].name;
}
