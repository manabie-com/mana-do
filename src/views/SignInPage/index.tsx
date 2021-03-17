import React from "react";
import styles from "./SignInPage.module.css";

import LoginForm from "../../components/LoginForm";
import ManaDoContainer from "../../components/ManaDoContainer";

const SignInPage = () => {
  return (
    // <div style={{ marginTop: "3rem", textAlign: "left" }}>
    //   <form onSubmit={signIn}>
    //     <label htmlFor="user_id">
    //       User id
    //       <input
    //         id="user_id"
    //         name="userId"
    //         value={form.userId}
    //         style={{ marginTop: 12 }}
    //         onChange={onChangeField}
    //       />
    //     </label>
    //     <br />
    //     <label htmlFor="password">
    //       Password
    //       <input
    //         id="password"
    //         name="password"
    //         type="password"
    //         style={{ marginTop: 12 }}
    //         value={form.password}
    //         onChange={onChangeField}
    //       />
    //     </label>
    //     <br />
    //     <button type="submit" style={{ marginTop: 12 }}>
    //       Sign in
    //     </button>
    //   </form>
    // </div>
    <ManaDoContainer className={styles.ManaDo__SignInPageContainer}>
      <div className={styles.ManaDo__LoginFormWrapper}>
        <h1 className={styles.ManaDo__LogoName}>Mana-do</h1>
        <LoginForm className="mt-1" />
      </div>
    </ManaDoContainer>
  );
};

export default SignInPage;
