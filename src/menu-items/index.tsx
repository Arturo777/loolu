// project import
import catalogue from './catalogue';
import security from './security';

// types
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
    items: [security, catalogue]
};

export default menuItems;
