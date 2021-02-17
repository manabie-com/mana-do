import React, { Dispatch, FC } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SignInPage from "../containers/SignInPage";
import ToDoPage from "../containers/ToDoPage";

interface Props {
  dispatch: Dispatch<any>;
}

const PublicRoutes: FC<Props> = ({ dispatch }) => (
  <Switch>
    <Route
      path="/"
      exact
      component={(props: any) => <SignInPage dispatch={dispatch} {...props} />}
    />
    <Redirect to="/" />
  </Switch>
);

const AuthRouters: FC = () => (
  <Switch>
    <Route path="/todo" component={ToDoPage} />
    <Redirect to="/todo" />
  </Switch>
);

export { PublicRoutes, AuthRouters };
