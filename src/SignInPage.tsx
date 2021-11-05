import React, { useState } from 'react';

import { useHistory } from 'react-router-dom'
import Service from './service'

interface FormSubmit {
    userId: string;
    password: string
}

const SignInPage = () => {
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });
    const [errors, setErrors] = useState<FormSubmit>()
    const [formErr, setFormErr] = useState('')
    const history = useHistory();


    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (handleValidation()) {
            try {
                const resp = await Service.signIn(form?.userId, form?.password)
                localStorage.setItem('token', resp)
                history.push('/todo')
            } catch (error) {
                setFormErr('This userId or password incorrect')
            }
        }
    }

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleValidation = () => {
        let formErrors: FormSubmit = {
            userId: '',
            password: ''
        }
        let formIsValid = true;

        if (!form?.userId) {
            formIsValid = false;
            formErrors['userId'] = "Cannot be empty";
        }

        if (!form?.password) {
            formIsValid = false;
            formErrors['password'] = "Cannot be empty";
        }
        setErrors(formErrors)
        return formIsValid;
    }

    return (
        <div className='sign-in' >
            {formErr && <div className='error-text'>{formErr}</div>}
            <form className={`sign-in-form ${formErr ? 'error' : ''}`} onSubmit={signIn}>
                <div className='sign-in-form-label'>
                    User id
                </div>
                <div>
                    <input
                        className={errors?.userId ? 'error' : ''}
                        id="user_id"
                        name="userId"
                        value={form.userId}
                        onChange={onChangeField}
                    />
                </div>
                <span className='error-text'>{errors?.userId}</span>
                <div className='sign-in-form-label'>
                    Password
                </div>
                <div>
                    <input
                        className={errors?.password ? 'error' : ''}
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={onChangeField}
                    />
                </div>
                {/* @ts-ignore */}
                <span className='error-text'>{errors?.password}</span>
                <div>
                    <button type="submit" >
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignInPage;