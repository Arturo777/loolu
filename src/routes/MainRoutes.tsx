import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ProductList from 'views/Products';
import ProductDetails from 'views/ProductDetails';
import FirstLevel from 'views/Catalog/HealthContent/FirstLevel';
import Products from 'views/Catalog/HealthContent/SecondLevel/Products/Products';
import Images from 'views/Catalog/HealthContent/SecondLevel/Images';
import Facets from 'views/Catalog/HealthContent/SecondLevel/Facets';

//  ========= users =========
const UsersList = Loadable(lazy(() => import('views/Security/Users')));
const UserProfile = Loadable(lazy(() => import('views/Security/UserProfile')));

// ========= profiles =========
const ProfilesMainPage = Loadable(lazy(() => import('views/Security/Profiles')));
const CreateProfile = Loadable(lazy(() => import('views/Security/Profiles/CreateProfile')));
const EditProfile = Loadable(lazy(() => import('views/Security/Profiles/EditProfile')));

// ========= brands =========
const BrandsListPage = Loadable(lazy(() => import('views/Catalog/Brands/List')));
const EditBrandPage = Loadable(lazy(() => import('views/Catalog/Brands/Edit')));
const CreateBrandPage = Loadable(lazy(() => import('views/Catalog/Brands/Create')));

// ========= providers - suppliers =========
const ProvidersListPage = Loadable(lazy(() => import('views/Catalog/Suppliers/List')));
const CreateSupplierPage = Loadable(lazy(() => import('views/Catalog/Suppliers/Create')));
const EditSupplierPage = Loadable(lazy(() => import('views/Catalog/Suppliers/Edit')));

// ========= FACETS =========
const FacetsMainPage = Loadable(lazy(() => import('views/Catalog/Facets/Main')));

// ========= CATEGORIES =========
const CategoriesMainPage = Loadable(lazy(() => import('views/Catalog/Categories/Main')));

// ========= MASSIVE LOAD =========
const MassiveLoadPage = Loadable(lazy(() => import('views/Catalog/MassiveLoad')));

// ========= CHANGE LOG =========
const ChangeLogPage = Loadable(lazy(() => import('views/Reports/ChangeLog')));
const TestAdditionalFields = Loadable(lazy(() => import('views/Catalog/TestAdditionalFields')));

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
            element: <ProfilesMainPage />
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
        },
        //  ======== HEALTH CONTENT =========
        {
            path: '/health-content/overall-score',
            element: <FirstLevel />
        },
        {
            path: '/health-content/overall-score/products',
            element: <Products />
        },
        {
            path: '/health-content/overall-score/images',
            element: <Images />
        },
        {
            path: '/health-content/overall-score/facets',
            element: <Facets />
        },
        // ========= MASSIVE  LOAD =========
        {
            path: '/massive_load',
            element: <MassiveLoadPage />
        },
        // ========= REPORTS - CHANGE LOG =========
        {
            path: '/change_log',
            element: <ChangeLogPage />
        },
        // TEST ADDITIONAL FIELDS UI
        {
            path: '/test-page',
            element: <TestAdditionalFields />
        }
    ]
};

export default MainRoutes;
