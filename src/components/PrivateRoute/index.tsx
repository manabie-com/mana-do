import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import useAuth from '../../hook/auth';

function PrivateRoute({ ...routeProps }: RouteProps) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route {...routeProps} />
  ) : (
    <Redirect to={'/sign-in'} />
  );
}

export default PrivateRoute;
