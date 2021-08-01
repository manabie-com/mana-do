import React from "react";
// import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { RoutePath } from "../../configs/paths";
import { useAuthContext } from "../../modules/auth/AuthContext";

interface IAuthorizeProps {
  isAuthenticated?: boolean;
  userRole?: string;
}

function withPrivatePage<P>(
  WrappedComponent: React.ComponentType<P & IAuthorizeProps>
) {
  const Authorize: React.FC<P> = (props) => {
    const {
      state: { isAuthenticated },
    } = useAuthContext();
    if (isAuthenticated) {
      return <WrappedComponent isAuthenticated={isAuthenticated} {...props} />;
    }
    return <Redirect to={RoutePath.login} />;
  };

  return Authorize;
}

export default withPrivatePage;
