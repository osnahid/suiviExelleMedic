import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Les clients',
    icon: 'people-outline',
    link: '/pages/clients'
  },
  {
    title: 'Actions',
    icon: 'activity-outline',
    children: [
      {
        title: 'Les installations',
        link: '/pages/actions/installations',
      },
      {
        title: 'Les maintenances',
        link: '/pages/actions/maintenances',
      },
      {
        title: 'Les interventions',
        link: '/pages/actions/interventions',
      },
    ],
  },
  {
    title: 'Les subscriptions',
    icon: 'flip-2-outline',
    link: '/pages/subscriptions'
  },
  {
    title: 'Paramètres',
    icon: 'settings-outline',
    children: [
      {
        title: 'mon compte',
        link: '/pages/settings/myAccount',
      },
      {
        title: 'comptes',
        link: '/pages/settings/accounts',
      },
      {
        title: 'Les partenaires',
        link: '/pages/settings/partners',
      },
      {
        title: 'Les Produits',
        link: '/pages/settings/materials',
      },
      {
        title: 'Les Softwares',
        link: '/pages/settings/softwares',
      },
    ],
  },
  {
    title: 'Logout',
    icon: 'unlock-outline',
    link: '/auth/logout',
  },
];
