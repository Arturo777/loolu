// product shop list
export type Products = {
    tradePolicies: Trade[];
    inventoried: boolean | undefined;
    isEcommerce: boolean;
    categoryName: string;
    linkId: string;
    title: string;
    productRefID: string;
    isVisible: any;
    map(arg0: (item: any, index: any) => JSX.Element): import('react').ReactNode;
    isActive: boolean;
    productName: any;
    id: string | number | undefined;
    image: string;
    name: string;
    description?: string;
    rating?: number;
    discount?: number;
    salePrice?: number;
    offerPrice?: number;
    gender?: string;
    categories?: string[];
    colors?: string[];
    popularity?: number;
    date?: number;
    created: Date;
    isStock?: boolean;
    new?: number;
    brandName?: string;
    brandId: number;
    productID: string | number;
    skus: any;
};

export type Skus = {
    map(arg0: (item: any, index: any) => JSX.Element): import('react').ReactNode;
    ean: string | number | undefined;
    name: string;
    skuID: string | number | undefined;
    image: string;
    measurementUnit?: string;
    height?: number;
    length?: number;
    packagedHeight?: number;
    packagedLength?: number;
    packagedWeightKg?: number;
    packagedWidth?: number;
    prices?: any;
    categories?: string[];
    colors?: string[];
    popularity?: number;
    date?: number;
    created: Date;
    isStock?: boolean;
    new?: number;
    brandName?: string;
    brandId: number;
    productID: string | number;
};
export type Categories = {
    id: string | number;
    isActive: boolean;
    description: string;
    title: string;
    fatherCategoryId: number;
    score: string;
    name: string;
    children: Categories[];
};
export type TradePolicies = {
    TradePolicies: Policy;
};
export type Trade = {
    idPolicy: number;
    isSelected: boolean;
    tradePolicyName: string;
};
export type Policy = {
    filter(arg0: (tra: any) => boolean): unknown;
    isActive: boolean;
    idMerchant: number;
    idPolicy: number;
    name: string;
};
// checkout-cart billing address
export type Address = {
    id?: string | number | undefined;
    name: string;
    destination: string;
    building: string;
    street: string;
    city: string;
    state: string;
    country: string;
    post: string | number;
    phone: string | number;
    isDefault: boolean;
};

// product reviews list
export type Reviews = {
    id: string | number | undefined;
    rating: number;
    review: string;
    date: Date | string;
    profile: {
        avatar: string;
        name: string;
        status: boolean;
    };
};

// product shop filter
export type ProductsFilter = {
    length?: number;
    search: string;
    sort: string;
    gender: string[];
    categories: string[];
    colors: string[];
    price: string;
    rating: number;
};

// product shop filter - sort options
export type SortOptionsProps = {
    value: string;
    label: string;
};

// product shop filter - colors options
export type ColorsOptionsProps = {
    label: string;
    value: string;
    bg: string;
};

export type PaymentOptionsProps = {
    id: number;
    value: string;
    title: string;
    caption: string;
    image: string;
    size: {
        width: number;
        height: number;
    };
};

export interface ProductStateProps {
    products: Products[];
    product: Products | null;
    relatedProducts: Products[];
    skus: Skus[];
    categories: Categories[];
    tradePolicies: TradePolicies[];
    reviews: Reviews[];
    addresses: Address[];
    error: object | string | null;
    loadingProducts?: boolean;
}
