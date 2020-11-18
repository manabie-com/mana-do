import React, { memo, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LOGIN_KEYS } from '../../models/auth';
import Service from '../../service';

const SignInPage = () => {
  const [form, setForm] = useState({
    userId: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem(LOGIN_KEYS.token);
    token && history.push('/todo');
  }, [history]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = await Service.signIn(form.userId, form.password);
      localStorage.setItem(LOGIN_KEYS.token, token);
      history.push('/todo');
    } catch (error) {
      setErrorMsg(error);
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
    <div style={{ marginTop: '3rem', textAlign: 'left' }}>
      <form onSubmit={signIn}>
        <label htmlFor="user_id">
          User id
          <input
            required
            id="user_id"
            name={LOGIN_KEYS.userId}
            value={form.userId}
            style={{ marginTop: 12 }}
            onChange={onChangeField}
          />
        </label>
        <br />
        <label htmlFor="password">
          Password
          <input
            required
            id="password"
            name={LOGIN_KEYS.password}
            type="password"
            style={{ marginTop: 12 }}
            value={form.password}
            onChange={onChangeField}
          />
        </label>
        <br />
        <button type="submit" style={{ marginTop: 12 }}>
          Sign in
        </button>
      </form>
      <span>{errorMsg}</span>
    </div>
  );
};

export default memo(SignInPage);
