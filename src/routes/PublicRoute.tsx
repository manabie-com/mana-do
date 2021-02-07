import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { getItemLocalStorage } from "../utils/localStorage.utils";

const PublicRoute: React.FC<any> = ({ component: Component, path, ...rest }) => {
  const valueToken = getItemLocalStorage("token", "");
  const location = useLocation();
  if (valueToken && location.pathname === "/") {
    return <Redirect to="/todo" />;
  }
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PublicRoute;
