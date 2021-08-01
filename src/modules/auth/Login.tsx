import React, { useState } from "react";
import { useAuthContext } from "./AuthContext";
import authAction from "./store/auth.action";
import "./styles.scss";

const ModuleLogin = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const {
    state: { errorMessage },
    dispatch,
  } = useAuthContext();

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
    <div className="Login__container">
      <div className="Login__form">
        <form onSubmit={handleLogin}>
          <input
            id="username"
            name="username"
            value={form.username}
            style={{ marginTop: 12 }}
            onChange={onChangeField}
            placeholder="User name"
          />
          <br />
          <input
            id="password"
            name="password"
            type="password"
            style={{ marginTop: 12 }}
            value={form.password}
            onChange={onChangeField}
            placeholder="Password"
          />
          <br />
          <button type="submit" style={{ marginTop: 12 }}>
            Login
          </button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        </form>
      </div>
    </div>
  );
};

export default ModuleLogin;
