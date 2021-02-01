import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  ...rest
}: {
  component: any;
  path: string;
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return localStorage.getItem('token') ? (
          // return true ?
          <Component {...props} />
        ) : (
          <Redirect to='/' />
        );
      }}
    />
  );
};

export default PrivateRoute;
