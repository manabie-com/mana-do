import * as React from "react";
import { useHistory, useLocation } from "react-router";
import { AUTH_TOKEN } from "../constants";
import Service from "../service";
import { setUser } from "../store/actions/userActions";
import { UserContext } from "../store/contexts/userContext";

interface IRouteState {
  userId: string;
  password: string;
}

export interface LoginPendingPageProps {}

const LoginPendingPage: React.FunctionComponent<LoginPendingPageProps> = () => {
  const [, dispatch] = React.useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const [message, setMessage] = React.useState("Checking...");

  React.useEffect(() => {
    const routeState = location.state as IRouteState;
    setTimeout(() => {
      if (routeState && routeState.userId && routeState.password) {
        (async () => {
          try {
            const token = await Service.signIn(
              routeState.userId,
              routeState.password
            );
            const user = await Service.getUser(token);
            setMessage("Welcome...");
            setTimeout(() => {
              localStorage.setItem(AUTH_TOKEN, token);
              dispatch(setUser(user));

              history.push("/todo");
            }, 3000);
          } catch (error) {
            setMessage("There is something wrong...");
            setTimeout(() => {
              history.push("/");
            }, 3000);
          }
        })();
      }
    }, 3000);
  }, [dispatch, history, location.state]);

  return <div>{message}</div>;
};

export default LoginPendingPage;
