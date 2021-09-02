import React from 'react';

import SignInForm from 'components/organism/SignInForm/SignInForm';
import { useSelector } from 'react-redux';
import { GlobalState } from 'modules/reducer';
import { useHistory } from 'react-router-dom';

const SignInPage = () => {
    const history = useHistory();
    
    const isLogined = useSelector((state: GlobalState) => state.isLogined)
    if(isLogined){
        history.push('/todo')
    }

    return (
        <SignInForm/>
    );
};

export default SignInPage;