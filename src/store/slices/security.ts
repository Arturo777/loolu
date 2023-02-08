// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosGlobal from 'axios';

// project imports
import { dispatch } from '../index';
import axios from 'utils/axios';

// types
import { DefaultRootStateProps } from 'types';
import { MenuDetailsType, ProfileType, ProviderType, UserType } from 'types/user-profile';
import { STYRK_API } from 'config';
import { NewProfileType } from 'types/security';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['security'] = {
    error: null,
    loading: true,
    usersList: [],
    currentUser: undefined,
    loadingEditInfo: true,
    profiles: [],
    providers: [],
    approvalProfiles: [],
    fetching: false,
    menuOptions: []
};

const slice = createSlice({
    name: 'security',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },
        basicSuccess(state) {
            state.loading = false;
        },
        // USERS

        getUsersListPending(state) {
            state.loading = true;
        },
        getUsersListSuccess(state, action) {
            state.usersList = action.payload.map((item: UserType) => ({
                ...item,
                name: `${item.firstName} ${item.lastName ?? ''}`.trim(),
                avatart: 'default-profile.jpg'
            }));
            state.loading = false;
        },
        getUserDataPending(state) {
            state.loading = true;
        },
        getUserDataSuccess(state, action) {
            state.loading = false;
            state.currentUser = action.payload;
        },
        // profiles
        getEditInfoPending(state) {
            state.loadingEditInfo = true;
        },
        // getProfilesPending(state) {
        //     state.loading = true;
        // },
        // getProfilesSuccess(state, action) {

        // getProfilesSuccess(state, action) {
        //     const profiles: ProfileType[] = action.payload;
        //     state.loadingEditInfo = false;
        //     state.profiles = profiles;
        // },
        // providers
        getProvidersSuccess(state, action) {
            const providers: ProviderType[] = action.payload;
            state.loadingEditInfo = false;
            state.providers = providers;
        },
        getApprovalProfilesSuccess(state, action) {
            state.loadingEditInfo = false;
            state.approvalProfiles = action.payload;
        },
        // profile => edit
        updateProfilePending(state) {
            state.fetching = true;
        },
        updateProfileSuccess(state) {
            state.fetching = false;
        },
        deleteMenusServicePending(state) {
            state.fetching = true;
        },
        deleteMenusServiceSuccess(state) {
            state.fetching = false;
        },
        // user info
        updateUserInfoPending(state) {
            state.fetching = true;
        },
        updateUserInfoSuccess(state) {
            state.fetching = false;
        },
        // menu => access
        getMenuPermissionsSuccess(state, action) {
            const optionsList: MenuDetailsType[] = [];
            const payloadResponse: MenuDetailsType[] = action.payload;

            payloadResponse.forEach((optionItem) => {
                const exist = optionsList.some((item) => item.id === optionItem.id);
                if (!exist) {
                    optionsList.push(optionItem);
                }
            });

            state.menuOptions = optionsList;
            state.loading = false;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getProfiles.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProfiles.fulfilled, (state, action) => {
                state.loading = false;

                const profiles: ProfileType[] = action.payload.response;
                state.profiles = profiles;
            });
        builder.addCase(getProfiles.fulfilled, (state, action) => {
            state.profiles = action.payload;
        });
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getUsersList(idMerchant?: string) {
    return async () => {
        dispatch(slice.actions.getUsersListPending());
        try {
            const response = await axios.get(`styrk/api/user/searchall`, {
                baseURL: STYRK_API,
                params: {
                    idMerchant: idMerchant || 1
                }
            });

            dispatch(slice.actions.getUsersListSuccess(response.data.response));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getUserInfo(userId: number, idMerchant?: string) {
    return async () => {
        dispatch(slice.actions.getUserDataPending());

        try {
            const response = await axios.get(`styrk/api/user/searchall`, {
                baseURL: STYRK_API,
                params: {
                    idMerchant: idMerchant || 1
                }
            });

            const users: UserType[] = response.data.response;

            const userFiteres = users.filter((userItem: UserType) => userItem.id === userId);

            const userClean = userFiteres.map((userData: UserType) => {
                const {
                    id,
                    status,
                    user,
                    firstName,
                    lastName,
                    employeNumber,
                    email,
                    phoneNumber,
                    pass,
                    profile,
                    provider,
                    idApprovalProfile
                } = userData;

                return {
                    id,
                    status,
                    user,
                    firstName,
                    lastName,
                    employeNumber,
                    email,
                    phoneNumber,
                    pass,
                    profile,
                    provider,
                    idApprovalProfile
                };
            });

            dispatch(slice.actions.getUserDataSuccess(userClean[0]));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export const getProfiles = createAsyncThunk(`${slice.name}/getProfiles`, async (idMerchant?: number) => {
    const response = await axios.get(`styrk/api/profile/search`, {
        baseURL: STYRK_API,
        params: {
            idMerchant: idMerchant || 1
        }
    });
    return response.data.response;
});

export function getProviders(idMerchant?: string) {
    return async () => {
        dispatch(slice.actions.getEditInfoPending());

        try {
            const response = await axios.get(`styrk/api/supplier/search`, {
                baseURL: STYRK_API,
                params: {
                    idMerchant: idMerchant || 1
                }
            });

            dispatch(slice.actions.getProvidersSuccess(response.data.response));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getApprovalProfiles(idMerchant?: string) {
    return async () => {
        dispatch(slice.actions.getEditInfoPending());

        try {
            const response = await axios.get(`styrk/api/product/approvalprofile`, {
                baseURL: STYRK_API,
                params: {
                    idMerchant: idMerchant || 1
                }
            });

            dispatch(slice.actions.getApprovalProfilesSuccess(response.data.response));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function updateUserInfo(data: any, idMerchant?: number) {
    return async () => {
        dispatch(slice.actions.updateUserInfoPending());

        try {
            await axios.post(`${STYRK_API}/styrk/api/user/save`, data, {
                params: {
                    idMerchant: idMerchant || 1
                }
            });

            dispatch(slice.actions.updateUserInfoSuccess());
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getMenuPermissions(idMerchant?: number) {
    return async () => {
        try {
            const response = await axios.get(`styrk/api/menu/search`, {
                baseURL: STYRK_API,
                params: {
                    idMerchant: idMerchant || 1
                }
            });

            dispatch(slice.actions.getMenuPermissionsSuccess(response.data.response));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function createProfileService(data: NewProfileType, idMerchant?: number) {
    return async () => {
        try {
            return await axios.post(`${STYRK_API}/styrk/api/profile/save`, data, {
                params: {
                    idMerchant: idMerchant || 1
                }
            });
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            return error;
        }
    };
}

type updateProfileServiceProps = {
    data: {
        idPerfil: number;
        idStatus: boolean;
        description: string;
        menus: number[];
        type: string;
    };
    idMerchant?: number;
};

export function updateProfileService({ data, idMerchant }: updateProfileServiceProps) {
    return async () => {
        dispatch(slice.actions.updateProfilePending());
        try {
            await axios.post(
                `${STYRK_API}/styrk/api/profile/save`,
                { ...data, idMerchant: idMerchant || 1 },
                {
                    params: {
                        idMerchant: idMerchant || 1
                    }
                }
            );
            return dispatch(slice.actions.updateProfileSuccess());
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            return error;
        }
    };
}

type deleteMenusServiceProps = {
    menus: number[];
    idPerfil: number;
    idMerchant?: number;
};

export function deleteMenusService({ menus, idPerfil, idMerchant }: deleteMenusServiceProps) {
    dispatch(slice.actions.deleteMenusServicePending());

    const promises = menus.map((item: number) =>
        axios.delete(`${STYRK_API}/styrk/api/profile/delete`, {
            params: {
                idMerchant: idMerchant || 1,
                idMenu: `${item}`,
                idPerfil
            }
        })
    );

    return async () => {
        try {
            await axiosGlobal.all(promises);
            return dispatch(slice.actions.deleteMenusServiceSuccess());
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            return error;
        }
    };
}
