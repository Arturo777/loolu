export type CatalogueStateProps = {
    error: object | string | null;
    loading: boolean;
    updating: boolean;
    brands: BrandType[];
    suppliers: SupplierType[];
    facetsInfo: {
        facets: FacetType[];
        maxPage: number;
    };
    categories: CategoryType[];
    flatCategories: FlatCategoryType[];
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

export type FacetType = {
    id: number;
    name: string;
    nameSap: string;
};

export type CategoryType = {
    id: number;
    numberChildren: number;
    name: string;
    title: string;
    activeStoreFrontLink: boolean;
    children: CategoryType[];
    hasChildren: boolean;
    isActive: boolean;
    showBrandFilter: boolean;
    showInStoreFront: boolean;
    fatherCategoryId: number;
    score: number;
    description: string;
};

export type FlatCategoryType = {
    id: number;
    name: string;
    title: string;
    description: string;
    hasChildren: boolean;
    level: number;
};
