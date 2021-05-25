import React, {useState} from 'react';

import {useHistory} from 'react-router-dom'
import Service from '../../../services'

import './sign-in.css';

const SignInPage = () => {
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });
    const history = useHistory();

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const resp = await Service.signIn(form.userId, form.password)

        localStorage.setItem('token', resp)
        history.push('/todo')
    }

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setForm(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
      <div className="box">
        <form className="login-form" onSubmit={signIn}>
          <h1>Login</h1>
          <input
            id="user-id"
            type="text"
            name="userId"
            placeholder="User id"
            value={form.userId}
            onChange={onChangeField}
            required
          />
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChangeField}
            required
          />
          <input type="submit" name="Login" value="Sign in" />
        </form>
      </div>
    );
};

export default SignInPage;
