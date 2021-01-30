import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getItemLocalStorage } from "../../utils/localStorage.utils";

const PublicComponent: React.FC<any> = ({
  component: Component,
  path,
  ...rest
}) => {
  const valueToken = getItemLocalStorage("token");
  if (valueToken) {
    return <Redirect to="/todo" />;
  }
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PublicComponent;
