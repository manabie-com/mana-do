import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import Service from '../../../service';
import { TextField, Button } from 'components';

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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ marginTop: '3rem', textAlign: 'left' }}>
      <form onSubmit={signIn}>
        <TextField
          label='User id'
          name='userId'
          id='user_id'
          value={form.userId}
          onChange={onChangeField}
        />
        {/* <label htmlFor='user_id'>
          User id
          <input
            id='user_id'
            name='userId'
            value={form.userId}
            style={{ marginTop: 12 }}
            onChange={onChangeField}
          />
        </label> */}
        <br />
        <TextField
          label='Password'
          name='password'
          id='password'
          type='password'
          value={form.password}
          onChange={onChangeField}
        />
        <br />
        <Button type='submit'>
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default SignInPage;
