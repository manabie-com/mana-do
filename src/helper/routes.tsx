import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface IIsUserRedirect extends RouteProps {
  user: string;
  loggedInPath: string;
  children: React.ReactNode;
}
export const IsUserRedirect: React.FC<IIsUserRedirect> = ({
  user,
  loggedInPath,
  children,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (!user) return children;
        return <Redirect to={{ pathname: loggedInPath }} />;
      }}
    />
  );
};

interface IProtecedRoute extends RouteProps {
  user: string;
  children: React.ReactNode;
}
export const ProtectedRoute: React.FC<IProtecedRoute> = ({
  user,
  children,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (user) return children;
        return <Redirect to={{ pathname: "/" }} />;
      }}
    />
  );
};
