export type CatalogueStateProps = {
    error: object | string | null;
    loading: boolean;
    updating: boolean;
    brands: BrandType[];
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
