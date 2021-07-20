import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './utils/authen';
import {ROUTES} from './utils/constants';

interface Props {
  children: React.ReactNode;
  [rest: string]: any;
}
const PrivateRoute = ({children, ...rest}: Props) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.SIGN_IN,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
