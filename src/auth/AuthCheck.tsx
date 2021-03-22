import * as React from "react";

import { Route, Switch, useHistory } from "react-router";
import { UserContext } from "../store/contexts/userContext";
import { setUser } from "../store/actions/userActions";
import { AUTH_TOKEN } from "../constants";
import Service from "../service";

import LoadingPage from "../views/LoadingPage";
import LoginPendingPage from "./LoginPendingPage";

const SignInPage = React.lazy(() => import("../views/SignInPage"));
const ToDoPage = React.lazy(() => import("../views/TodoPage"));

export interface AuthCheckProps {}

// This "Route dispatch" component will check for pre-existed token
// then redirect user to /todo if any otherwise redirect to login page
const AuthCheck: React.FunctionComponent<AuthCheckProps> = () => {
  const history = useHistory();
  const [, dispatch] = React.useContext(UserContext);

  React.useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN) || null;
    if (token) {
      (async () => {
        try {
          const user = await Service.getUser(token);
          dispatch(setUser(user));
          history.push("/todo");
        } catch (error) {
          history.push("/");
        }
      })();
    } else history.push("/");
  }, [dispatch, history]);

  return (
    <React.Suspense fallback={<LoadingPage />}>
      <Switch>
        <Route path="/" exact>
          <SignInPage />
        </Route>
        <Route path="/todo">
          <ToDoPage />
        </Route>
        <Route path="/auth">
          <LoginPendingPage />
        </Route>
      </Switch>
    </React.Suspense>
  );
};

export default AuthCheck;
