// project import
import catalogue from './catalogue';
import healthContent from './health-content';
import account from './account';
import reports from './reports';

// types
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
    items: [healthContent, catalogue, reports, account]
};

export default menuItems;
