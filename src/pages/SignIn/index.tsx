import React, { useState } from 'react';
import './styles.css';
import Service from '../../service';
import useAuth from '../../hook/auth';

function SignInPage() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');

    try {
      const token = await Service.signIn(form.username, form.password);
      signIn(token);
    } catch (e) {
      setError(e);
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
    <div className={'SignIn__wrapper'}>
      <form className={'SignIn__form'} onSubmit={handleSubmit}>
        <div className={'SignIn__formControl'}>
          <label htmlFor="username" className={'SignIn__label'}>
            Username
          </label>
          <input
            id="username"
            name="username"
            className={'SignIn__input'}
            value={form.username}
            onChange={onChangeField}
          />
        </div>

        <div className={'SignIn__formControl'}>
          <label htmlFor="password" className={'SignIn__label'}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={'SignIn__input'}
            value={form.password}
            onChange={onChangeField}
          />
        </div>

        <button type="submit" className={'SignIn__btnSubmit'}>
          SIGN IN
        </button>

        {error && <div className={'SignIn__error'}>{error}</div>}
      </form>
    </div>
  );
}

export default SignInPage;
