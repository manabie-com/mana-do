import React, {useState} from 'react';

import {useHistory} from 'react-router-dom'
import Service from './service'

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
        <div className="login__container">
            <h2 style={{marginTop: 4}}>Login</h2>
            <form className="login-form" data-testid='login-form' onSubmit={signIn}>
                <label className="login-form__label" htmlFor="user_id">User id</label>
                <input
                    id="user_id"
                    name="userId"
                    required
                    placeholder='Enter user id'
                    data-testid="input-userId"
                    value={form.userId}
                    style={{marginBottom: 16}}
                    onChange={onChangeField}
                />
                <label className="login-form__label" htmlFor="password" >Password</label>

                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder='Enter password'
                    data-testid="input-password"
                    style={{marginBottom: 16}}
                    value={form.password}
                    onChange={onChangeField}
                />
                <button className="btn-submit" data-testid="btn-submit" type="submit" style={{marginTop: 4}}>
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default SignInPage;