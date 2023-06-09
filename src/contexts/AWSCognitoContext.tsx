import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import { CognitoUser, CognitoUserPool, CognitoUserSession, CognitoUserAttribute, AuthenticationDetails } from 'amazon-cognito-identity-js';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import { AWS_API } from 'config';
import { AWSCognitoContextType, InitialLoginContextProps } from 'types/auth';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import axiosServices from 'utils/axios';

// constant
const initialState: InitialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

export const userPool = new CognitoUserPool({
    UserPoolId: AWS_API.poolId || '',
    ClientId: AWS_API.appClientId || ''
});

type setSessionProps = {
    serviceToken?: string | null;
    user?: string | null;
};

const setSession = ({ serviceToken, user }: setSessionProps) => {
    if (serviceToken && user) {
        localStorage.setItem('serviceToken', serviceToken);
        localStorage.setItem('user', user);
    } else {
        localStorage.removeItem('serviceToken');
    }
};

// ==============================|| AWS Cognito CONTEXT & PROVIDER ||============================== //
const AWSCognitoContext = createContext<AWSCognitoContextType | null>(null);

export const AWSCognitoProvider = ({ children }: { children: React.ReactElement }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    const location = useLocation();

    useEffect(() => {
        const serviceToken = window.localStorage.getItem('serviceToken');

        if (serviceToken) {
            const expirationToken = expToken(serviceToken);
            const dateNow = Date.now();

            if (expirationToken <= dateNow) {
                logout();
            }
        } else {
            logout();
        }
    }, [location.pathname]);

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = window.localStorage.getItem('serviceToken');
                const userName = window.localStorage.getItem('user') ?? '';
                if (serviceToken) {
                    setSession({ serviceToken, user: userName });
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user: {
                                user: userName
                            }
                        }
                    });
                } else {
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();
    }, []);

    const login = async (email: string, password: string) => {
        const usr = new CognitoUser({
            Username: email,
            Pool: userPool
        });

        const authData = new AuthenticationDetails({
            Username: email,
            Password: password
        });

        usr.authenticateUser(authData, {
            onSuccess: (session: CognitoUserSession) => {
                setSession({ serviceToken: session.getAccessToken().getJwtToken(), user: authData.getUsername() });

                dispatch({
                    type: LOGIN,
                    payload: {
                        isLoggedIn: true,
                        user: {
                            // email: authData.get(),
                            user: authData.getUsername()
                        }
                    }
                });
            },
            onFailure: (_err) => {},
            newPasswordRequired: (userAttributes, requiredAttributes) => {
                // // User was signed up by an admin and must provide new
                // // password and required attributes, if any, to complete
                // // authentication.
                // // the api doesn't accept this field back
                delete userAttributes.email_verified;
                delete userAttributes.email;
                // // unsure about this field, but I don't send this back
                // delete userAttributes.phone_number_verified;
                // // Get these details and call
                usr.completeNewPasswordChallenge(password, userAttributes, requiredAttributes);
            }
        });
    };

    const register = (email: string, password: string, firstName: string, lastName: string) =>
        new Promise((success, rej) => {
            userPool.signUp(
                email,
                password,
                [
                    new CognitoUserAttribute({ Name: 'email', Value: email }),
                    new CognitoUserAttribute({ Name: 'name', Value: `${firstName} ${lastName}` })
                ],
                [],
                async (err, result) => {
                    if (err) {
                        rej(err);
                        return;
                    }
                    success(result);
                }
            );
        });

    const logout = () => {
        const loggedInUser = userPool.getCurrentUser();
        if (loggedInUser) {
            setSession({});
            loggedInUser.signOut();
            dispatch({ type: LOGOUT });
        }
    };

    const resetPassword = () => {};

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return <AWSCognitoContext.Provider value={{ ...state, login, logout, register, resetPassword }}>{children}</AWSCognitoContext.Provider>;
};

export default AWSCognitoContext;

function expToken(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join('')
    );

    const parsed = JSON.parse(jsonPayload);

    return parsed.exp * 1000;
}
