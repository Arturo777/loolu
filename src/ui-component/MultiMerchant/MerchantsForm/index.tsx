import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

import { MerchantAvatar } from 'ui-component/MultiMerchantButton/components';
import LooluDrawer from '../drawer';
import { useDispatch, useSelector } from 'store';
import useAuth from 'hooks/useAuth';
import { getMerchantsList } from 'store/slices/auth';

import RestoreIcon from '@mui/icons-material/Restore';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import UndoIcon from '@mui/icons-material/Undo';
import RenderInputComponent, { InputType } from './InputComponent';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useIntl } from 'react-intl';

export default function MultiMerchantForm({
    accessor,
    data,
    inputLabel,
    isOpen,
    toggleDrawer,
    type
}: {
    accessor: string;
    data: { [key: string]: any }[];
    inputLabel: string;
    isOpen: boolean;
    toggleDrawer: (e: boolean) => void;
    type: InputType;
}) {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();
    const formRef = useRef<HTMLFormElement>();

    // store
    const { user } = useAuth();

    const { merchants } = useSelector((state) => state.auth);

    const [originalData, setOriginalData] = useState<{ [key: string]: any }[]>([]);
    const [newData, setNewData] = useState<{ [key: string]: any }[]>([]);

    // const [accesorError, setAccesorError] = useState<boolean>(false);

    useEffect(() => {
        const transformedData = getData({ data, accessor });
        if (transformedData === null) {
            console.error('The accessor cannot reference to an object');
        } else {
            setNewData(transformedData);
            setOriginalData(transformedData);
        }
    }, [data, accessor]);

    useEffect(() => {
        if (user && user.user) {
            dispatch(getMerchantsList(user?.user));
        }
    }, [dispatch, merchants?.length, user]);

    const replicateInAll = (value: any) => {
        setNewData((prev) =>
            prev.map((item) => {
                const originalValue = originalData.find((itemB) => itemB.merchantId === item.merchantId) ?? {};

                return { ...item, value, hasChanges: originalValue.value !== value };
            })
        );
    };

    const restoreValue = (merchantId: number) => {
        const prevValue = originalData.find((item) => item.merchantId === merchantId);

        if (prevValue) {
            setNewData((prev) =>
                prev.map((item) => {
                    if (item.merchantId === merchantId) {
                        return { ...item, value: prevValue.value };
                    }

                    return item;
                })
            );
        }
    };

    const restoreAll = () => {
        setNewData([...originalData]);
    };

    const updateValue = (merchantId: number) => (newVal: any) => {
        const originalValue = originalData.find((item) => item.merchantId === merchantId) ?? {};

        setNewData((prevData) => [
            ...prevData.map((item) => {
                if (item.merchantId === merchantId) {
                    return { ...item, value: newVal, hasChanges: originalValue.value !== newVal };
                }

                return item;
            })
        ]);
    };

    const clearAll = () => {
        setNewData((prevData) => [
            ...prevData.map((item) => {
                const originalValue = originalData.find((itemB) => itemB.merchantId === item.merchantId) ?? {};

                return { ...item, value: '', hasChanges: originalValue.value !== '' };
            })
        ]);
    };

    const drawerFooter = useMemo(
        () => (
            <Stack direction="row" justifyContent="flex-end">
                <Button variant="contained" startIcon={<CloseIcon />} color="error" sx={{ mr: 2 }} type="submit">
                    {intl.formatMessage({ id: 'cancel' })}
                </Button>
                <Button onClick={() => formRef.current?.requestSubmit()} variant="contained" startIcon={<SaveIcon />} type="submit">
                    {intl.formatMessage({ id: 'save' })}
                </Button>
            </Stack>
        ),
        [intl]
    );

    const handleSave = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        console.log('FORMAT DATA');
    };

    return (
        <LooluDrawer title="Change: Description" isOpen={isOpen} toggleDrawer={toggleDrawer} footer={drawerFooter}>
            <Stack sx={{ mt: 1, paddingX: 2 }} direction="row" alignItems="center" justifyContent="flex-end">
                <Typography>Actions:</Typography>

                <Tooltip title="Restore all">
                    <IconButton sx={{ color: 'divider' }} onClick={restoreAll}>
                        <RestoreIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Clear all">
                    <IconButton sx={{ color: 'divider' }} onClick={clearAll}>
                        <ClearAllIcon />
                    </IconButton>
                </Tooltip>
            </Stack>

            <Box component="form" ref={formRef} onSubmit={handleSave}>
                {newData &&
                    newData.map((item) => (
                        <Stack sx={{ pr: 2, pl: 2, pt: 2, pb: 1 }} key={`multi-merchant-input-${item.merchantId}`}>
                            <Stack direction="row" alignItems="center" mb={3}>
                                <MerchantAvatar
                                    size="large"
                                    merchant={{
                                        name: item.name,
                                        merchantId: item.merchantId,
                                        isFather: false,
                                        isSelected: false
                                    }}
                                />
                                <Typography sx={{ ml: 1, mr: 1, userSelect: 'none' }} variant="subtitle1">
                                    {item.name}
                                </Typography>

                                {item.hasChanges && (
                                    <Tooltip title="Restore">
                                        <IconButton sx={{ color: 'divider' }} onClick={() => restoreValue(item.merchantId)}>
                                            <UndoIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}

                                <Tooltip title="Replicate to everything">
                                    <IconButton sx={{ color: 'divider' }} onClick={() => replicateInAll(item.value)}>
                                        <CopyAllIcon />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                            <Box>
                                <RenderInputComponent
                                    type={type}
                                    value={item.value}
                                    label={inputLabel}
                                    updateValue={updateValue(item.merchantId)}
                                />
                                {/* <TextField label="Description" fullWidth value={item.value} /> */}
                            </Box>
                            <Divider sx={{ mt: 2, mb: 0 }} />
                        </Stack>
                    ))}
            </Box>
        </LooluDrawer>
    );
}

const getData = ({ data, accessor }: { data: { [key: string]: any }[]; accessor: string }) => {
    // split accesor
    const splitedAccessor = accessor.split('.');

    // console.log(splitedAccessor);

    let nData: { [key: string]: any }[] = [];

    data.forEach((dataItem) => {
        let newVal = dataItem.data;

        const max = splitedAccessor.length - 1;
        let i = 0;

        do {
            newVal = newVal[splitedAccessor[i]];
            i += 1;
        } while (max >= i);

        nData = [...nData, { ...dataItem.merchant, value: newVal ?? '', hasChanges: false }];
    });

    if (nData && nData[0] && nData[0].value && typeof nData[0].value === 'object') {
        console.log('Cannot render objects');
        return null;
    }

    return nData;
};

// const createReturnData = () => {};
//
