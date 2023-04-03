import React from 'react';
import { CategoryType, SpecificationGroupMode, SpecificationGroupType, SpecificationsType } from 'types/catalog';
import { MerchantType } from 'types/security';

// mui imports

// third-party imports

// project impors
import AddFormComponent from './AddForm';
import EditFormComponent from './EditForm';

type AssociateFormComponentProps = {
    handleCancel: () => void;
    mode: 'EDIT' | 'ADD';
    handleSuccesFetch: () => void;
    show: boolean;
    specificationGroups: SpecificationGroupType[] | undefined;
    category: CategoryType;
    specificationData?: SpecificationsType;
    specificationGroupMode: SpecificationGroupMode;
    canCancel: boolean;
    selectedMerchant: MerchantType | undefined;
};

export default function AssociateFormComponent({
    handleCancel,
    mode,
    handleSuccesFetch,
    show,
    specificationGroups,
    category,
    specificationData,
    specificationGroupMode,
    canCancel,
    selectedMerchant
}: AssociateFormComponentProps) {
    if (!show) {
        return null;
    }

    if (mode === 'EDIT') {
        return (
            <EditFormComponent
                selectedMerchant={selectedMerchant}
                category={category}
                handleCancel={handleCancel}
                specificationData={specificationData!}
                specificationGroupMode={specificationGroupMode}
                handleSuccesFetch={handleSuccesFetch}
            />
        );
    }

    return (
        <AddFormComponent
            selectedMerchant={selectedMerchant}
            category={category}
            specificationGroups={specificationGroups ?? []}
            handleCancel={handleCancel}
            handleSuccesFetch={handleSuccesFetch}
            canCancel={canCancel}
        />
    );
}
