import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuthContext } from "../../modules/auth/AuthContext";

const withPrivate = (WrappedComponent: any) => {
  const Authorize = (props: any) => {
    const {
      state: { isAuthenticated },
    } = useAuthContext();
    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    }
    return <Redirect to={'/'} />;
  };

  return Authorize;
}

export default withPrivate;