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
        <div className="authContainer">
            <h1>SignInPage</h1>
            <form onSubmit={signIn} className="formAuth">
                <label htmlFor="user_id" data-testid="user_id">
                    User id
                    <input
                        id="user_id"
                        name="userId"
                        value={form.userId}
                        onChange={onChangeField}
                    />
                </label>
                <br/>
                <label htmlFor="password" data-testid="password">
                    Password
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={onChangeField}
                    />
                </label>
                <br />
                <button type="submit" style={{marginTop: 12}}>
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default SignInPage;