// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { dispatch } from '../index';

// types
import { DefaultRootStateProps } from 'types';
import { ProfileType, ProviderType, UserType } from 'types/user-profile';
import { STYRK_API, STYRK_TOKEN } from 'config';
import { NewProfileType } from 'types/user';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['user'] = {
    error: null,
    usersS1: [],
    usersS2: [],
    followers: [],
    friendRequests: [],
    friends: [],
    gallery: [],
    posts: [],
    detailCards: [],
    simpleCards: [],
    profileCards: [],
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
    name: 'user',
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
        getProfilesSuccess(state, action) {
            const profiles: ProfileType[] = action.payload;
            state.loadingEditInfo = false;
            state.profiles = profiles;
        },
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
        // profile => create
        // createProfileServiceSuccess(state, action) {
        //     state.
        // },
        // user info
        updateUserInfoPending(state) {
            state.fetching = true;
        },
        updateUserInfoSuccess(state) {
            state.fetching = false;
        },
        // menu => access
        getMenuPermissionsSuccess(state, action) {
            state.menuOptions = action.payload;
            state.loading = false;
        }
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
                },
                headers: {
                    authorization: `Bearer ${STYRK_TOKEN}`
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
                },
                headers: {
                    authorization: `Bearer ${STYRK_TOKEN}`
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

export function getProfiles(idMerchant?: string) {
    return async () => {
        dispatch(slice.actions.getEditInfoPending());

        try {
            const response = await axios.get(`styrk/api/profile/search`, {
                baseURL: STYRK_API,
                params: {
                    idMerchant: idMerchant || 1
                },
                headers: {
                    authorization: `Bearer ${STYRK_TOKEN}`
                }
            });

            dispatch(slice.actions.getProfilesSuccess(response.data.response));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getProviders(idMerchant?: string) {
    return async () => {
        dispatch(slice.actions.getEditInfoPending());

        try {
            const response = await axios.get(`styrk/api/supplier/search`, {
                baseURL: STYRK_API,
                params: {
                    idMerchant: idMerchant || 1
                },
                headers: {
                    authorization: `Bearer ${STYRK_TOKEN}`
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
                },
                headers: {
                    authorization: `Bearer ${STYRK_TOKEN}`
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
                },
                headers: {
                    authorization: `Bearer ${STYRK_TOKEN}`
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
                },
                headers: {
                    authorization: `Bearer ${STYRK_TOKEN}`
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
                },
                headers: {
                    authorization: `Bearer ${STYRK_TOKEN}`
                }
            });
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            return error;
        }
    };
}

export function updateProfileService(data: any, idMerchant?: number) {
    return async () => {
        try {
            return await axios.post(
                `${STYRK_API}/styrk/api/profile/save`,
                { ...data, idMerchant: idMerchant || 1 },
                {
                    params: {
                        idMerchant: idMerchant || 1
                    },
                    headers: {
                        authorization: `Bearer ${STYRK_TOKEN}`
                    }
                }
            );
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            return error;
        }
    };
}
