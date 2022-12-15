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
    stockKeepingUnitSelectionMode: '' | 'COMBO' | 'LIST' | 'RADIO' | 'SPECIFICATION';
};

export type FlatCategoryType = {
    id: number;
    name: string;
    title: string;
    description: string;
    hasChildren: boolean;
    level: number;
};

export type SpecificationGroupType = {
    groupId: number;
    name: string;
    prodSpecs: SpecificationsType[];
    skuSpecs: SpecificationsType[];
};

export type SpecificationsType = {
    categoryId: number;
    description: string;
    fieldTypeId: number;
    fieldTypeName: string;
    groupId: number;
    groupName: string;
    isActive: boolean;
    isFilter: boolean;
    isOnProductDetails: boolean;
    isRequired: boolean;
    isSideMenuLinkActive: boolean;
    isStockKeepingUnit: boolean;
    isTopMenuLinkActive: boolean;
    isVtexSync: boolean;
    name: string;
    position: number;
    rawSpecId: number;
    specificationId: number;
    vtexFieldId: number;
    specificationValues: {
        isActive: boolean;
        isVtexSync: boolean;
        name: string;
        position: number;
        specificationValueId: number;
        vtexValueId: number;
    }[];
};
