import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ISignIn } from './types/auth';


const SignInPage = () => {
    const { register, handleSubmit, errors } = useForm();
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });
    const history = useHistory();

    const signIn =  handleSubmit( async (data) => {
        try {
            console.log(data);
        } catch (error) {
            
        }
    })

    return (
        <div style={{marginTop: '3rem', textAlign: 'left'}}>
            <form onSubmit={signIn}>
                <label htmlFor="user_id">
                    User id
                    <input
                        ref={register}
                        id="user_id"
                        name="userId"
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