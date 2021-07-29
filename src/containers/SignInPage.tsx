import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import SignInComponent from 'root/components/signin'

const SignInPage = (props: RouteComponentProps) => {
    return (
        <SignInComponent />
    );
};

export default SignInPage;