import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import localStorageUtils from '../utils/localStorage.utils';

export const PrivateRoute: React.FC<any> = ({ component, name, tab, ...rest }) => {
  const token = localStorageUtils.getItem('token')

  if (token) {
    return <Route {...rest} component={component} />;
  } else {
    return <Redirect to='/' />;
  }
};
