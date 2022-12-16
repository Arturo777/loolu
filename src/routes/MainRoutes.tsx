import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ProductList from 'views/Products';
import ProductDetails from 'views/ProductDetails';

//  ========= users =========
const UsersList = Loadable(lazy(() => import('views/Users')));
const UserProfile = Loadable(lazy(() => import('views/UserProfile')));

// ========= profiles =========
const ProfilesList = Loadable(lazy(() => import('views/Profiles/List')));
const CreateProfile = Loadable(lazy(() => import('views/Profiles/CreateProfile')));
const EditProfile = Loadable(lazy(() => import('views/Profiles/EditProfile')));

// ========= brands =========
const BrandsListPage = Loadable(lazy(() => import('views/Brands/List')));
const EditBrandPage = Loadable(lazy(() => import('views/Brands/Edit')));
const CreateBrandPage = Loadable(lazy(() => import('views/Brands/Create')));

// ========= providers - suppliers =========
const ProvidersListPage = Loadable(lazy(() => import('views/Suppliers/List')));
const CreateSupplierPage = Loadable(lazy(() => import('views/Suppliers/Create')));
const EditSupplierPage = Loadable(lazy(() => import('views/Suppliers/Edit')));

// ========= FACETS =========
const FacetsMainPage = Loadable(lazy(() => import('views/Facets/Main')));

// ========= CATEGORIES =========
const CategoriesMainPage = Loadable(lazy(() => import('views/Categories/Main')));

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
        // ========= users =========
        {
            path: '/products/detail-product/:id',
            element: <ProductDetails />
        },
        {
            path: '/users',
            element: <UsersList />
        },
        {
            path: '/users/:userId/edit',
            element: <UserProfile />
        },
        // ========= profiles =========
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
        // ========= brands =========
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
        // ========= providers - suppliers =========
        {
            path: '/suppliers',
            element: <ProvidersListPage />
        },
        {
            path: '/suppliers/create',
            element: <CreateSupplierPage />
        },
        {
            path: '/suppliers/:supplierId/edit',
            element: <EditSupplierPage />
        },
        // ========= FACETS =========
        {
            path: '/facets',
            element: <FacetsMainPage />
        },
        // ========= CATEGORIES =========
        {
            path: '/categories',
            element: <CategoriesMainPage />
        }
    ]
};

export default MainRoutes;
