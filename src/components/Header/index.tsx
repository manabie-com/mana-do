import * as React from "react";
import styles from "./Header.module.css";

export interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  return (
    <div className={styles.ManaDo__Header__Container}>
      <div className={styles.ManaDo__UserGreeting__Container}>
        <h4 className={styles.ManaDo__GreetUser__Label}>Hi, firstUser!</h4>
        <span className={styles.ManaDo__LogOut}>Log out</span>
      </div>
      <h1 className={styles.ManaDo__AskUser}>What's need to be done?</h1>
    </div>
  );
};

export default React.memo(Header);
