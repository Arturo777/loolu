/* eslint-disable no-plusplus */
/* eslint-disable no-prototype-builtins */
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
import RenderInputComponent, { InputType, SelectOptionType } from './InputComponent';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useIntl } from 'react-intl';

export type MultiMerchantFormProps = {
    accessor: string;
    data: { [key: string]: any }[];
    inputLabel: string;
    isOpen: boolean;
    onSave: (newData: { [key: string]: any }[]) => void;
    options?: null | SelectOptionType[];
    toggleDrawer: (e: boolean) => void;
    type: InputType;
};

export default function MultiMerchantForm({
    accessor,
    data,
    inputLabel,
    isOpen,
    toggleDrawer,
    type,
    options,
    onSave
}: MultiMerchantFormProps) {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();
    const formRef = useRef<HTMLFormElement>();

    // store
    const { user } = useAuth();

    const { merchants } = useSelector((state) => state.auth);

    const [originalData, setOriginalData] = useState<{ [key: string]: any }[]>([]);
    const [newData, setNewData] = useState<{ [key: string]: any }[]>([]);

    useEffect(() => {
        const transformedData = getData({ data, accessor });

        if (transformedData === null) {
            throw Error('The accessor cannot reference to an object');
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
                <Button
                    type="button"
                    onClick={() => toggleDrawer(false)}
                    variant="outlined"
                    startIcon={<CloseIcon />}
                    color="error"
                    sx={{ mr: 2 }}
                >
                    {intl.formatMessage({ id: 'cancel' })}
                </Button>
                <Button onClick={() => formRef.current?.requestSubmit()} variant="outlined" startIcon={<SaveIcon />} type="submit">
                    {intl.formatMessage({ id: 'save' })}
                </Button>
            </Stack>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [intl, toggleDrawer]
    );

    const handleSave = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        // const updateData = updateNestedData({ data: data[0].detailProduct, key: accessor, value: newData[0].value });
        const updatedData = generateNewData({
            originalData: data,
            newData,
            accessor
        });

        onSave(updatedData);
    };

    return (
        <LooluDrawer
            title={intl.formatMessage({ id: 'update_multi_data_title' })}
            isOpen={isOpen}
            toggleDrawer={toggleDrawer}
            footer={drawerFooter}
        >
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
                                        name: item.merchantName,
                                        merchantId: item.merchantId,
                                        isFather: false,
                                        isSelected: false
                                    }}
                                />
                                <Typography sx={{ ml: 1, mr: 1, userSelect: 'none' }} variant="subtitle1">
                                    {item.merchantName}
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
                                    label={intl.formatMessage({ id: inputLabel })}
                                    updateValue={updateValue(item.merchantId)}
                                    options={options}
                                />
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

    let nData: { [key: string]: any }[] = [];

    data.forEach((dataItem) => {
        let newVal = dataItem.detailProduct;

        const max = splitedAccessor.length - 1;
        let i = 0;

        do {
            newVal = newVal[splitedAccessor[i]];
            i += 1;
        } while (max >= i);

        nData = [
            ...nData,
            { merchantId: dataItem.merchantId, merchantName: dataItem.merchantName, value: newVal ?? '', hasChanges: false }
        ];
    });

    if (nData && nData[0] && nData[0].value && typeof nData[0].value === 'object') {
        throw Error('Cannot render objects');
        // return null;
    }

    return nData;
};

const generateNewData = ({
    originalData,
    newData,
    accessor
}: {
    originalData: { [key: string]: any }[];
    newData: { [key: string]: any }[];
    accessor: string;
}) => {
    const newObj = originalData.map((dataItem) => {
        const findValue = newData.find((item) => item.merchantId === dataItem.merchantId);

        const updateValue = updateNestedData({
            data: dataItem.detailProduct,
            key: accessor,
            value: findValue?.value
        });

        return { ...dataItem, detailProduct: { ...updateValue } };
    });

    return newObj;
};

const updateNestedData = ({ data, key, value }: { data: { [key: string]: any }; key: string; value: any }): any => {
    if (!data || typeof data !== 'object') {
        return data;
    }
    const [currentKey, ...remainingKeys] = key.split('.');
    if (remainingKeys.length === 0) {
        // Base case: update the value of the current key
        return { ...data, [currentKey]: value };
    }

    // Recursive case: update the nested object
    const updatedChild = updateNestedData({ data: data[currentKey], key: remainingKeys.join('.'), value });

    return { ...data, [currentKey]: updatedChild };
};
