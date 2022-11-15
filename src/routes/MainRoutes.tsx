import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ProductList from 'views/Products';

// users
const UsersList = Loadable(lazy(() => import('views/Users')));
const UserProfile = Loadable(lazy(() => import('views/UserProfile')));

// profiles
const ProfilesList = Loadable(lazy(() => import('views/Profiles/List')));
const ProfileFormView = Loadable(lazy(() => import('views/Profiles/ProfileForm')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <ProductList />
        },
        {
            path: '/products',
            element: <ProductList />
        },
        {
            path: '/users',
            element: <UsersList />
        },
        {
            path: '/users/:userId/edit',
            element: <UserProfile />
        },
        {
            path: '/profiles',
            element: <ProfilesList />
        },
        {
            path: '/profiles/:profileId/edit',
            element: <ProfileFormView />
        }
    ]
};

export default MainRoutes;
