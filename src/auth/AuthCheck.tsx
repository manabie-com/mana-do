import * as React from "react";
import { Switch } from "react-router";
import { AUTH_TOKEN } from "../constants";
import * as ManaDoRoute from "../router";
import useLocalStorage from "../_hooks/useLocalStorage";

const SignInPage = React.lazy(() => import("../views/SignInPage"));
const ToDoPage = React.lazy(() => import("../views/ToDoPage"));

export interface AuthCheckProps {}

const AuthCheck: React.FunctionComponent<AuthCheckProps> = () => {
  const [token] = useLocalStorage(AUTH_TOKEN);

  return (
    <React.Suspense fallback={<h1>Loading</h1>}>
      <Switch>
        <ManaDoRoute.ConditionalRoute
          condition={!!token}
          to="/todo"
          path="/"
          exact
        >
          <SignInPage />
        </ManaDoRoute.ConditionalRoute>
        <ManaDoRoute.PrivateRoute path="/todo">
          <ToDoPage />
        </ManaDoRoute.PrivateRoute>
      </Switch>
    </React.Suspense>
  );
};

export default AuthCheck;
