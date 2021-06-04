import React, {useEffect, useState} from 'react';

import {useHistory} from 'react-router-dom'
import Service from '../../../service'
import SignInPageView from './SignInPageView';

const SignInPage = () => {
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('token');
        const authorization = async (token: string) => {
            try {
                await Service.authorize(token);
                history.push('/todo');
            } catch(e) {}
        }
        if (token) {
            authorization(token);
        }
    });

    const signIn = async (userId: string, password: string) => {
        try {
            const resp = await Service.signIn(userId, password)
            localStorage.setItem('token', resp)
            history.push('/todo')
        } catch (e) {
            setErrorMessage(e);
        }
    }

    return (
        <SignInPageView signInAction={signIn} errorMessage={errorMessage}/>
    );
};

export default SignInPage;
