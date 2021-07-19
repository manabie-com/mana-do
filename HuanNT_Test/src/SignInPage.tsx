import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom'
import Service from './service'

const SignInPage = () => {
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });
    const history = useHistory();

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token');
            if (token) {
                history.push('/todo');
            }
        })()
    }, [])

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
        <>
            <div className="Todo__title">Sign In</div>
            <div style={{ marginTop: '5rem', textAlign: 'left', width: '100%', maxWidth: '360px' }}>
                <form className="form-signin" onSubmit={signIn}>
                    <div className="row_signin">
                        <label htmlFor="user_id">User id</label>
                        <input
                            id="user_id"
                            name="userId"
                            value={form.userId}
                            style={{ marginTop: 12 }}
                            onChange={onChangeField}
                        />
                    </div>
                    <div className="row_signin">
                        <label htmlFor="password" >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            style={{ marginTop: 12 }}
                            value={form.password}
                            onChange={onChangeField}
                        />
                    </div>
                    <div className="row_action">
                        <button type="submit" style={{ marginTop: 12 }}>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignInPage;