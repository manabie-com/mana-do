import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'

import Service from 'service'

import 'pages/signin/index.css'

const SignInPage = () => {
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });
    const history = useHistory();

    useEffect(() => {
        if (localStorage.token) {
            history.push('/todo')
        }
    }, [history])

    const signIn = async (e: React.FormEvent) => { // no need return format response for HTMLInputElement
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
        <div style={{ marginTop: '3rem', textAlign: 'left' }}>
            <form onSubmit={signIn}>
                <div className="form_element">
                    <label htmlFor="user_id" data-testid="label_user_id">
                        User id
                    </label>
                    <input
                        data-testid="input_user_id"
                        id="user_id"
                        name="userId"
                        value={form.userId}
                        onChange={onChangeField}
                    />
                </div>
                <div className="form_element">
                    <label htmlFor="password" data-testid="label_password">
                        Password
                    </label>
                    <input
                        data-testid="input_password"
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={onChangeField}
                    />
                </div>
                <button type="submit" style={{ marginTop: 12 }}>
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default SignInPage;