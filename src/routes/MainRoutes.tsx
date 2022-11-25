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
const CreateProfile = Loadable(lazy(() => import('views/Profiles/CreateProfile')));
const EditProfile = Loadable(lazy(() => import('views/Profiles/EditProfile')));

// brands
const BrandsListPage = Loadable(lazy(() => import('views/Brands/List')));
const EditBrandPage = Loadable(lazy(() => import('views/Brands/Edit')));
const CreateBrandPage = Loadable(lazy(() => import('views/Brands/Create')));

// providers
const ProvidersListPage = Loadable(lazy(() => import('views/Providers/List')));

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
            path: '/profiles/create',
            element: <CreateProfile />
        },
        {
            path: '/profiles/:profileId/edit',
            element: <EditProfile />
        },
        {
            path: '/brands',
            element: <BrandsListPage />
        },
        {
            path: '/brands/:brandId/edit',
            element: <EditBrandPage />
        },
        {
            path: '/brands/create',
            element: <CreateBrandPage />
        },
        {
            path: '/suppliers',
            element: <ProvidersListPage />
        }
    ]
};

export default MainRoutes;
