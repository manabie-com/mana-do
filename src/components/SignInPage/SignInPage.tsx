import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useHistory } from "react-router-dom";
import Service from "../../service";

const SignInPage = () => {
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });
  const history = useHistory();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await Service.signIn(form.userId, form.password);

    localStorage.setItem("token", resp);
    history.push("/todo");
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={styles.content}>
      <form onSubmit={signIn} className={styles.content__form}>
        <label htmlFor="user_id" className={styles.content__label}>Username</label>
        <input
          id="user_id"
          name="userId"
          value={form.userId}
          onChange={onChangeField}
          className={styles.content__input}
        />
        <label htmlFor="password" className={styles.content__label}>Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={onChangeField}
          className={styles.content__input}
        />
        <button type="submit" className={styles.content__button}>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
