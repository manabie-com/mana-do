import React, { useState } from 'react';

import { useHistory } from 'react-router-dom'
import Service from '../../service'

import "./SignIn.scss";

const SignIn = () => {
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });
    const [err, setErr] = useState<string>("")
    const history = useHistory();

    const signInHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const resp = await Service.signIn(form.userId, form.password)
            localStorage.setItem('token', resp);
            history.push('/todo')
        } catch (error) {
            setErr(error)
        }
    }

    const onChangeFieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="SigIn">
            <div className="SigIn__Container">
                <h1>Log in</h1>
                <form onSubmit={signInHandler}>
                    <div className="form-group">
                        <label htmlFor="user_id">User id</label>
                        <input
                            id="user_id"
                            name="userId"
                            type="text"
                            value={form.userId}
                            autoComplete="off"
                            onChange={onChangeFieldHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" >Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={onChangeFieldHandler}
                        />
                    </div>

                    <button type="submit">
                        Sign in
                    </button>
                    {err && <p>{err}</p>}
                </form>
                <p>Log in with: firstUser/example</p>
            </div>
        </div>
    );
};

export default SignIn;