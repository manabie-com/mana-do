import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

const PrivateRoute = (props: RouteProps) => {
  const isLogin = Boolean(localStorage.getItem("token"));

  if (!isLogin) return <Redirect to="/login" />;

  return <Route {...props} />;
};

export default PrivateRoute;
