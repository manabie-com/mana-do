import React, { useState } from "react";
import "./styles.scss";
import { useHistory } from "react-router-dom";
import Service from "../../service";

const SignInPage = () => {
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const history = useHistory();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await Service.signIn(form.userId, form.password);

      localStorage.setItem("token", resp);
      history.push("/todo");
    } catch (error) {
      console.log(error);
      setError(error);
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
    <div className="content">
      <form onSubmit={signIn} className="content__form">
        <label htmlFor="user_id" className="content__label">
          Username
        </label>
        <input
          id="user_id"
          name="userId"
          value={form.userId}
          onChange={onChangeField}
          className="content__input"
        />
        <label htmlFor="password" className="content__label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={onChangeField}
          className="content__input"
        />
        {error && <p className="content__error">{error}</p>}
        <button type="submit" className="content__button">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
