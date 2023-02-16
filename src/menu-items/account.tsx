// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconSitemap, IconUsers } from '@tabler/icons';

// constant
const icons = {
    IconSitemap,
    IconUsers
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const security = {
    id: 'security-group',
    type: 'group',
    title: <FormattedMessage id="account" />,
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
            icon: icons.IconSitemap,
            external: false,
            breadcrumbs: false
        }
    ]
};

export default security;
