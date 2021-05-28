import React from 'react';

import {useHistory} from 'react-router-dom'
import Service from './service'

const SignInPage = () => {
    const userNameInputRef = React.createRef<HTMLInputElement>()
    const passwordInputRef = React.createRef<HTMLInputElement>()
    const history = useHistory();

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (userNameInputRef.current && passwordInputRef.current) {
            const resp = await Service.signIn(userNameInputRef.current.value, passwordInputRef.current.value)
            localStorage.setItem('token', resp)
            history.push('/todo')
        }
    }

    return (
        <div style={{marginTop: '3rem', textAlign: 'left', width: 300}}>
            <form onSubmit={signIn} className="Login__form">
                <label htmlFor="user_id">
                    User id
                    <input
                        id="user_id"
                        name="userId"
                        className="Todo__input"
                        ref={userNameInputRef}
                        style={{marginTop: 12}}
                    />
                </label>
                <br/>
                <label htmlFor="password" >
                    Password
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="Todo__input"
                        ref={passwordInputRef}
                        style={{marginTop: 12}}
                    />
                </label>
                <br />
                <button className="Action__btn Action__btn--active" type="submit" style={{marginTop: 12}}>
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default SignInPage;
