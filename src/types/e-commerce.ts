// product shop list
export type Products = {
    map(arg0: (item: any, index: any) => JSX.Element): import("react").ReactNode;
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
    map(arg0: (item: any, index: any) => JSX.Element): import("react").ReactNode;
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
    reviews: Reviews[];
    addresses: Address[];
    error: object | string | null;
    loadingProducts?: boolean;
}
