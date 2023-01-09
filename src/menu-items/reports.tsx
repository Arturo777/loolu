// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconReportAnalytics } from '@tabler/icons';

// constant
const icons = {
    IconReportAnalytics
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const reports = {
    id: 'reports-roadmap',
    type: 'group',
    title: <FormattedMessage id="reports" />,
    children: [
        {
            id: 'change_log',
            title: <FormattedMessage id="change_log" />,
            type: 'item',
            url: '/change_log',
            icon: icons.IconReportAnalytics,
            external: false,
            breadcrumbs: false
        }
    ]
};

export default reports;
