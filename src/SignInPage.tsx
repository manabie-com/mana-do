import React, { useState } from 'react';

import { useHistory } from 'react-router-dom'
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
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (

        <form onSubmit={signIn}>
            <h1>Login</h1>
            <div className="label">
                <input
                    id="user_id"
                    name="userId"
                    value={form.userId}
                    type="text"
                    onChange={onChangeField}
                    placeholder="User ID"
                />
                <label className="label__item" htmlFor="user_id">User ID</label>
                <span className="enter"></span>
                <br />
                <br />
            </div>
            <div className="label">
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={onChangeField}
                    placeholder="Password"
                />
                <label className="label__item" htmlFor="password" >Password</label><br />
                <span className="enter"></span>
                <br />
            </div>

            <button className="Action__btn" type="submit" style={{ marginTop: 12, padding: 10 }}>
                Sign in
            </button>
        </form>

    );
};

export default SignInPage;