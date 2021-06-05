import Button from 'components/Button';
import Container from 'components/Container';
import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import TextInput from 'components/TextInput';
import Service from 'service';
import Form from 'components/Form';
import Typography from 'components/Typography/Typography';

const SignInPage = () => {
  const [form, setForm] = useState({
    userId: '',
    password: '',
  });
  const [error, setError] = useState('');
  const history = useHistory();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await Service.signIn(form.userId, form.password);

      localStorage.setItem('token', resp);
      history.push('/todo');
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
    <Container>
      <Form onSubmit={signIn} autoComplete="off">
        <TextInput
          text="User id"
          id="user_id"
          name="userId"
          value={form.userId}
          placeholder="Your userId"
          onChange={onChangeField}
          error={!!error}
        />

        <TextInput
          text="Password"
          id="password"
          name="password"
          type="password"
          value={form.password}
          placeholder="Your password"
          onChange={onChangeField}
          error={!!error}
        />

        <Typography variant="error">{error}</Typography>

        <div>
          <Button type="submit">Sign in</Button>
        </div>
      </Form>
    </Container>
  );
};

export default SignInPage;
