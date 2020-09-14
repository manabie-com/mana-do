import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import AuthService from '../../service/auth.service';
import { ISignIn } from '../../types/auth';


const SignInPage = () => {
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
                        data-test-id="usernameInput"
                        ref={register({ required: true })}
                        id="user_name"
                        name="username"
                        style={{marginTop: 12}}
                    />
                    { errors.username && <span data-test-id="usernameErr"> Please enter your account </span> }
                </label>
                <br/>
                <label htmlFor="password" >
                    Password
                    <input
                        data-test-id="passwordInput"
                        ref={register({ required: true })}
                        id="password"
                        name="password"
                        type="password"
                        style={{marginTop: 12}}
                    />
                    { errors.password && <span data-test-id="passwordErr"> Please enter your password </span> }
                </label>
                <br />
                <button type="submit" style={{marginTop: 12}} data-test-id="submitButton">
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default SignInPage;