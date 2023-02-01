import React, { useState, useEffect } from 'react';

// mui imports
import { FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, TextField, Collapse } from '@mui/material';

// third-party imports
import { useIntl } from 'react-intl';
import { SpecificationGroupMode, SpecificationGroupType } from 'types/catalog';

type ToAddFormProps = {
    // handleChangeSelect: (e: SelectChangeEvent) => void;
    // specificationGroupMode: SpecificationGroupMode;
    specificationGroups: SpecificationGroupType[];
    handleChangeData: (data: { groupId: string; groupName: string; specificationGroupMode: SpecificationGroupMode }) => void;
};

export default function ToAddForm({ specificationGroups, handleChangeData }: ToAddFormProps) {
    // hooks
    const intl = useIntl();

    // conts
    const [internData, setInternData] = useState<{
        groupId: string;
        groupName: string;
        specificationGroupMode: SpecificationGroupMode;
    }>({
        groupId: '',
        specificationGroupMode: SpecificationGroupMode.PRODUCT,
        groupName: ''
    });

    useEffect(() => {
        if (specificationGroups && specificationGroups.length === 0) {
            setInternData((prevData) => ({ ...prevData, groupId: 'NEW' }));
        }
    }, [specificationGroups]);

    useEffect(() => {
        handleChangeData(internData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [internData]);

    const handleChangeSelects = (event: SelectChangeEvent) => {
        // handleChangeSelect(event);
        setInternData((prevData) => ({ ...prevData, [event.target.name]: event.target.value }));
    };

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };

    return (
        <>
            {specificationGroups && specificationGroups.length > 0 && (
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="spec-type-mode-label">
                        {intl.formatMessage({
                            id: 'group'
                        })}
                    </InputLabel>
                    <Select
                        name="groupId"
                        labelId="spec-type-group-label"
                        id="spec-type-group-select"
                        label="group"
                        onChange={handleChangeSelects}
                        value={internData.groupId}
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
            )}

            <Collapse in={internData.groupId === 'NEW'}>
                <TextField
                    name="groupName"
                    required={internData.groupId === 'NEW'}
                    label={intl.formatMessage({
                        id: 'group_name'
                    })}
                    fullWidth
                    sx={{ mt: 2 }}
                    type="text"
                    onChange={handleChangeText}
                    value={internData.groupName}
                />
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
