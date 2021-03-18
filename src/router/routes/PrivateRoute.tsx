import * as React from "react";
import { RouteProps } from "react-router";
import { AUTH_TOKEN } from "../../constants";
import ConditionalRoute from "./ConditionalRoute";

interface PrivateRouteProps extends RouteProps {}

const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({
  children,
  ...props
}) => {
  const [isAuthenticated, setAuthenticatedState] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN) || null;
    console.log(token);

    setAuthenticatedState(!!token);
  }, []);

  return (
    <ConditionalRoute
      condition={isAuthenticated}
      redirect="/"
      {...props}
      children={children}
    ></ConditionalRoute>
  );
};

export default PrivateRoute;
