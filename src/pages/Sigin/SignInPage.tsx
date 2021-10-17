import React, {useState} from 'react';

import {useHistory} from 'react-router-dom'
import { ROUTE_TODO } from '../../routes';
import Service from '../../service'

import './style.css';

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
        history.push(ROUTE_TODO)
    }

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setForm(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const renderFormSignin = () => (
        <form onSubmit={signIn} className='form-signin res-form-signin'>
            <h1 className='form-signin-label'>Sign in</h1>
            <label htmlFor='user_id' className='form-input'>
                Username
                <input
                className='form-input__input'
                placeholder='Username'
                id='user_id'
                name='userId'
                value={form.userId}
                onChange={onChangeField}
                />
            </label>
            <br />
            <label htmlFor='password' className='form-input'>
                Password
                <input
                className='form-input__input'
                placeholder='Password'
                id='password'
                name='password'
                type='password'
                value={form.password}
                onChange={onChangeField}
                />
            </label>
            <br />
            <button type='submit' className='btn-signin'>
                Sign in
            </button>
            <div className='form-action'>
                <label className='remember'>
                <input type='checkbox' />
                <span>Remember</span>
                </label>
                <p className='forgot'>Forgot password</p>
            </div>
        </form>
    );

    const renderWelcome = () => (
      <div className='welcome-section res-welcome'>
        <h1 className='welcome-label text'>Welcome to signin</h1>
        <p className='sub-text text'>Don't have an account?</p>
        <button className='btn-signup'>Sign up</button>
      </div>
    );

    return (
        <div style={{marginTop: '3rem', textAlign: 'left'}}>
            <div className='signin'>
                {renderFormSignin()}
                {renderWelcome()}
            </div>
        </div>
    );
};

export default SignInPage;