import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { getTokenLocalStorage } from "utils/storage";

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const token = getTokenLocalStorage();
  if (!token) {
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};
export default PrivateRoute;
