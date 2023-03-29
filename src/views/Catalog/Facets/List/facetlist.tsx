const facets: object[] = [
    {
        merchantId: 1,
        facets: [
            {
                id: 6915,
                name: 'Modelo'
            },
            {
                id: 7223,
                name: 'Almacenamiento'
            }
        ],
        fatherMerchant: true
    },
    {
        merchantId: 2,
        facets: [
            {
                id: 6915,
                name: 'Capacidad'
            },
            {
                id: 7223,
                name: 'Material'
            }
        ],
        fatherMerchant: false
    },
    {
        merchantId: 3,
        facets: [
            {
                id: 4353,
                name: 'Capacidad'
            },
            {
                id: 8989,
                name: 'Material'
            }
        ],
        fatherMerchant: false
    }
];

// eslint-disable-next-line import/no-anonymous-default-export
export default { facets };
