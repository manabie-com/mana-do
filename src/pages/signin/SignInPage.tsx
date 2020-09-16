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
            await AuthService.signIn({ username, password }, cbSignIn);
            history.push('/todo');
        } catch (error) {
            alert(error.msg)
        }
    };
    return (
        <div style={{marginTop: '3rem', textAlign: 'left'}}>
            <form onSubmit={handleSubmit(signIn)}>
                <div>
                    <label htmlFor="username">
                        <input
                            data-testid="username"
                            ref={register({ required: true })}
                            id="user_name"
                            name="username"
                            style={{marginTop: 12}}
                            type="text"
                            placeholder="User name"
                        />
                    </label>
                    { errors.username && <p className="err-msg"> Please enter your account </p> }
                </div>
                <br/>
                <div>
                    <label htmlFor="password" >
                        <input
                            data-testid="password"
                            ref={register({ required: true })}
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            style={{marginTop: 12}}
                        />
                    </label>
                    { errors.password && <p className="err-msg" data-test-id="passwordErr"> Please enter your password </p> }
                </div>
                <br />
                <button type="submit" style={{marginTop: 12}} >
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default SignInPage;