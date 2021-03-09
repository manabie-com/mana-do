import React, { useState } from 'react';

import { useHistory } from 'react-router-dom'
import Service from '../../service'
import './SignInPage.css';

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
        <div className="Login__container">
            <h1>Login To Todos</h1>
            <div className="Login__form">
                <form onSubmit={signIn}>
                    <div className="Login__field">
                        <span className="fa fa-user">
                        </span>
                        <input
                            id="user_id"
                            name="userId"
                            value={form.userId}
                            onChange={onChangeField}
                        />
                    </div>
                    <div className="Login__field">
                        <span className="fa fa-lock">
                        </span>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={onChangeField}
                        />
                    </div>
                    <div className="Login__field">
                        <button type="submit">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;