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

const healthContent = {
    id: 'health-content',
    type: 'group',
    title: <FormattedMessage id="health-content" />,
    children: [
        {
            id: 'overall-score',
            title: <FormattedMessage id="status-market" />,
            type: 'item',
            url: '/health-content/overall-score',
            icon: icons.IconUsers,
            external: false,
            breadcrumbs: false
        }
    ]
};

export default healthContent;
