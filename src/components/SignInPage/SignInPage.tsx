import React, { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LOGIN_KEYS } from '../../models/auth';
import { ITextField } from '../../models/textField';
import Service from '../../service';
import TextField from '../Common/TextField';
import './styles.css';

const SignInPage = () => {
  const [form, setForm] = useState({
    userId: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem(LOGIN_KEYS.token);
    token && history.push('/todo');
  }, [history]);

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = await Service.signIn(form.userId, form.password);
      localStorage.setItem(LOGIN_KEYS.token, token);
      history.push('/todo');
    } catch (error) {
      setErrorMsg(error);
    }
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const signInSchema = (form = { userId: '', password: '' }): ITextField[] => [
    {
      id: 'user_id',
      label: 'User id',
      required: true,
      name: LOGIN_KEYS.userId,
      value: form.userId,
      type: 'text',
      className: 'text-field',
      onChange: onChangeField,
    },
    {
      id: LOGIN_KEYS.password,
      required: true,
      name: LOGIN_KEYS.password,
      value: form.password,
      label: 'Password',
      className: 'text-field',
      onChange: onChangeField,
      type: LOGIN_KEYS.password,
    },
  ];
  return (
    <div className='sign-in-container'>
      <form data-testid="form"  onSubmit={signIn}>
        <h3>Welcome to Manabie coding challenge</h3>
        {signInSchema(form).map((props, index) => (
          <div className='sign-in-field' key={index}>
            <TextField {...props} />
          </div>
        ))}
        <br />
        <span className='error-message'>{errorMsg}</span>
        <button type='submit' className='action-btn-primary'>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default memo(SignInPage);
