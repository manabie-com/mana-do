import React, {useCallback, useState} from 'react';

import {useHistory} from 'react-router-dom'
import Service from '../service'
import {LoginForm} from "../components/LoginForm";

const SignInPage = () => {
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });
    const history = useHistory();

    const signIn = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const resp = await Service.signIn(form.userId, form.password)

        localStorage.setItem('token', resp)
        history.push('/todo')
    }, [form])

    const onChangeField = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }, [form])

    return (
        <div style={{marginTop: '3rem', textAlign: 'left'}}>
            <LoginForm onSubmit={signIn} onChange={onChangeField} userId={form.userId} password={form.password}/>
        </div>
    );
};

export default SignInPage;