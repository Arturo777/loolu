type CreateCategoryMerchantPayload = {
    merchantId: number;
    fatherMerchant: boolean;
    categoryData: {
        fatherCategoryId: number | string;
        masterCategoryId: number;
        isActive: boolean;
        name: string;
        title: string;
    };
};

export type CreateMerchantCategoryProps = {
    idMerchant: number;
    data: CreateCategoryMerchantPayload[];
};

type CreateCategoryPropsData = {
    merchantId: number;
    name: string;
    fatherCategoryId: number;
    fatherMerchant: boolean;
    categoryData: {
        fatherCategoryId: number | null;
        masterCategoryId: number;
        isActive: boolean;
        name: string;
        title: string;
    };
};

export type createCategoryProps = {
    idMerchant: number;
    data: CreateCategoryPropsData[];
};

export type CreateCategoryPageProps = {
    handleClose: (e?: any) => void;
    selectedCatId?: number | string;
    show: boolean;
    selectedMerchant: SelectedMerchant | null;
};

export type EditCategoryProps = {
    selectedCategory?: number | string;
    show: boolean;
    onCancel: () => void;
    openAssociate: (cat: CategoryType | undefined) => void;
    selectedMerchant: SelectedMerchant | null;
};

export type CategoriesListProps = {
    filterText: string;
    openCreate: (catId: number | string) => void;
    handleShowInfo: (cat?: number | string) => void;
    openAssociate: (cat: CategoryType | undefined) => void;
    selectedMerchant: SelectedMerchant | null;
};

export type SelectedMerchant = {
    isFather: boolean;
    isSelected: boolean;
    merchantId: number;
    name: string;
    status: boolean;
};

export type MerchantCategoryType = {
    categoryList: CategoryType[];
    isFatherMerchat: boolean;
    idMerchant: number;
};
export type FlatMerchantCategoryType = {
    categoryList: FlatCategoryType[];
    isFatherMerchat: boolean;
    idMerchant: number;
};

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
    merchantCategories?: MerchantCategoryType[];
    flatMerchantCategories: FlatCategoryType[];
    filterMerchantCategories: FilterMerchantCategoryType[];
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
    id: number | string;
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
    masterCategoryId?: number;
};

export type FilterMerchantCategoryType = FilterCategoryType;
export type FlatCategoryType = {
    id: number | string;
    name: string;
    title: string;
    description: string;
    hasChildren: boolean;
    level: number;
};

export type FilterCategoryType = {
    id: number | string;
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

export enum SpecificationGroupMode {
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

export type AdditionalFieldType = {
    field: string;
    value: string;
    id: number;
};
