import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import withBackgroundColor from '../hoc/withBackgroundColor';
import localStorageUtils from '../utils/localStorage.utils';

export const PrivateRoute: React.FC<any> = ({ component, name, ...rest }) => {
  const token = localStorageUtils.getItem('token')

  if (token) {
    const enhancedComponent = withBackgroundColor(component, name);
    return <Route {...rest} component={enhancedComponent} />;
  } else {
    return <Redirect to='/' />;
  }
};
