import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { updateTokenLocalStorage, getTokenLocalStorage } from "utils/storage";
import Service from "service";

import { Button, Input, Paper } from "components/commons";

import "./style.css";

const SignInPage = () => {
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });
  const history = useHistory();
  const token = getTokenLocalStorage();

  if (token) {
    history.push("/todo");
  }

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await Service.signIn(form.userId, form.password);
    updateTokenLocalStorage(resp);
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
    <div className="sign-in-page">
      <Paper className="form-login p30">
        <div className="text-center header">
          <img src="images/SignIn/logo.svg" alt="logo" />
        </div>

        <form onSubmit={signIn}>
          <div className="form-control">
            <label>Username</label>
            <Input
              id="user_id"
              name="userId"
              value={form.userId}
              onChange={onChangeField}
            />
          </div>

          <div className="form-control">
            <label>Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={onChangeField}
            />
          </div>

          <div className="text-right">
            <Button type="submit">Sign in</Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default SignInPage;
