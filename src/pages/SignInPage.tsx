import React, {useState} from 'react';

import {useHistory} from 'react-router-dom'
import { useAuth } from '../auth'
import Notification from '../components/Notification'

const SignInPage = () => {
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });
    const history = useHistory();
    const { token, logIn, error } = useAuth()

    if (token && !error) history.push('/todo')

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        logIn(form.userId, form.password)
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
        <div style={{marginTop: '3rem', textAlign: 'left'}}>
            {error && <Notification type='error'>{error}</Notification>}
            <form onSubmit={signIn}>
                <label htmlFor="user_id">
                    User id
                    <input
                        id="user_id"
                        name="userId"
                        value={form.userId}
                        style={{marginTop: 12}}
                        onChange={onChangeField}
                    />
                </label>
                <br/>
                <label htmlFor="password" >
                    Password
                    <input
                        id="password"
                        name="password"
                        type="password"
                        style={{marginTop: 12}}
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
