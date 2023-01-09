// project import
import catalogue from './catalogue';
import healthContent from './health-content';
import security from './security';
import reports from './reports';

// types
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
    items: [security, catalogue, reports, healthContent]
};

export default menuItems;
