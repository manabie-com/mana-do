import Button from 'components/Button';
import Container from 'components/Container';
import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import TextInput from '../components/Form/TextInput';
import Service from '../service';

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
    <Container>
      <form onSubmit={signIn} autoComplete="off">
        <TextInput
          text="User id"
          className="abc xyz"
          id="user_id"
          name="userId"
          value={form.userId}
          onChange={onChangeField}
        />

        <br />

        <TextInput
          text="Password"
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={onChangeField}
        />

        <br />
        <Button type="submit">Sign in</Button>
        <button type="submit" style={{ marginTop: 12 }}>
          Sign in
        </button>
      </form>
    </Container>
  );
};

export default SignInPage;
