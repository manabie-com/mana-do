import React, { useState } from "react";
import { useAuthContext } from "./AuthContext";
import authAction from "./store/auth.action";

const ModuleLogin = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const {state: { errorMessage }, dispatch} = useAuthContext();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(authAction.loginRequest({ username, password }));
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div style={{ marginTop: "3rem", textAlign: "left" }}>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">
            User name
            <input
              id="username"
              name="username"
              value={form.username}
              style={{ marginTop: 12 }}
              onChange={onChangeField}
            />
          </label>
          <br />
          <label htmlFor="password">
            Password
            <input
              id="password"
              name="password"
              type="password"
              style={{ marginTop: 12 }}
              value={form.password}
              onChange={onChangeField}
            />
          </label>
          <br />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button type="submit" style={{ marginTop: 12 }}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default ModuleLogin;
