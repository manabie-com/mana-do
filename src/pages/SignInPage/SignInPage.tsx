import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import URI from 'urijs';

import { signIn } from '../../apis';

export const SignInPage = () => {
  const [form, setForm] = useState({
    userId: '',
    password: '',
  });

  const history = useHistory();

  const location = useLocation();

  const { redirectURL = '/todo' } = URI(location.search).search(true);

  const handleSignInSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await signIn(form.userId, form.password);

    localStorage.setItem('token', resp);
    history.push(redirectURL as string);
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='sign-in-form'>
      <form onSubmit={handleSignInSubmission}>
        <div>
          <label htmlFor='user-id'>
            <span>User id</span>
            <input id='user-id' name='userId' value={form.userId} style={{ marginTop: 12 }} onChange={onChangeField} />
          </label>
        </div>

        <div>
          <label htmlFor='password'>
            <span>Password</span>
            <input
              id='password'
              name='password'
              type='password'
              style={{ marginTop: 12 }}
              value={form.password}
              onChange={onChangeField}
            />
          </label>
        </div>

        <button type='submit' style={{ marginTop: 12 }}>
          Sign in
        </button>
      </form>
    </div>
  );
};
