import { SpecificationGroupMode, SpecificationsType, SpecificationValueDataType } from 'types/catalog';

// export type NewSpecificationType = Omit<SpecificationsType, 'vtexFieldId' | 'specificationId' | 'groupId' | 'groupName'> & {
//     groupId: number | null;
//     groupName: string | null | undefined;
// };

export type NewSpecificationType = {
    name: string;
    categoryId: number;
    description: string;
    fieldTypeId: string;
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
    specificationValues: SpecificationValueDataType[];
};

type FieldTypeType = {
    value: string;
    label: string;
    hide: SpecificationGroupMode[];
};

export const specificationFieldTypes: FieldTypeType[] = [
    {
        value: '1',
        label: 'Texto',
        hide: [SpecificationGroupMode.SKU]
    },
    {
        value: '7',
        label: 'Checkbox',
        hide: [SpecificationGroupMode.SKU]
    },
    {
        value: '5',
        label: 'Combo',
        hide: []
    },
    {
        value: '6',
        label: 'Radio',
        hide: []
    }
];

export type NewSpecificationValueType = {
    name: string;
    isActive: boolean;
};

export type SpecificationAttributesType = {
    isActive: boolean;
    isFilter: boolean;
    isOnProductDetails: boolean;
    isRequired: boolean;
    isSideMenuLinkActive: boolean;
    isStockKeepingUnit: boolean;
    isTopMenuLinkActive: boolean;
    description: string;
    fieldTypeId: string;
    fieldTypeName: string;
};

export const newValueListToCurrentList = (newList: NewSpecificationValueType[]): any[] => newList.map((item) => ({ ...item, id: 0 }));

export const defaultAttributes: SpecificationAttributesType = {
    description: '',
    fieldTypeId: '',
    fieldTypeName: '',
    isActive: false,
    isFilter: false,
    isOnProductDetails: false,
    isRequired: false,
    isSideMenuLinkActive: false,
    isStockKeepingUnit: false,
    isTopMenuLinkActive: false
};

export const getSpecificationAttributes = (specification: SpecificationsType): SpecificationAttributesType => {
    const data: SpecificationAttributesType = {
        isActive: specification.isActive,
        isFilter: specification.isFilter,
        isOnProductDetails: specification.isOnProductDetails,
        isRequired: specification.isRequired,
        isSideMenuLinkActive: specification.isSideMenuLinkActive,
        isStockKeepingUnit: specification.isStockKeepingUnit,
        isTopMenuLinkActive: specification.isTopMenuLinkActive,
        description: specification.description,
        fieldTypeId: `${specification.fieldTypeId}`,
        fieldTypeName: specification.fieldTypeName
    };

    return data;
};
