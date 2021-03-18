import * as React from "react";
import { useHistory } from "react-router";
import { AUTH_TOKEN } from "../../constants";
import { UserContext } from "../../store/contexts/userContext";
import useLocalStorage from "../../_hooks/useLocalStorage";
import styles from "./Header.module.css";

export interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  const [{ username }] = React.useContext(UserContext);
  const [token, setToken] = useLocalStorage(AUTH_TOKEN);
  const history = useHistory();

  const handleLogOut = React.useCallback(() => {
    setToken("");
  }, [setToken]);

  React.useEffect(() => {
    if (!token) {
      history.push("/");
    }
  }, [history, token]);

  return (
    <div className={styles.ManaDo__Header__Container}>
      <div className={styles.ManaDo__UserGreeting__Container}>
        <h4 className={styles.ManaDo__GreetUser__Label}>Hi, {username}!</h4>
        <span className={styles.ManaDo__LogOut} onClick={handleLogOut}>
          Log out
        </span>
      </div>
      <h1 className={styles.ManaDo__AskUser}>What's need to be done?</h1>
    </div>
  );
};

export default React.memo(Header);
