import React from "react";
import { Redirect } from "react-router";
import { isAuthorized } from "../../helpers/authorize";

const RequireAuth = ({ children }: any) => {
  if (!isAuthorized()) {
    return <Redirect to="/" />;
  }

  return children;
};

export default RequireAuth;
