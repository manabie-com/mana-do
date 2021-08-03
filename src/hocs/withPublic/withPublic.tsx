import React from "react";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "../../modules/auth/AuthContext";

const withPublic = (WrappedComponent: any) => {
  const Authorize = (props: any) => {
    const { state } = useAuthContext();
    const { isAuthenticated } = state;
    if (isAuthenticated) {
      return <Redirect to={'/todo'} />;
    }
    return <WrappedComponent {...props} />;
  };

  return Authorize;
}

export default withPublic;