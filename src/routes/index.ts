import { RouteComponentProps } from 'react-router-dom';
import { ComponentType, lazy } from 'react';

type RouteType = {
  path: string;
  loadComponent: ComponentType<RouteComponentProps>;
  exact?: boolean;
  isPrivate?: boolean;
};

const routes: RouteType[] = [
  {
    path: '/',
    loadComponent: lazy(() => import('pages/signin')),
  },
  {
    path: '/todo',
    loadComponent: lazy(() => import('pages/todo')),
  },
];

export default routes;
