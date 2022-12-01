export type CatalogueStateProps = {
    error: object | string | null;
    loading: boolean;
    updating: boolean;
    brands: BrandType[];
    suppliers: SupplierType[];
};

export type BrandType = {
    idBrand: number;
    name: string;
    isActive: boolean;
    imageUrl: string | null;
    title: string;
    metaTagDescription: string | null;
    idMerchant: number;
};

export type NewBrandType = {
    idBrand?: number;
    name: string;
    title: string;
    metaTagDescription: string;
    imageUrl: string;
    isActive?: boolean;
};

export type SupplierType = {
    idProvider: number;
    countryId: string;
    name: string;
};
