import React from "react";
import { Route } from "react-router-dom";
import { logout } from "../utils/logout";

export const PrivateRouter: React.FC<IRouter> = ({
  component: Component,
  layout: Layout,
  exact,
  path,
  header: Header,
}) => {
  const token = localStorage.getItem("token");

  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        if (!token) {
          logout();
        }

        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};
