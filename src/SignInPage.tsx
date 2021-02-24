import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import Service from './service';

import './SignInPage.css';

const SignInPage = () => {
  const [form, setForm] = useState({
    userId: '',
    password: '',
  });
  const history = useHistory();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await Service.signIn(form.userId, form.password);

    localStorage.setItem('token', resp);
    history.push('/todo');
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="Signin_container">
      <form className="Signin__form" onSubmit={signIn}>
        <label htmlFor="password">
          <div id="Signin__input-container">
            <input
              id="user_id"
              name="userId"
              value={form.userId}
              onChange={onChangeField}
              placeholder="User ID"
            />
            <img
              src="https://www.freeiconspng.com/thumbs/login-icon/user-login-icon-14.png"
              id="Signin__input-img"
              alt="login"
            />
          </div>
        </label>
        <br />
        <label htmlFor="password">
          <div id="Signin__input-container">
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={onChangeField}
              placeholder="Password"
            />
            <img
              src="https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/password-512.png"
              id="Signin__input-img"
              alt="password"
            />
          </div>
        </label>
        <br />
        <button type="submit" className="Signin__submit-button">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
