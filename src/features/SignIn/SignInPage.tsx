import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import Service from "../../service";
import "./styles.css";

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
    <div className="login">
      <div className="login__form">
        <h1 className="login__form-text">Login</h1>
        <form onSubmit={signIn}>
          <label htmlFor="user_id">
            User Id
            <input
              id="user_id"
              name="userId"
              value={form.userId}
              onChange={onChangeField}
              placeholder="Type your user id"
            />
          </label>
          <br />
          <label htmlFor="password">
            Password
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={onChangeField}
              placeholder="Type your password"
            />
          </label>
          <div className="btn__submit">
            <button className="btn__submit-item" type="submit">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
