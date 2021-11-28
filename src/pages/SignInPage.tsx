import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import Service from '../service';
import './SignInPage.css';

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
        <div id="login-container">
            <h1>Login</h1>
            <form onSubmit={signIn}>
                <label htmlFor="user_id">
                    <h3>User id</h3>
                    <input
                        id="user_id"
                        name="userId"
                        value={form.userId}
                        style={{ marginTop: 12 }}
                        onChange={onChangeField}
                    />
                </label>
                <br />
                <label htmlFor="password">
                    <h3>Password</h3>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        style={{ marginTop: 12 }}
                        value={form.password}
                        onChange={onChangeField}
                    />
                </label>
                <br />
                <button type="submit" data-testid="submit" style={{ marginTop: 12 }}>
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default SignInPage;
