import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/todo");
    }
  }, [history]);

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={signIn}>
          <input
            id="user_id"
            name="userId"
            value={form.userId}
            style={{ marginTop: 12 }}
            onChange={onChangeField}
            placeholder="Username"
            type="text"
            aria-label="username"
          />
          <input
            id="password"
            name="password"
            type="password"
            style={{ marginTop: 12 }}
            value={form.password}
            onChange={onChangeField}
            placeholder="Password"
            aria-label="password"
          />
          <button type="submit" style={{ marginTop: 12 }}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
