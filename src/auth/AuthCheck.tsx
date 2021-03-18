import * as React from "react";
import { Switch } from "react-router";
import { AUTH_TOKEN } from "../constants";
import * as ManaDoRoute from "../router";
import Service from "../service";
import useLocalStorage from "../_hooks/useLocalStorage";
import { UserContext } from "../store/contexts/userContext";
import { setUser } from "../store/actions/userActions";

const SignInPage = React.lazy(() => import("../views/SignInPage"));
const ToDoPage = React.lazy(() => import("../views/TodoPage"));

export interface AuthCheckProps {}

const AuthCheck: React.FunctionComponent<AuthCheckProps> = () => {
  const [, dispatch] = React.useContext(UserContext);
  const [token] = useLocalStorage(AUTH_TOKEN);
  const [canLogin, setCanLoginState] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      if (token) {
        try {
          const user = await Service.getUser(token);
          dispatch(setUser(user));

          setCanLoginState(true);
        } catch (error) {
          setCanLoginState(false);
        }
      }
    })();
  }, [dispatch, token]);

  return (
    <React.Suspense fallback={<h1>Loading</h1>}>
      <Switch>
        <ManaDoRoute.ConditionalRoute
          path="/"
          condition={canLogin}
          to="/todo"
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
