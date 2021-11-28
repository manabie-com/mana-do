import React, {useState} from 'react';

import {useHistory} from 'react-router-dom'
import Service from './service'
import GG from './assets/images/google.png';
import FB from './assets/images/fb.png';
import MAC from './assets/images/apple.png';
import IMAGE from './assets/images/login-image.png';

/**
 * reference design
 * https://www.figma.com/file/jIw1TDfWqAB3y0mJfM2O2e/UI-Day-001---Login-Page-(Community)?node-id=0%3A1
 * @constructor
 */
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
        <div className="login-page">
            <div className="login-wrapper">
                <div className="col col-12 login-form-section">
                    <div className="title-section">
                        <div className="login-title">
                            WELCOME BACK!
                        </div>
                        <div className="sign-up">
                            Don’t have a account,
                            <button type="button"
                                    className="btn btn-link">
                                <span>Sign up</span>
                            </button>
                        </div>
                    </div>
                    <form onSubmit={signIn}>
                        <div className="input-item">
                            <div className="label-wrapper">
                                <label htmlFor="user_id">
                                    Username
                                </label>
                            </div>
                            <input
                                id="user_id"
                                name="userId"
                                value={form.userId}
                                onChange={onChangeField}
                            />
                        </div>
                        <div className="input-item">
                            <div>
                                <label htmlFor="password">
                                    Password
                                </label>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={onChangeField}
                            />
                        </div>
                        <div className="txt-center forgot-section">
                            Forget password?
                        </div>
                        <button type="submit"
                                className="sign-in-btn">
                            Sign in
                        </button>

                        <div className="other-label">
                            <span className="divider-inner-text">
                                or continue with
                            </span>
                        </div>
                        <div className="method-section">
                            <div className="other-method">
                                <div className="method-item">
                                    <img src={GG} alt="gg"/>
                                </div>
                                <div className="method-item">
                                    <img src={FB} alt="fb"/>
                                </div>
                                <div className="method-item">
                                    <img src={MAC} alt="apple"/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col col-12 login-image">
                    <img src={IMAGE} alt="loginImage"/>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;