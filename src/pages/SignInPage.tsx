import React from 'react';
import SignInContainer from '../containers/SignIn';
import { isAuthentication } from '../utils';
import { Redirect } from 'react-router-dom';

const SignInPage = () => {
    if (isAuthentication()) {
        return <Redirect to='/todo' />
    }
    return (
        <SignInContainer />
    );
};

export default SignInPage;