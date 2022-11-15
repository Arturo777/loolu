// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrandChrome, IconHelp, IconSitemap, IconPackage, IconUsers, IconAffiliate } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome,
    IconHelp,
    IconSitemap,
    IconPackage,
    IconUsers,
    IconAffiliate
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const security = {
    id: 'security-group',
    type: 'group',
    title: <FormattedMessage id="security" />,
    children: [
        {
            id: 'users',
            title: <FormattedMessage id="users" />,
            type: 'item',
            url: '/users',
            icon: icons.IconUsers,
            external: false,
            breadcrumbs: false
        },
        {
            id: 'profiles',
            title: <FormattedMessage id="profiles" />,
            type: 'item',
            url: '/profiles',
            icon: icons.IconAffiliate,
            external: false,
            breadcrumbs: false
        }
    ]
};

export default security;
