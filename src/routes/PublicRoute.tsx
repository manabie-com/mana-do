import React from "react";
import { Redirect, Route } from "react-router-dom";
import withPageName from "../hoc/withPageName";
import localStorageUtils from "../utils/localStorage.utils";

export const PublicRoute: React.FC<any> = ({ component, name, ...rest }) => {
  const token = localStorageUtils.getItem("token");
  if (!token) {
    const enhancedComponent = withPageName(component, name);
    return <Route component={enhancedComponent} {...rest} />;
  } else {
    return <Redirect to="/todo" />;
  }
};
