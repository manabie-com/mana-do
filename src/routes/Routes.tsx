import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthenticatedRoutes } from './AuthenticatedRoutes';

const LazySignInPage = React.lazy(() => import('../pages/SignInPage'));
const LazyTodoPage = React.lazy(() => import('../pages/TodoPage'));

export const RoutePath = {
  signIn: '/sign-in',
  todo: '/todo',
};

export const Routes = () => {
  return (
    <>
      <Route path={RoutePath.signIn} exact component={LazySignInPage} />

      <AuthenticatedRoutes>
        <Route path={RoutePath.todo} component={LazyTodoPage} />
      </AuthenticatedRoutes>

      <Redirect to={RoutePath.todo} />
    </>
  );
};
