import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from 'react-router-dom';

import "./index.scss";
import Input from '../../components/common/input/input';
import { signIn, resetError } from './signin.slice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignInPage = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const history = useHistory();

  const dispatch = useDispatch();
  const signInRequesting = useSelector((state: any) => state.signIn.loading);
  const user = useSelector((state: any) => state.signIn.user);
  const signInError = useSelector((state: any) => state.signIn.error);

  useEffect(() => {
    if (user) {
      localStorage.setItem('token', user);
      history.push('/todo');
    }
  }, [user, history]);

  useEffect(() => {
    if (signInError) {
      toast.error("Sign In failed. Please check your account!", { autoClose: 2000 });
    }

    return () => {
      dispatch(resetError());
    }
  }, [dispatch, signInError]);

  const onClickSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(signIn(form.username, form.password));
  }

  const onChangeField = (name: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="sign-in-page">
      <h3 className="header">Sign In</h3>
      <form className="form-login" onSubmit={onClickSignIn}>

        <div className="username-input">
          <Input id="username" name="username" label="Username" type="text" value="" onChangeValue={(name, value) => onChangeField(name, value)} />
        </div>

        <div className="password-input">
          <Input id="password" name="password" label="Password" type="password" value="" onChangeValue={(name, value) => onChangeField(name, value)} />
        </div>

        <button id="btn-signin" className="button" type="submit" disabled={signInRequesting}>
          {signInRequesting ? "Sign In" : "Signing In"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default SignInPage;