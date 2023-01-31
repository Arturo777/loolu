import React from 'react';
import { SpecificationGroupType } from 'types/catalog';

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
};

export default function AssociateFormComponent({
    handleCancel,
    mode,
    handleSuccesFetch,
    show,
    specificationGroups
}: AssociateFormComponentProps) {
    if (!show) {
        return null;
    }

    if (mode === 'EDIT') {
        return null;
    }

    return (
        <AddFormComponent
            specificationGroups={specificationGroups ?? []}
            handleCancel={handleCancel}
            handleSuccesFetch={handleSuccesFetch}
        />
    );
}
