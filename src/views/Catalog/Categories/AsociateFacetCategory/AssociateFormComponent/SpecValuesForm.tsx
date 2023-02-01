import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';

// mui imports
import { Typography, Box, Stack, Divider, IconButton, TextField, Checkbox } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

// third-party imports
import { useIntl } from 'react-intl';

// project imports

// types
import { SpecificationValueDataType } from 'types/catalog';
import { NewSpecificationValueType } from './CustomTypes';

type SpecValuesFormProps = {
    // specification: SpecificationsType | NewSpecificationType;
    currentValues?: SpecificationValueDataType[];
    handleAddValues: (value: NewSpecificationValueType[]) => void;
    handleUpdateCurrent?: (data: SpecificationValueDataType[]) => void;
};

const SpecValuesForm = ({ currentValues, handleAddValues, handleUpdateCurrent }: SpecValuesFormProps) => {
    // hooks
    const intl = useIntl();

    // vars
    const [newValue, setNewValue] = useState<string>('');
    const [newSpecs, setNewSpecs] = useState<NewSpecificationValueType[]>([]);

    useEffect(() => {
        handleAddValues(newSpecs);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newSpecs]);

    const onchangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewValue(e.target.value);
    };

    const addSpec = () => {
        setNewSpecs([...newSpecs, { name: newValue, isActive: true }]);
        setNewValue('');
    };

    // current list handlers
    const toggleActiveCurrent = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        const id = Number(name.replace('current-values-', ''));
        const isActive = checked;

        if (currentValues) {
            const updatedValues = currentValues?.map((item) => {
                if (item.specificationValueId === id) {
                    return { ...item, isActive };
                }

                return item;
            });
            if (handleUpdateCurrent) {
                handleUpdateCurrent(updatedValues);
            }
        }
    };

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const id = Number(name.replace('current-values-name-', ''));

        if (currentValues) {
            const updatedValues = currentValues?.map((item) => {
                if (item.specificationValueId === id) {
                    return { ...item, name: value };
                }

                return item;
            });
            if (handleUpdateCurrent) {
                handleUpdateCurrent(updatedValues);
            }
        }
    };

    // NEW LIST handlers
    const toggleActiveNew = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        const i = Number(name.replace('new-value-', ''));

        const updatedSpecs = newSpecs.map((item, y) => {
            if (i === y) {
                return { ...item, isActive: checked };
            }
            return item;
        });

        setNewSpecs(updatedSpecs);
    };

    const handleChangeNewValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const id = Number(name.replace('new-value-name-', ''));

        const updatedSpecs = newSpecs.map((item, y) => {
            if (id === y) {
                return { ...item, name: value };
            }
            return item;
        });

        setNewSpecs(updatedSpecs);
    };

    const handleEnter = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            addSpec();
        }
    };

    return (
        <Box>
            <Box sx={{ mt: 2, mb: 2 }}>
                <Divider />
            </Box>
            <Typography variant="subtitle1" mt={1}>
                {intl.formatMessage({ id: 'values' })}
            </Typography>
            <Typography variant="body2" mb={2}>
                {intl.formatMessage({ id: 'add_values' })}
            </Typography>
            <Stack mb={3} direction="row">
                <TextField
                    onKeyDown={handleEnter}
                    size="small"
                    name="newVal"
                    value={newValue}
                    label={intl.formatMessage({
                        id: 'new_value'
                    })}
                    onChange={onchangeText}
                    fullWidth
                />
                <IconButton size="small" color="primary" disabled={newValue.length === 0} onClick={addSpec}>
                    <AddBoxIcon />
                </IconButton>
            </Stack>

            {newSpecs &&
                newSpecs?.map((newSpec, index) => (
                    <Stack direction="row" mb={2} key={`new-specs-values-list-${index}`}>
                        <Checkbox onChange={toggleActiveNew} name={`new-value-${index}`} checked={newSpec.isActive} />
                        <TextField
                            size="small"
                            name={`new-value-name-${index}`}
                            value={newSpec.name}
                            fullWidth
                            onChange={handleChangeNewValue}
                        />
                    </Stack>
                ))}

            {currentValues &&
                currentValues?.map((specValue) => (
                    <Stack direction="row" mb={2} key={`specs-values-list-${specValue.specificationValueId}`}>
                        <Checkbox
                            size="small"
                            onChange={toggleActiveCurrent}
                            name={`current-values-${specValue.specificationValueId}`}
                            checked={specValue.isActive}
                        />
                        <TextField
                            size="small"
                            onChange={handleChangeValue}
                            name={`current-values-name-${specValue.specificationValueId}`}
                            value={specValue.name}
                            fullWidth
                        />
                    </Stack>
                ))}
        </Box>
    );
};

export default SpecValuesForm;
