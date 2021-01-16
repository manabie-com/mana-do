import React from 'react';
import SignInPage from '../pages/SignIn';
import ToDoPage from '../pages/ToDo';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

interface CustomRoutes {
  path: string
  name: string
  component: React.FC
}

export const publicRoutes: CustomRoutes[] = [
  {
    path: '/',
    name: 'Login',
    component: SignInPage,
  },
];
export const privateRoutes: CustomRoutes[] = [
  {
    path: '/todo',
    name: 'Todo',
    component: ToDoPage
  },
]
export const AppRoutes = () => {
  return <React.Fragment>
    {publicRoutes.map((route) => (
      <PublicRoute
        key={route.name}
        exact={true}
        path={route.path}
        name={route.name}
        component={route.component}
      />
    ))}
    {privateRoutes.map((route) => (
      <PrivateRoute
        key={route.name}
        name={route.name}
        path={route.path}
        component={route.component}
      />
    ))}
  </React.Fragment>
}
