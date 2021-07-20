import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Service from '../../../service';
import Button, { ButtonType } from '../../atom/Button/Button';
import FormInput from '../../atom/FormInput/FormInput';
import './signInPage.scss'

const SignInPage = () => {
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });

    const history = useHistory();

    if (history.location.pathname = '/') {
        localStorage.removeItem('token')
    }


    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const resp = await Service.signIn(form.userId, form.password)
            localStorage.setItem('token', resp)
            history.push('/todo')
        }
        catch (err) {
            alert('Tên đăng nhập hoặc mật khẩu sai!')
        }
    }

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className='signIn-container'>
            <form className='signIn__form'>
                <FormInput label='User ID' name='userId' className='signIn__form-userId' value={form.userId} onChange={onChangeField} />
                <FormInput label='Password' name='password' className='signIn__form-password' value={form.password} onChange={onChangeField} type="password" />
                <Button className='btn-submit' label='SUBMIT' type={ButtonType.SUBMIT} onClick={signIn} />
            </form>
        </div>
    );
};

export default SignInPage;