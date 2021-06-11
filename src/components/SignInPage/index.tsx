import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './index.module.scss';
import TextField from '../TextField';
import Button from '../Button';
import DisplayText from '../DisplayText';
import Service from '../../service';

const SignInPage = () => {
  const history = useHistory();
  const [form, setForm] = useState({
    userId: '',
    password: '',
  });

  const onChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const resp = await Service.signIn(form.userId, form.password);
    localStorage.setItem('token', resp);
    history.push('/todo');
  };

  return (
    <div className={styles.Page}>
      <div className={styles.Container}>
        <form className={styles.LogIn} onSubmit={handleSubmit}>
          <DisplayText className={styles.Heading} element="h1" size="large">
            TODO LIST
          </DisplayText>
          <TextField name="userId" label="User id" value={form.userId} onChange={onChangeField} />
          <TextField name="password" label="Password" value={form.password} type="password" onChange={onChangeField} />
          <Button isPrimary block type="submit">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
