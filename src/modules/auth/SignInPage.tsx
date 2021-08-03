import React, {useState} from 'react';

import { useAuthContext } from './AuthContext';
import { requestLogin } from './store/actions';
import './auth.scss';

const SignInPage = () => {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const {
      state: { error },
      dispatch,
    } = useAuthContext();

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { username, password } = form;
        dispatch(requestLogin({ username, password }));
    }

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setForm(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className='signin__container' style={{marginTop: '3rem', textAlign: 'left'}}>
            <form onSubmit={signIn}>
                <label htmlFor="user_id" className='form__label' style={{marginTop: '16px'}}>
                    User id
                    <input
                        id="user_id"
                        name="username"
                        value={form.username}
                        onChange={onChangeField}
                    />
                </label>
                <br/>
                <label htmlFor="password" className='form__label'>
                    Password
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={onChangeField}
                    />
                </label>
                <br />
                <button type="submit" className='form__btn'>
                    Sign in
                </button>
                {error && <p id='error' style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
};

export default SignInPage;