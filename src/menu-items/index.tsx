// project import
import catalogue from './catalogue';
import healthContent from './health-content';
import security from './security';

// types
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
    items: [security, catalogue, healthContent]
};

export default menuItems;
