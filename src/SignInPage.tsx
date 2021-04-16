import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import Service from "./service";
import "./scss/SignIn.scss";
import SubmitButton from "./components/SubmitButton";

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
    <div className="signIn">
      <h1 className="title">Welcome to TODOS</h1>
      <form onSubmit={signIn}>
        <div className="grid">
          <label htmlFor="user_id" className="labelSignIn">
            User id:
          </label>
          <input
            id="user_id"
            name="userId"
            value={form.userId}
            onChange={onChangeField}
          />
        </div>
        <br />
        <div className="grid">
          <label htmlFor="password" className="labelSignIn">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={onChangeField}
          />
        </div>
        <br />
        <div className="btnSignIn">
          <SubmitButton>Sign In</SubmitButton>
        </div>
        {/* <button type="submit" style={{ marginTop: 12 }}>
          Sign in
        </button> */}
      </form>
    </div>
  );
};

export default SignInPage;
