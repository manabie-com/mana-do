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
    loadComponent: lazy(() => import('pages/SignInPage')),
  },
  {
    path: '/todo',
    loadComponent: lazy(() => import('pages/ToDoPage')),
  },
];

export default routes;
