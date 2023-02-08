import React, { FormEvent, useEffect, useState } from 'react';

// material-ui
import { Grid, TextField, Divider, Button, FormControlLabel, Checkbox, Box, Typography, Collapse, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

// third-party imports
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

// project imports
import { gridSpacing } from 'store/constant';
import { MenuDetailsType, ProfileType } from 'types/user-profile';
import { getMenuPermissions } from 'store/slices/security';
import { useSelector } from 'store';
import { NewProfileType } from 'types/security';

type NewProfieState = {
    type: string;
    description: string;
    menus: number[];
};

const newProfileDefault: NewProfieState = {
    type: '',
    description: '',
    menus: []
};

type ProfileFormProps = {
    handleSaveClick: (data: NewProfileType) => void;
    defaultData?: ProfileType;
    mode: 'CREATE' | 'EDIT';
    handleCancel: () => void;
};

export default function ProfileForm({ handleSaveClick, defaultData, mode, handleCancel }: ProfileFormProps) {
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();

    // const
    const { menuOptions, fetching, loading } = useSelector((state) => state.user);
    const [newData, setNewData] = useState<NewProfieState>(newProfileDefault);
    const [hasError, setHasError] = useState<string>('');

    useEffect(() => {
        dispatch(getMenuPermissions());
    }, [dispatch]);

    useEffect(() => {
        if (defaultData) {
            const newMenu = defaultData.menuDetails.map((item) => {
                const submenus = item.children.map((itemA) => itemA.id);
                return [...submenus, item.id];
            });

            const newInfo: NewProfieState = {
                ...newData,
                type: defaultData.type,
                description: defaultData.description,
                menus: newMenu.flat()
            };

            setNewData(newInfo);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewData({ ...newData, [name]: value });
    };

    const handleCheckbox = (checkList: CheckListState[]) => {
        let currentMenus = [...newData.menus];

        checkList.forEach((item: CheckListState) => {
            const exist = currentMenus.some((itemIdA) => itemIdA === item.id);

            if (item.checked) {
                // ADD
                // EXIST
                if (!exist) {
                    currentMenus = [...currentMenus, item.id];
                }
            } else {
                // DELETE
                // eslint-disable-next-line no-lonely-if
                if (exist) {
                    currentMenus = currentMenus.filter((itemIdA) => itemIdA !== item.id);
                }
            }
        });

        setNewData({
            ...newData,
            menus: currentMenus
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setHasError('');

        if (newData.type === '' || newData.description === '' || newData.menus.length === 0) {
            setHasError('Selecciona una permiso para el perfil');
            return;
        }

        const dataToSave = {
            ...newData,
            menus: newData.menus.map((item) => `${item}`)
        };

        handleSaveClick(dataToSave);
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={6} md={3} lg={6} xl={4}>
                    <TextField
                        value={newData.type}
                        fullWidth
                        label={intl.formatMessage({
                            id: 'type'
                        })}
                        name="type"
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={6} xl={4}>
                    <TextField
                        fullWidth
                        label={intl.formatMessage({
                            id: 'description'
                        })}
                        name="description"
                        onChange={handleChange}
                        required
                        value={newData.description}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Stack sx={{ display: 'flex' }}>
                        <Typography variant="subtitle2" mt={2}>
                            {intl.formatMessage({ id: 'permissions' })}
                        </Typography>
                        <Collapse in={Boolean(hasError)}>
                            <Typography mt={1} color="error">
                                {hasError}
                            </Typography>
                        </Collapse>
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <Grid container>
                        {menuOptions &&
                            menuOptions.map((item, i) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={`checkgroup-${i}`}>
                                    <CheckLabelGroup
                                        itemMenu={item}
                                        mode={mode}
                                        defaultSelected={mode === 'CREATE' ? null : defaultData?.menuDetails!}
                                        onChange={handleCheckbox}
                                        fatherId={item.id}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Divider sx={{ mb: 1, mt: 1 }} />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            disabled={loading || fetching}
                            onClick={handleCancel}
                            variant="outlined"
                            color="error"
                            sx={{ mr: 2 }}
                            startIcon={<CloseIcon />}
                        >
                            {intl.formatMessage({ id: 'cancel' })}
                        </Button>

                        <Button disabled={loading || fetching} variant="outlined" startIcon={<SaveIcon />} type="submit">
                            {intl.formatMessage({ id: 'save' })}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

type CheckLabelGroupProps = {
    itemMenu: MenuDetailsType;
    defaultSelected: MenuDetailsType[] | null;
    onChange: (checkedList: CheckListState[]) => void;
    mode: 'CREATE' | 'EDIT';
    fatherId: number;
};

type CheckListState = {
    id: number;
    name: string;
    checked: boolean;
};

const CheckLabelGroup = ({ itemMenu, defaultSelected, onChange, mode, fatherId }: CheckLabelGroupProps) => {
    const [checkedList, setCheckedList] = useState<CheckListState[]>([]);

    useEffect(() => {
        if (defaultSelected) {
            const filteredMenu: { [key: string]: any } = defaultSelected.find((item) => item.id === itemMenu.id) ?? {};
            const defaultChildren: { id: number }[] = filteredMenu?.children ?? [];

            const newCheckList = itemMenu?.children.map((item) => ({
                id: item.id,
                name: item.type,
                checked: defaultChildren.some((itemA) => itemA.id === item.id)
            }));

            setCheckedList(newCheckList);
        } else {
            const newCheckList = itemMenu?.children.map((item) => ({
                id: item.id,
                name: item.type,
                checked: false
            }));

            setCheckedList(newCheckList);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemMenu, defaultSelected]);

    const isChecked = (id: number) => checkedList.find((itemList) => itemList.id === id)?.checked;

    const handleChangeChild = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;

        const newCheckList = checkedList.map((item) => {
            if (item.id === Number(name)) {
                return { ...item, checked };
            }
            return item;
        });

        setCheckedList(newCheckList);
    };

    const handleChangeMain = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = event.target.checked;

        const newCheckList = checkedList.map((item) => ({ ...item, checked: newVal }));
        setCheckedList(newCheckList);
    };

    const isAllSelect = () => checkedList.every((item) => item.checked);
    const hasSelect = () => checkedList.some((item) => item.checked);

    useEffect(() => {
        const mainCheck: CheckListState = {
            id: itemMenu.id,
            name: itemMenu.type,
            checked: hasSelect()
        };

        onChange([...checkedList, mainCheck]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkedList, itemMenu.id, itemMenu.type]);

    return (
        <Box>
            <FormControlLabel
                label={`${itemMenu.type}`}
                sx={{
                    '& .MuiFormControlLabel-label': {
                        fontWeight: 700
                    }
                }}
                control={<Checkbox checked={isAllSelect()} indeterminate={!isAllSelect() && hasSelect()} onChange={handleChangeMain} />}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', pl: 2 }}>
                {checkedList &&
                    checkedList.map((itemChild) => (
                        <FormControlLabel
                            key={`item-check-${itemChild.name}`}
                            label={`${itemChild.name}`}
                            control={<Checkbox name={`${itemChild.id}`} checked={isChecked(itemChild.id)} onChange={handleChangeChild} />}
                        />
                    ))}
            </Box>
        </Box>
    );
};

export const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    maxWidth: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 3,
    pb: 3,
    borderRadius: 2
};
