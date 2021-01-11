import React, { useState } from 'react';

import { useHistory } from 'react-router-dom'
import Service from '../../service'
import './style.css'
import Button from '../../components/buttons';

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
        <div className="signInPage">
            <div className="signInForm">
                <form onSubmit={signIn}>
                    <div className="form-group">
                        <label htmlFor="user_id">
                            User id
                        </label>
                        <input
                            id="user_id"
                            name="userId"
                            value={form.userId}
                            onChange={onChangeField}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={onChangeField}
                        />
                    </div>
                    <Button typeBtn="submit" textBtn="Sign In" styleBtn="primary" />
                </form>
            </div>
        </div>
    );
};

export default SignInPage;