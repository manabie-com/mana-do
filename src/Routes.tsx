import React from "react";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./auth/PrivateRoute";

const SignInPage = React.lazy(() => import("./pages/SignIn"));
const ToDoPage = React.lazy(() => import("./pages/Todo"));

export const Routes = () => {
  return (
    <Switch>
      <PrivateRoute path="/todo" exact>
        <ToDoPage />
      </PrivateRoute>
      <Route path="/login">
        <SignInPage />
      </Route>
    </Switch>
  );
};
