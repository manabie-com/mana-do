import React from "react";
import { Route } from "react-router-dom";

export const PublicRouter: React.FC<IRouter> = ({
  component: Component,
  layout: Layout,
  exact,
  path,
  header: Header,
}) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};
