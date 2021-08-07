import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import Service from '../../service';
import { ReactComponent as ReactLogo } from '../../logo.svg';

import './style.css';

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
    <div className='login'>
      <h2>Welcome</h2>
      <ReactLogo />
      <br />
      <br />
      <br />
      <form onSubmit={signIn}>
        <input
          id='user_id'
          name='userId'
          value={form.userId}
          style={{ marginTop: 12 }}
          onChange={onChangeField}
          placeholder='Please input your user id'
        />
        <br />
        <br />
        <input
          id='password'
          name='password'
          type='password'
          style={{ marginTop: 12 }}
          value={form.password}
          onChange={onChangeField}
          placeholder='Please input your password'
        />
        <br />
        <br />
        <button className='btn-grad' type='submit' style={{ marginTop: 12 }}>
          Sign in
        </button>
      </form>
      <div className='login__bottom'>Don't have an account, Sign up!</div>
    </div>
  );
};

export default SignInPage;
