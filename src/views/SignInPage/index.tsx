import React from "react";

import styles from "./SignInPage.module.css";

import { ReactComponent as BackgroundParticles } from "../../svgs/background.svg";
import LoginForm from "../../components/LoginForm";

const SignInPage = () => {
  React.useEffect(() => {
    document.title = "Login | ManaDo"
  }, []);

  return (
    <>
      <div className={styles.ManaDo__SignInPageContainer}>
        <BackgroundParticles className={styles.ManaDo__BackgroundParticles} />
        <div
          className={`${styles.ManaDo__AnimateWave} ${styles.WaveSize}`}
        />
        <LoginForm className={styles.ManaDo__SignInForm} />
      </div>
    </>
  );
};

export default SignInPage;
