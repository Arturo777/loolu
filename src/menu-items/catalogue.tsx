// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconPackage } from '@tabler/icons';

// constant
const icons = {
    IconPackage
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
        }
    ]
};

export default catalogue;
