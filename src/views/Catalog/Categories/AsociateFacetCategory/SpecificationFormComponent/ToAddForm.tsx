import React, { useState } from 'react';

// mui imports
import { FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, TextField, Collapse } from '@mui/material';

// third-party imports
import { useIntl } from 'react-intl';
import { SpecificationGroupMode, SpecificationGroupType } from 'types/catalog';

type ToAddFormProps = {
    handleChangeSelect: (e: SelectChangeEvent) => void;
    specificationGroupMode: SpecificationGroupMode;
    specificationGroups: SpecificationGroupType[];
};

export default function ToAddForm({ handleChangeSelect, specificationGroupMode, specificationGroups }: ToAddFormProps) {
    // hooks
    const intl = useIntl();

    // conts
    const [internData, setInternData] = useState<{ specificationGroupId: string; specificationGroupMode: string }>({
        specificationGroupId: '',
        specificationGroupMode: ''
    });

    const handleChangeSelects = (event: SelectChangeEvent) => {
        handleChangeSelect(event);
        setInternData((prevData) => ({ ...prevData, [event.target.name]: event.target.value }));
    };

    return (
        <>
            <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="spec-type-mode-label">
                    {intl.formatMessage({
                        id: 'group'
                    })}
                </InputLabel>
                <Select
                    name="specificationGroupId"
                    labelId="spec-type-group-label"
                    id="spec-type-group-select"
                    label="group"
                    onChange={handleChangeSelects}
                    value={internData.specificationGroupId}
                >
                    <MenuItem value="NEW">
                        {intl.formatMessage({
                            id: 'add_group'
                        })}
                    </MenuItem>
                    {specificationGroups &&
                        specificationGroups.map((item) => (
                            <MenuItem key={`specification-group-${item.groupId}`} value={item.groupId}>
                                {item.name}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>

            <Collapse in={internData.specificationGroupId === 'NEW'}>
                <TextField label="Nombre del nuevo grupo" fullWidth sx={{ mt: 3 }} type="text" />
            </Collapse>

            <FormControl fullWidth sx={{ mt: 4 }}>
                <InputLabel id="spec-type-mode-label">Mode</InputLabel>
                <Select
                    name="specificationGroupMode"
                    labelId="spec-type-mode-label"
                    id="spec-type-mode-select"
                    label="Mode"
                    onChange={handleChangeSelects}
                    value={internData.specificationGroupMode}
                >
                    <MenuItem value={SpecificationGroupMode.PRODUCT}>
                        {intl.formatMessage({
                            id: 'product'
                        })}
                    </MenuItem>
                    <MenuItem value={SpecificationGroupMode.SKU}>
                        {intl.formatMessage({
                            id: 'sku'
                        })}
                    </MenuItem>
                </Select>
            </FormControl>
        </>
    );
}
