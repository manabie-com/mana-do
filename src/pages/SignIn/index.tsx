import React from 'react';
import {useHistory} from 'react-router-dom'

import { useAuth } from '../../auth'
import Notification from '../../components/Notification'
import Loading from '../../components/Loading'

import SignInComponent from './Component'

const SignInPage = () => {
    const history = useHistory();
    const { token, logIn, error, isLoading } = useAuth()

    if (token && !error) history.push('/todo')
    if (isLoading) return <Loading />

    const signIn = async (userId: string, password: string) => {
        logIn(userId, password)
        history.push('/todo')
    }

    return (
        <>
            {error && <Notification type='error'>{error}</Notification>}
            <SignInComponent onSubmit={signIn} />
        </>
    );
};

export default SignInPage;
