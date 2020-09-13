import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';

import AuthService from './service/auth.service';
import { ISignIn } from './types/auth';


const SignInPage = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();
    const cbSignIn = () => {
        
    }
    const signIn: SubmitHandler<ISignIn> = async (formData) => {
        const { username , password } = formData;
        try {
            const { token } = await AuthService.signIn({ username, password }, cbSignIn);
            history.push('/todo');
        } catch (error) {
            alert(error.msg)
        }
    };

    return (
        <div style={{marginTop: '3rem', textAlign: 'left'}}>
            <form onSubmit={handleSubmit(signIn)}>
                <label htmlFor="user_name">
                    User id
                    <input
                        ref={register}
                        id="user_name"
                        name="username"
                        style={{marginTop: 12}}
                    />
                </label>
                <br/>
                <label htmlFor="password" >
                    Password
                    <input
                        ref={register}
                        id="password"
                        name="password"
                        type="password"
                        style={{marginTop: 12}}
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