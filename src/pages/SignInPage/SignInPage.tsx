import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

import {useHistory} from 'react-router-dom'
import Service from 'service';
import * as globalActions from "modules/actions";

const SignInPage = () => {
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });
    const [errorMsg, setErrorMsg] = useState("")
    const history = useHistory();
    const dispatch = useDispatch();

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const resp = await Service.signIn(form.userId, form.password);
            dispatch(globalActions.login(resp))
            history.push('/todo');
        } catch (error) {
            setErrorMsg(error);
        }
       
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
                {errorMsg && (
                    <React.Fragment>
                        <label className="Message--error">{errorMsg}</label>
                        <br/>
                    </React.Fragment>
                )}
                <button type="submit" style={{marginTop: 12}}>
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default SignInPage;