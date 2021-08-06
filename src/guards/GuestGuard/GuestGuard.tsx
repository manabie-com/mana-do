import React from 'react'
import { Redirect, Route } from 'react-router-dom';

// types
import { IRouteAuth } from '../../models/auth';

const GuestGuard = ({ component: Component, isAuthenticated = false, ...rest }: IRouteAuth) => {

  if (isAuthenticated) return <Redirect to='/todo' />

  return <Route {...rest} component={Component} />;
};

export default GuestGuard;