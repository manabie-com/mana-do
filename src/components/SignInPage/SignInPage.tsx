import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import Service from "../../service";
import styles from "./styles.module.css";

const SignInPage = () => {
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });
  const [loginFail, setLoginFail] = useState(false)
  const history = useHistory();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await Service.signIn(form.userId, form.password);
  
      localStorage.setItem("token", resp);
      history.push("/todo");
    } catch (err) {
      setLoginFail(true)
    }
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.wrapContent}`}>
        <h1 className={styles.title}>Welcome</h1>
        <form onSubmit={signIn}>
          <div className={styles.wrapInput}>
            <input
              className={`${styles.inputField} ${form.userId !== "" && styles.hasVal}`}
              id="user_id"
              name="userId"
              value={form.userId}
              onChange={onChangeField}
            />
            <span className={styles.focusInputField} placeholder="User ID"></span>
          </div>
          <div className={styles.wrapInput}>
            <input
              className={`${styles.inputField} ${form.password !== "" && styles.hasVal}`}
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={onChangeField}
            />
            <span
              className={styles.focusInputField}
              placeholder="Password"
            ></span>
          </div>
          {loginFail && (<p style={{color: 'red'}}>Wrong User ID or Password <br/> Please try again !!!</p>)}
          <button className={styles.signinBtn} type="submit" style={{ marginTop: 12 }}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
