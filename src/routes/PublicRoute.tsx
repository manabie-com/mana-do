import React, { ReactElement } from 'react';
import { Redirect, Route } from 'react-router-dom';
import localStorageUtils from '../utils/localStorage.utils';

export const PublicRoute = (props: any): ReactElement => {
  const token = localStorageUtils.getItem('token');
  if (!token) {
    return <Route {...props} />;
  } else {
    return <Redirect to='/todo' />;
  }
};
