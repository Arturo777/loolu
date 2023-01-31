import { SpecificationGroupMode, SpecificationValueDataType } from 'types/catalog';

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
