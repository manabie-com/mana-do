import React, {useState, useEffect} from 'react';

import {useHistory} from 'react-router-dom'
import Service from './service'
import {checkAuth} from './helpers/auth';

const SignInPage = () => {
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });
    const [buttonText, setButtonText] = useState('Sign in');
    const [error, setError] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (checkAuth()) {
            history.push('/todo');
        }
    }, [history])

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setButtonText('SignUp')
            const resp = await Service.signIn(form.userId, form.password)

            localStorage.setItem('token', resp)
            history.push('/todo')
        } catch (error) {
            setError(error);
        }
    }

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setError('');
        setForm(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="SignIn__container">
            <h1 className="SignIn__title">SIGN IN</h1>

            <form data-testid="sign-in-form" className="SignIn__form" onSubmit={signIn}>
                <div className="SignIn__form_item">
                    <label htmlFor="user_id">User ID</label>
                    <input
                        id="user_id"
                        data-testid="user_id"
                        name="userId"
                        value={form.userId}
                        placeholder="User ID"
                        onChange={onChangeField}
                    />
                </div>
                <div className="SignIn__form_item">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        data-testid="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={onChangeField}
                    />
                </div>
                {error && <p role="alert" className="SignIn__form_error">{error}</p>}
                <button data-testid="btn-submit" type="submit" className="SignIn__btn_submit">
                    {buttonText}
                </button>
            </form>
        </div>
    );
};

export default SignInPage;