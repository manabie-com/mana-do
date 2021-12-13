import React from 'react';
import SignInForm from '../components/signIn/SignInForm'
import '../App.css'


// Separate logic from page components
const SignInPage = () => {
    return (
      <div className="Page__container">
        <SignInForm />
      </div>
    );
};

export default SignInPage;