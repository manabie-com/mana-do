import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import Service from "../../service";

import { Button, Input } from "../../components";

const SignInPage = () => {
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await Service.signIn(form.userId, form.password);

      localStorage.setItem("token", resp);
      history.push("/");
    } catch (error) {
      setErrorMessage(error);
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
    <div className="content-container">
      <h1 data-testid="header">Sign In</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <form onSubmit={signIn}>
        <Input
          variant="text"
          name="userId"
          label="UserId"
          placeholder="Enter your user id"
          valueExternal={form.userId}
          style={{ marginTop: 12 }}
          onChange={onChangeField}
        />
        <Input
          variant="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          valueExternal={form.password}
          style={{ marginTop: 12 }}
          onChange={onChangeField}
        />
        <hr />
        <Button
          type="submit"
          testId="btnSignin"
          classNames="btn__primary"
          disabled={!form.userId || !form.password}
          text="Sign in"
        />
      </form>
    </div>
  );
};

export default SignInPage;
