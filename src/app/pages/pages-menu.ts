import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/management/dash-board',
  },
  {
    title: 'Managment',
    group: true,
  },
  {
    title: 'Service Types',
    icon: 'activity-outline',
    link: '/pages/management/therpay-type',
  },
  {
    title: 'Service Providers',
    icon: 'people-outline',
    link: '/pages/management/service-provider',
  },
  {
    title: 'Customers',
    icon: 'people-outline',
    link: '/pages/management/customer',
  },
  {
    title: 'License Types',
    icon: 'file-outline',
    link: '/pages/management/license-type',
  },
  {
    title: 'Complaints',
    icon: 'alert-circle-outline',
    link: '/pages/management/complaints',
  },
  {
    title: 'Withdrawal Requests',
    icon: 'arrow-up-outline',
    link: '/pages/management/withdrawal-request',
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/pages/management/settings',
  },
  {
    title: 'Orders',
    icon: 'shopping-cart-outline',
    link: '/pages/management/orders',
  },
];
