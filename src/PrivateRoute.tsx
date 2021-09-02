import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const condition = localStorage.getItem("token");

  return (
    <Route
        {...props}
        render={(props) => {
            return condition ? (
                <Route {...props} />
            ) : (
                <Redirect
                    to="/"
                />
            );
        }}
    />
  )
};
export default PrivateRoute;
