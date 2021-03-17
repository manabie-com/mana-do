import * as React from "react";
import { RouteProps } from "react-router";
import { AUTH_TOKEN } from "../../constants";
import useLocalStorage from "../../_hooks/useLocalStorage";
import ConditionalRoute from "./ConditionalRoute";

const PrivateRoute: React.FunctionComponent<RouteProps> = ({ ...props }) => {
  const [token] = useLocalStorage(AUTH_TOKEN);

  const condition = token ? true : false;

  return <ConditionalRoute condition={condition} to="/todo" {...props} />;
};

export default PrivateRoute;
