import * as React from "react";

import styles from "./LoginPendingPage.module.css";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../store/contexts/userContext";
import { setUser } from "../../store/actions/userActions";
import { AUTH_TOKEN } from "../../constants";
import Service from "../../service";

import Loading from "../../components/Loading";

export interface LoginPendingPageProps {}

// This component will be the bridge of login authorization
// returns a loading view as user will be waiting.
// SetTimeout functions for kinda-real API call experience
const LoginPendingPage: React.FunctionComponent<LoginPendingPageProps> = () => {
  const history = useHistory();
  const location = useLocation();
  const [, dispatch] = React.useContext(UserContext);
  const [message, setMessage] = React.useState("Checking");

  const errorHandler = React.useCallback(
    (error?) => {
      setMessage("There is something wrong...");
      setTimeout(() => {
        history.push(
          "/",
          error || "There is something wrong with the server..."
        );
      }, 1000);
    },
    [history]
  );

  React.useEffect(() => {
    const token = (location.state as string) || "";
    // Check route param
    if (token) {
      (async () => {
        try {
          const user = await Service.getUser(token);
          // Wait for user fetch by token
          setTimeout(async () => {
            if (user) {
              // Display "Welcome" message as user is authorized
              setMessage("Welcome");
              localStorage.setItem(AUTH_TOKEN, token);
              dispatch(setUser(user));
              // Wait 1.5s for "adventure experience"?
              setTimeout(() => {
                // Then redirect user to TodoPage
                history.push("/todo");
              }, 2000);
            } else {
              // User is not authorized/ user not found,...
              errorHandler();
            }
          }, 1000);
        } catch (error) {
          // API error catch then redirect user to login page
          errorHandler(error);
        }
      })();
    } else {
      // Token is not valid
      errorHandler();
    }
  }, [dispatch, errorHandler, history, location.state]);

  return (
    <div className={styles.ManaDo__LoginPendingPage}>
      <div className={styles.ManaDo__LoadingWrapper}>
        <Loading size="md" variant="primary" />
        <span className={styles.ManaDo__LoadingLabel}>{message}</span>
      </div>
    </div>
  );
};

export default LoginPendingPage;
