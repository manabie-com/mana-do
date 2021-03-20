import * as React from "react";
import { useHistory, useLocation } from "react-router";
import Loading from "../../components/Loading";
import { AUTH_TOKEN } from "../../constants";
import Service from "../../service";
import { setUser } from "../../store/actions/userActions";
import { UserContext } from "../../store/contexts/userContext";
import styles from "./LoginPendingPage.module.css";

export interface LoginPendingPageProps {}

const LoginPendingPage: React.FunctionComponent<LoginPendingPageProps> = () => {
  const [, dispatch] = React.useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const [message, setMessage] = React.useState("Checking...");

  React.useEffect(() => {
    const token = location.state as string;
    console.log(token);

    setTimeout(async () => {
      // Checking...
      if (token) {
        try {
          const user = await Service.getUser(token);
          setMessage("Welcome");
          setTimeout(() => {
            // Welcome
            localStorage.setItem(AUTH_TOKEN, token);
            dispatch(setUser(user));

            history.push("/todo");
          }, 2000);
        } catch (error) {
          setMessage("There is something wrong...");
          setTimeout(() => {
            // There is something wrong...
            history.push("/");
          }, 2000);
        }
      } else {
        setMessage("There is something wrong...");
        setTimeout(() => {
          history.push("/");
        }, 1000);
      }
    }, 1000);
  }, [dispatch, history, location.state]);

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
