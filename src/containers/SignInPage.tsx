import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import SignInComponent from 'root/components/signin'

const SignInPage = (props: RouteComponentProps) => {
    const signInProps = {}
    return (
        <SignInComponent {...signInProps}/>
    );
};

export default SignInPage;