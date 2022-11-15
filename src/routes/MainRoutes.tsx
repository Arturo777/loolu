import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ProductList from 'views/Products';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
// users
const UsersList = Loadable(lazy(() => import('views/Users')));
const UserProfile = Loadable(lazy(() => import('views/UserProfile')));
// profiles
const ProfilesList = Loadable(lazy(() => import('views/Profiles')));

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
            element: <SamplePage />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
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
        }
    ]
};

export default MainRoutes;
