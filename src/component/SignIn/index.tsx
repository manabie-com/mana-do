import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Service from "service";

const LoginForm = () => {
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });
  const history = useHistory();
  const [error, setError] = useState({
    msg: "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await Service.signIn(form.userId, form.password);
      localStorage.setItem("token", resp);
      history.push("/todo");
      setError({ msg: "" });
    } catch (error) {
      setError({
        msg: "Incorrect Username/Password",
      });
    }
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError({ msg: "" });
  };

  return (
    <div className="login">
      <h1 className="login__heading">Log In to ToDo</h1>

      <form
        onSubmit={onSubmit}
        className="login__form"
        data-testid="login-form"
      >
        <label htmlFor="user_id" className="login__form-control">
          <span>User id</span>
          <input
            id="user_id"
            name="userId"
            value={form.userId}
            onChange={onChangeField}
            data-testid="userId"
          />
        </label>
        <br />
        <label htmlFor="password" className="login__form-control">
          <span>Password</span>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={onChangeField}
          />
        </label>
        <br />
        <button className="login__button" type="submit" data-testid="submit">
          Sign in
        </button>
      </form>
      {error.msg && (
        <p data-testid="error-msg" className="login__error-msg">
          {error.msg}
        </p>
      )}
    </div>
  );
};

export default LoginForm;
