import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const PrivateRoutes: React.FC<RouteProps> = ({ children, ...rest }) => {
  const isAuth = localStorage.getItem('token'); //
  return (
    <Route
      {...rest}
      render={(innerProps) => {
        return isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: innerProps.location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoutes;
