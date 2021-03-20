import React from "react";
import styles from "./SignInPage.module.css";

import LoginForm from "../../components/LoginForm";
import ManaDoContainer from "../../components/ManaDoContainer";

const SignInPage = () => {
  return (
    <ManaDoContainer className={styles.ManaDo__SignInPageContainer}>
      <LoginForm className="mt-1" />
    </ManaDoContainer>
  );
};

export default SignInPage;
