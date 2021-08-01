import React from "react";
import { Redirect } from "react-router-dom";
import { RoutePath } from "../../configs/paths";
import { useAuthContext } from "../../modules/auth/AuthContext";

interface IAuthorizeProps {
  isAuthenticated?: boolean;
}

const getHomePath = () => RoutePath.todo;
function withPublicPage<P>(
  WrappedComponent: React.ComponentType<P & IAuthorizeProps>
) {
  const Authorize: React.FC<P> = (props) => {
    const { state } = useAuthContext();
    const { isAuthenticated } = state;
    if (isAuthenticated) {
      return <Redirect to={getHomePath()} />;
    }
    return <WrappedComponent {...props} />;
  };

  return Authorize;
}

export default withPublicPage;
