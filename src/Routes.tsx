import React from "react";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./auth/PrivateRoute";

const SignInPage = React.lazy(() => import("./pages/SignInPage"));
const ToDoPage = React.lazy(() => import("./pages/ToDoPage"));

export const Routes = () => {
  return (
    <Switch>
      <PrivateRoute path="/" exact>
        <ToDoPage />
      </PrivateRoute>
      <Route path="/login">
        <SignInPage />
      </Route>
    </Switch>
  );
};
