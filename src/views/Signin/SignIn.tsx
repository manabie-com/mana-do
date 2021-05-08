import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import Service from '../../service'

import InputComponent from '../../components/Input/Input'
import './style.css';

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

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) history.push('/todo');
    }, [history]);

    return (
        <div style={{marginTop: '3rem', textAlign: 'left'}} className="page-signin">
            <form onSubmit={signIn}>
                <InputComponent
                    id="user_id"
                    name="userId"
                    label="User id"
                    value={form.userId}
                    handleChange={onChangeField}
                />
                {/* <label htmlFor="user_id">
                    User id
                    <input
                        id="user_id"
                        name="userId"
                        value={form.userId}
                        style={{marginTop: 12}}
                        onChange={onChangeField}
                    />
                </label> */}
                {/* <br/> */}
                <InputComponent
                    id="password"
                    name="password"
                    label="Password"
                    value={form.password}
                    handleChange={onChangeField}
                />
                {/* <label htmlFor="password" >
                    Password
                    <input
                        id="password"
                        name="password"
                        type="password"
                        style={{marginTop: 12}}
                        value={form.password}
                        onChange={onChangeField}
                    />
                </label> */}
                {/* <br /> */}
                <div className="form-actions">
                    <button type="submit" style={{marginTop: 12}}>
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignInPage;
