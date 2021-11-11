/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import userService from '../../service/user.service';
import ErrorMessage from '../../shared/components/ErrorMessage';
import MyButton from '../../shared/components/MyButton';
import MyInputField from '../../shared/components/MyInputField';
import { ROUTE } from '../../shared/constant';
import './index.scss';

const SignInPage = () => {

    const [form, setForm] = useState({
        userId: '',
        password: ''
    });

    const isFormValid = form.password !== '' && form.userId !== '';

    const [message, setMessage] = useState("");

    useEffect(() => {
        onCheckAuthentication();
    }, [])

    const history = useHistory();

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isFormValid) {
            const response = await userService.signIn(form);
            response === true ? onCheckAuthentication() : setMessage(response as string);
        }
    }

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        setMessage("");
    }

    const onCheckAuthentication = () => {
        if (userService.getToken()) {
            history.push(ROUTE.TODO_PAGE);
        }
    }

    return (
        <form data-testid='form' onSubmit={signIn} className='signIn-container'>
            <span className='app-title'>Manabie</span>
            <MyInputField
                title='User ID'
                data-testid="userId"
                name="userId"
                value={form.userId}
                style={{ marginTop: 12 }}
                onChange={onChangeField}
            />
            <br />
            <MyInputField
                title='Password'
                data-testid="password"
                name="password"
                type="password"
                style={{ marginTop: 12 }}
                value={form.password}
                onChange={onChangeField}
            />
            <br />
            {message && <ErrorMessage data-testid="error-message" label={message} />}
            <MyButton label='Sign In' disabled={!isFormValid} />
        </form>
    );
};

export default SignInPage;