import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import Service from '../../service';
import Button from '../../component/Button/Button';
import Input from '../../component/Input/Input';
import { notify } from '../../component/Toast/Toast';

const SignInPage = () => {
  const [form, setForm] = useState({
    userId: '',
    password: ''
  });
  const history = useHistory();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await Service.signIn(form.userId, form.password);

      localStorage.setItem('token', resp);
      history.push('/todo');
    } catch (e) {
      notify.error(e);
    }
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div style={{ marginTop: '3rem', textAlign: 'left' }} className="SignIn__container">
      <form onSubmit={signIn}>
        <div className="SignIn__row">
          <Input
            isHasLabel={true}
            textLabel={'User Id'}
            id="user_id"
            name="userId"
            value={form.userId}
            onChange={onChangeField}
            style={{ marginTop: 12 }}
            required
          />
        </div>
        <div className="SignIn__row">
          <Input
            isHasLabel={true}
            textLabel={'Password'}
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={onChangeField}
            style={{ marginTop: 12 }}
            required
          />
        </div>
        <Button type="submit" style={{ marginTop: 12 }} children="Sign In" />
      </form>
    </div>
  );
};

export default SignInPage;
