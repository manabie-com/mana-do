import React from "react";

import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/authen";
import { ROUTES } from "../utils/constants";

interface Props {
  children: JSX.Element;
  [rest: string]: any;
}
const PrivateRoute = ({ children, ...rest }: Props) => {
  return isAuthenticated() ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: ROUTES.SIGN_IN,
      }}
    />
  );
};

export default PrivateRoute;
