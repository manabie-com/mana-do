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
    <div className="Content">
      <form onSubmit={signIn} className="Content__form">
        <label htmlFor="user_id" className="Content__label">
          Username
        </label>
        <input
          id="user_id"
          name="userId"
          value={form.userId}
          onChange={onChangeField}
          className="Content__input"
        />
        <label htmlFor="password" className="Content__label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={onChangeField}
          className="Content__input"
        />
        {error && <p className="Content__error">{error}</p>}
        <button type="submit" className="Content__button">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
