export type CatalogStateProps = {
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
    filterCategories: FilterCategoryType[];
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
    Id?: number;
    idBrand?: number;
    name: string;
    Name?: string;
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
    children: CategoryType[] | [];
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

export type FilterCategoryType = {
    id: number;
    name: string;
    fatherName?: string;
    grandFatherName?: string;
    title?: string;
    hasChildren?: boolean;
};

export type SpecificationGroupType = {
    groupId: number;
    name: string;
    prodSpecs: SpecificationsType[];
    skuSpecs: SpecificationsType[];
};

export enum SpecificationValuesType {
    'PRODUCT' = 'product',
    'SKU' = 'sku'
}

export type SpecificationsType = {
    specificationId: number;
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
    vtexFieldId: number;
    specificationValues: SpecificationValueDataType[];
};

export type SpecificationValueDataType = {
    isActive: boolean;
    isVtexSync: boolean;
    name: string;
    position: number;
    specificationValueId: number;
    vtexValueId: number;
};