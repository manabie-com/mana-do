import React from "react";
import { Route, RouteProps, useHistory } from "react-router-dom";
import { userConfig } from "../../config/user";

interface PrivateRouteProps extends Omit<RouteProps, "component"> {
  component: React.ElementType;
}

const ProtectedRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const history = useHistory();
  const token = localStorage.getItem("token");

  // auth basic
  // not match token, redirect login page
  if (!token || token !== userConfig.mockToken) {
    history.push(userConfig.loginPath);
  }

  // auth success
  return (
    <Route
      {...rest}
      render={(routeProps) => <Component {...routeProps} {...rest} />}
    />
  );
};

export default ProtectedRoute;
