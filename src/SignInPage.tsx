import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import Service from "./service";

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
    <div className="Login__container">
      <div className="Login__content">
        <div className="Login__text">
          <h3>
            Login to <strong>Manabie</strong>
          </h3>
        </div>
        <form className="Login__form" onSubmit={signIn}>
          <label htmlFor="user_id">
            <p>User id</p>
            <input
              id="user_id"
              name="userId"
              value={form.userId}
              style={{ marginTop: 12 }}
              onChange={onChangeField}
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              id="password"
              name="password"
              type="password"
              style={{ marginTop: 12 }}
              value={form.password}
              onChange={onChangeField}
            />
          </label>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
