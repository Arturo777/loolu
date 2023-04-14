import { ProductsFilter } from 'types/e-commerce';

// eslint-disable-next-line import/prefer-default-export
export const initialState: ProductsFilter = {
    search: '',
    sort: 'low',
    gender: [],
    categories: ['all'],
    colors: [],
    price: '',
    rating: 0
};
