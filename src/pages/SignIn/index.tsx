import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import Auth from 'service/auth';
import Service from '../../service';

import './index.css';

const SignInPage = () => {
  const [form, setForm] = useState({
    userId: '',
    password: ''
  });
  const history = useHistory();

  useEffect(() => {
    // log out
    // console.log('log out');
    // (async () =>
    //   await Auth.signout(() => {
    //     console.log('Signed out!');
    //   }))();
    return () => {
      console.log('UNMOUNT');
    };
  }, []);

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const resp = await Service.signIn(
      form.userId.toString(),
      form.password.toString()
    );

    localStorage.setItem('token', resp || '123456');
    history.push('/todo');
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className='SignIn__container'>
      <form onSubmit={signIn}>
        <label htmlFor='user_id'>User id</label>

        <input
          id='user_id'
          name='userId'
          value={form.userId}
          style={{ marginTop: 12 }}
          onChange={onChangeField}
        />

        <br />
        <label htmlFor='password'>Password</label>

        <input
          id='password'
          name='password'
          type='password'
          style={{ marginTop: 12 }}
          value={form.password}
          onChange={onChangeField}
        />
        <br />
        <button className='SignIn_button' type='submit'>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
