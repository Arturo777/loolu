import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ProductList from 'views/Products';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const UsersList = Loadable(lazy(() => import('views/Users')));

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
        }
    ]
};

export default MainRoutes;
