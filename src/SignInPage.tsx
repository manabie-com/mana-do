import React, {useState} from 'react';

import {useHistory} from 'react-router-dom'
import Service from './service'

const SignInPage = () => {
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });
    const [error, setError] = useState('');
    const history = useHistory();

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const resp = await Service.signIn(form.userId, form.password)
            localStorage.setItem('token', resp)
            history.push('/todo')
        } catch (error){
            setError(error);
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
        <div className="form">
            <div className="form-header container-fluid">
                <div className="row container__main form-header__content ">
                    <div className="other_height"></div>
                </div>
            </div>
            <div className="form-logo">
                <div className="form-logo__bg">
                    <div className="form-logo__title">
                        <span>TODOS</span>
                    </div>
                </div>
            </div>
            <div className="container__form">
                <div className="other_title">Hello, who's this?</div>
                <form onSubmit={signIn} className="form__content">
                    <div className="form-group">
                    <label htmlFor="user_id">Username</label>
                        <input
                            id="user_id"
                            name="userId"
                            value={form.userId}
                            onChange={onChangeField}
                            placeholder="firstUser"
                            className="form-control" required/>
                    </div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={onChangeField}
                        placeholder="*******"
                        className="form-control" required/>
                    <div className="todos-error">{error}</div>
                    <button type="submit" className="btn btn-form-submit btn-block">
                        Login to TODOS
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;
