import React from "react";
import { Redirect, Route } from "react-router-dom";
import { checkLogin } from "../utils/checkLogin";

//Check Login is true or false. If false, it can not access "/todo"

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        checkLogin() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
