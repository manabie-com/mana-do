import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoggedSelector } from 'store/modules/auth/selector';

const PublicRoute = ({ component: Com, ...rest }) => {
  const isLogged = useSelector(isLoggedSelector);
  return (
    <Route
      {...rest}
      render={props =>
        isLogged ? <Redirect to='/todo' /> : <Com {...props} />
      }
    />
  );
};

export default PublicRoute;
