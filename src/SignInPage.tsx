import React, {useState} from 'react';

import {useHistory} from 'react-router-dom'
import { toast } from 'react-toastify';


import Service from './service'
import {storeLoginToken} from './utils/storeageUtils';
import {ROUTES} from './utils/constants';

const SignInPage = () => {
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });
    const history = useHistory();

    const notify = (message: string) => toast.error(message, {
      hideProgressBar: true,
    });

    // Show the error message when the user input failed their username or password
    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const resp = await Service.signIn(form.userId, form.password)

            storeLoginToken(resp);
            history.push(ROUTES.TODO);
        } catch (e) {
            notify(e);
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
        <div className="Login__container">
            <div style={{width: '100%'}}>
                <button className="fluid google" type="submit" style={{marginTop: 12}}>
                    <img style={{verticalAlign: 'text-bottom', marginRight: 2}} src="/google-logo.svg" alt="Google"/>
                    Login with Google
                </button>
                <br/>
                <button className="fluid facebook" type="submit" style={{marginTop: 12}}>
                    <img style={{verticalAlign: 'text-bottom', marginRight: 2}} src="/facebook-logo.svg" alt="Facebook"/> Login with Facebook
                </button>
            </div>
            <div className="Login__inner">
                <form onSubmit={signIn}>
                    <div className="Login__row">
                        <label htmlFor="user_id">
                            Username:
                            <input
                              id="user_id"
                              name="userId"
                              value={form.userId}
                              style={{marginTop: 12}}
                              onChange={onChangeField}
                            />
                        </label>
                    </div>
                    <div className="Login__row">
                        <label htmlFor="password" >
                            Password:
                            <input
                              id="password"
                              name="password"
                              type="password"
                              style={{marginTop: 12}}
                              value={form.password}
                              onChange={onChangeField}
                            />
                        </label>
                    </div>
                    <div className="Login__row">
                        <div className="checkbox">
                            <input type="checkbox"/>
                            <label>Remember me</label>
                        </div>
                        <span className="float-right">
                            <a href="/forgot-password">Forgot Password?</a>
                        </span>
                    </div>
                    <div className="Login__row">
                        <button className="basic blue fluid" type="submit" style={{marginTop: 12}}>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
            <div className="Login__bottom">
                Don’t have an account? <a href="/sign-up">Sign up</a>
            </div>
        </div>
    );
};

export default SignInPage;
