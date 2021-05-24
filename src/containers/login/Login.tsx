import React, {useContext, useState} from 'react';

import Classes from './Login.module.scss';
import AuthActionsCreator from '../../store/auth/AuthActions';
import AuthContext, {IAuthContext} from '../../context/AuthContext';

const LoginPage = () => {
  const [form, setForm] = useState({
    userId: '',
    password: ''
  });
  const {authState, dispatch} = useContext(AuthContext) as IAuthContext;

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(AuthActionsCreator.authenticate(form.userId, form.password))
  }

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const errorMessageElement = authState.errorMessage
    ? <div className={Classes.ErrorMessage}>{authState.errorMessage}</div>
    : null;
  return (
    <div className={Classes.Login}>
      <form onSubmit={signIn} className={Classes.LoginForm}>
        <h3 className={Classes.LoginHeader}>Login</h3>
        <div className={Classes.LoginFormContent}>
          <input
            required
            className={Classes.LoginInput}
            id="user_id"
            name="userId"
            value={form.userId}
            placeholder="username"
            onChange={onChangeField}
          />
          <input
            required
            className={Classes.LoginInput}
            id="password"
            name="password"
            type="password"
            placeholder="password"
            value={form.password}
            onChange={onChangeField}
          />
        </div>
        <button type="submit" className={Classes.LoginButton}>
          Login
        </button>
        {errorMessageElement}
      </form>
    </div>
  );
};

export default LoginPage;