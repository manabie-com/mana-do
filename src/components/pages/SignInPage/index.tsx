import { SignInForm } from 'components/organisms';
import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom'
import Service from 'service';
import { setAuth } from 'store/actions';
import { StoreContext } from 'store/provider';

const SignInPage = () => {
    const history = useHistory();
    const { dispatch } = useContext(StoreContext);
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const resp = await Service.signIn(form.userId, form.password);
        localStorage.setItem('token', resp);
        dispatch(setAuth(true));
        history.push('/todo');
    }

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setForm(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="row">
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 m-auto">
                <div className="SignInPage">
                    <SignInForm signIn={signIn} onChangeField={onChangeField} form={form} />
                </div>
            </div>
        </div>
    );
};

export default SignInPage;