import React from 'react';
import { CategoryType, SpecificationGroupType } from 'types/catalog';

// mui imports

// third-party imports

// project impors
import AddFormComponent from './AddForm';

type AssociateFormComponentProps = {
    handleCancel: () => void;
    mode: 'EDIT' | 'ADD';
    handleSuccesFetch: () => void;
    show: boolean;
    specificationGroups: SpecificationGroupType[] | undefined;
    category: CategoryType;
};

export default function AssociateFormComponent({
    handleCancel,
    mode,
    handleSuccesFetch,
    show,
    specificationGroups,
    category
}: AssociateFormComponentProps) {
    if (!show) {
        return null;
    }

    if (mode === 'EDIT') {
        return null;
    }

    return (
        <AddFormComponent
            category={category}
            specificationGroups={specificationGroups ?? []}
            handleCancel={handleCancel}
            handleSuccesFetch={handleSuccesFetch}
        />
    );
}
