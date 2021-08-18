import React, { useState } from "react";
import "./SignInPage.css";
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
    <div
      style={{ marginTop: "3rem", textAlign: "left" }}
      className="Signin__form"
    >
      <h2>Welcome</h2>
      <form onSubmit={signIn}>
        <div className="Input__group">
          <input
            id="user_id"
            name="userId"
            value={form.userId}
            style={{ marginTop: 12 }}
            onChange={onChangeField}
            required
          />

          <label htmlFor="user_id" id="user_id">
            User id
          </label>
        </div>
        <div className="Input__group">
          <input
            id="password"
            name="password"
            type="password"
            style={{ marginTop: 12 }}
            value={form.password}
            onChange={onChangeField}
            required
          />
          <label htmlFor="password" id="password">
            Password
          </label>
        </div>
        <button type="submit" style={{ marginTop: 12 }}>
          Sign in
        </button>
        <p>
          Don't have account?
          <span>
            <a> Signup</a>
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignInPage;
