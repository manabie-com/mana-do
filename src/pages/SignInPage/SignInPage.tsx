import React from 'react';

import { useHistory } from 'react-router-dom';
import { clearTodos } from '../../utils/helpers';
import Service from '../../service';
import '../../stylesheets/SignInPage.css';

const SignInPage = () => {
  const [form, setForm] = React.useState({
    userId: '',
    password: ''
  });
  const history = useHistory();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const resp = await Service.signIn(form.userId, form.password)

    localStorage.setItem('token', resp)
    clearTodos();
    history.push('/todo')
  }

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="Form__container">
      <div className="Form__bg" />
      <form className="Form__signin" onSubmit={signIn}>
        <div className="Form__signin__title">
          <h1>Welcome Back!</h1>
          <span>Do you have something to do today?</span>
        </div>

        <div className="Form__group__input">
          <input
            id="user_id"
            name="userId"
            placeholder="User ID"
            value={form.userId}
            onChange={onChangeField}
          />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onChangeField}
          />
        </div>

        <button
          className="Action__btn"
          type="submit"
          style={{
            width: '100%',
            marginTop: '2rem',
          }}
        >
          Let's make a plan
        </button>
      </form>
    </div>
  );
};

export default SignInPage;