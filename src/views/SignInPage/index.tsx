import React from "react";
import styles from "./SignInPage.module.css";

import LoginForm from "../../components/LoginForm";
import ManaDoContainer from "../../components/ManaDoContainer";

const SignInPage = () => {
  return (
    <ManaDoContainer className={styles.ManaDo__SignInPageContainer}>
      <div className={styles.ManaDo__LoginFormWrapper}>
        <h1 className={styles.ManaDo__LogoName}>Mana-do</h1>
        <LoginForm className="mt-1" />
      </div>
    </ManaDoContainer>
  );
};

export default SignInPage;
