// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconPackage, IconLayout, IconTruckDelivery, IconBoxPadding, IconTag } from '@tabler/icons';

// constant
const icons = {
    IconPackage,
    IconLayout,
    IconTruckDelivery,
    IconBoxPadding,
    IconTag
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const catalogue = {
    id: 'catalogue-roadmap',
    type: 'group',
    title: <FormattedMessage id="catalogue" />,
    children: [
        {
            id: 'products',
            title: <FormattedMessage id="products" />,
            type: 'item',
            url: '/products',
            icon: icons.IconPackage,
            external: false,
            breadcrumbs: false
        },
        {
            id: 'brands',
            title: <FormattedMessage id="brands" />,
            type: 'item',
            url: '/brands',
            icon: icons.IconLayout,
            external: false,
            breadcrumbs: false
        },
        {
            id: 'supplier',
            title: <FormattedMessage id="suppliers" />,
            type: 'item',
            url: '/suppliers',
            icon: icons.IconTruckDelivery,
            external: false,
            breadcrumbs: false
        },
        {
            id: 'facets',
            title: 'Facets',
            type: 'item',
            url: '/facets',
            icon: icons.IconBoxPadding,
            external: false,
            breadcrumbs: false
        },
        {
            id: 'categories',
            title: <FormattedMessage id="categories" />,
            type: 'item',
            url: '/categories',
            icon: icons.IconTag,
            external: false,
            breadcrumbs: false
        }
    ]
};

export default catalogue;
