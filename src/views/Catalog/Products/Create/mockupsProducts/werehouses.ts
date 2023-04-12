const werehousesMulti = [
    {
        idMerchant: 1,
        warehouses: [
            {
                isActive: true,
                warehouse: '1_1',
                stockInVTEX: null,
                itSent: null
            },
            {
                isActive: true,
                warehouse: '1_2',
                stockInVTEX: null,
                itSent: null
            }
        ],
        father: true
    },
    {
        idMerchant: 2,
        warehouses: [
            {
                isActive: true,
                warehouse: '2_1',
                stockInVTEX: null,
                itSent: null
            },
            {
                isActive: true,
                warehouse: '2_2',
                stockInVTEX: null,
                itSent: null
            }
        ],
        father: false
    }
];

export default { werehousesMulti };
