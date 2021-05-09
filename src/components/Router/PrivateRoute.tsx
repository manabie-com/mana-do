import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoggedSelector } from 'store/modules/auth/selector';

const PrivateRoute = ({ component: Com, ...rest }) => {
  const isLogged = useSelector(isLoggedSelector);
  return (
    <Route
      {...rest}
      render={props => (isLogged ? <Com {...props} /> : <Redirect to='/' />)}
    />
  );
};

export default PrivateRoute;
