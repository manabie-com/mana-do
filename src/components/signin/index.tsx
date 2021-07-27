import React, { useState, useCallback } from 'react';

import { useHistory } from 'react-router-dom'
import Service from 'root/service'
import SignInPresentation from './presentation';

const SignInComponent = () => {
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

    const onChangeField = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }, [])

    return (
        <SignInPresentation
            signIn={signIn}
            form={form}
            onChangeField={onChangeField}
        />
    );
};

export default SignInComponent;