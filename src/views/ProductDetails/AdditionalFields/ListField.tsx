import React, { useMemo, useState } from 'react';

// mui imports
import {
    Card,
    IconButton,
    ListItem,
    ListItemText,
    List,
    Divider,
    ListItemSecondaryAction,
    Collapse,
    CircularProgress,
    Stack,
    Pagination,
    Typography,
    Box
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import EditIcon from '@mui/icons-material/Edit';

// third-party imports
import { useIntl } from 'react-intl';
import { AdditionalFieldType } from 'types/catalog';

const pageSize = 5;

export default function ListFieldComponent({
    openEdit,
    isLoading,
    fieldsList,
    deleteElement
}: {
    isLoading: boolean;
    openEdit: (additionalField: AdditionalFieldType) => void;
    fieldsList: AdditionalFieldType[] | null;
    deleteElement: (fieldId: number) => void;
}) {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const pages = useMemo(() => {
        if (fieldsList && fieldsList.length) {
            const maxPages = Math.ceil(fieldsList.length / pageSize);
            return maxPages;
        }
        return 1;
    }, [fieldsList]);

    const renderList = useMemo(() => {
        if (fieldsList && fieldsList.length) {
            const start = (currentPage - 1) * pageSize;
            const end = start + pageSize;

            return fieldsList.slice(start, end);
        }
        return [];
    }, [fieldsList, currentPage]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <>
            <Collapse in={isLoading}>
                <Stack sx={{ width: 1, p: 3 }} alignItems="center" justifyContent="center">
                    <CircularProgress />
                </Stack>
            </Collapse>
            <Collapse in={!isLoading}>
                <>
                    <List component={Card} elevation={2} sx={{ bgcolor: 'background.paper', p: 2 }}>
                        <Collapse in={renderList.length === 0}>
                            <Box>
                                <Typography sx={{ textAlign: 'center' }}>No additional fields, add one</Typography>
                            </Box>
                        </Collapse>
                        {renderList &&
                            renderList.map((item) => (
                                <AdditionalFieldComponent
                                    key={`additionalField-${item.id}`}
                                    onEditClick={openEdit}
                                    additionalField={item}
                                    handleDelete={deleteElement}
                                />
                            ))}
                    </List>
                    {pages > 1 && (
                        <Stack alignItems="flex-end">
                            <Pagination sx={{ mt: 3 }} count={pages} page={currentPage} onChange={handleChange} size="small" />
                        </Stack>
                    )}
                </>
            </Collapse>
        </>
    );
}

const AdditionalFieldComponent = ({
    additionalField,
    onEditClick,
    handleDelete
}: {
    additionalField: AdditionalFieldType;
    onEditClick: (additionalField: AdditionalFieldType) => void;
    handleDelete: (fieldId: number) => void;
}) => {
    // hooks
    const intl = useIntl();

    return (
        <>
            <ListItem>
                <ListItemText primary={additionalField.value} secondary={additionalField.field} />
                <ListItemSecondaryAction>
                    <IconButton onClick={() => handleDelete(additionalField.id)} title={intl.formatMessage({ id: 'delete' })}>
                        <DeleteForeverIcon />
                    </IconButton>
                    <IconButton onClick={() => onEditClick(additionalField)} title={intl.formatMessage({ id: 'edit' })}>
                        <EditIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="middle" />
        </>
    );
};
