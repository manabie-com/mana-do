import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import Input from 'components/FormControl/Input';
import BaseButton from 'components/BaseButton';
import Service from '../../service';

import { SingInPageWrapper, FormWrapper } from './style';
import useLocalStorage from 'hooks/useLocalStorage';
import { setLogin, clearLogin } from 'store/modules/auth/slice';
import { mockToken } from 'service/api-frontend';

const SignInPage = () => {
  const history = useHistory();
  const [, setToken] = useLocalStorage('token', '');
  const dispatch = useDispatch();
  async function submit({
    username,
    password
  }: {
    username: string;
    password: string;
  }) {
    try {
      const resp = await Service.signIn(username, password);
      if (resp === mockToken) {
        history.push('/todo');
        setToken(resp);
        dispatch(setLogin());
      } else {
        setToken('');
        dispatch(clearLogin());
      }
    } catch (error) {
      console.log(error);
    }
  }

  const defaultValues = {
    username: '',
    password: ''
  };

  const validateSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .required()
      .email('Please enter a valid email address.'),
    password: Yup.string()
      .trim()
      .required()
  });

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(validateSchema),
    mode: 'all'
  });

  return (
    <SingInPageWrapper>
      <section className='login-page'>
        <div className='login-page-nav'>Login Page</div>
        <FormWrapper>
          <div className='login-content'>
            <h2>Log in</h2>
            <FormProvider {...methods}>
              <form
                className='login-form'
                onSubmit={methods.handleSubmit(submit)}
              >
                <Input name='username' placeholder='Username' />
                <Input name='password' type='password' placeholder='Password' />
                <div>
                  <BaseButton type='submit'>Log In</BaseButton>
                </div>
              </form>
            </FormProvider>
          </div>
          <footer className='login-footer'>
            <p>Author: Cao Anh Quoc</p>
          </footer>
        </FormWrapper>
      </section>
    </SingInPageWrapper>
  );
};

export default SignInPage;
