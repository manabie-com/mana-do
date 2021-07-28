import React from 'react';

import './_signin.css'
export interface ISignInForm {
  userId: string,
  password: string
}

export type SignInProps = {
  signIn: React.FormEventHandler
  form: ISignInForm
  onChangeField: React.ChangeEventHandler<HTMLInputElement>
}

const text = {
  userId: 'User id',
  password: 'Password',
  signIn: 'Sign in'
}

const SignInPresentation = (props: SignInProps) => {
  const { signIn, form, onChangeField } = props

  return (
    <div className='login-container'>
      <div className='left-panel'></div>
      <div className='right-panel'>
        <form onSubmit={signIn}>
          <label htmlFor='user_id'>
            <h2>{text.userId}</h2>
            <input
              id='user_id'
              name='userId'
              value={form.userId}
              style={{ marginTop: 12 }}
              onChange={onChangeField}
            />
          </label>
          <br />
          <label htmlFor='password' >
            <h2>{text.password}</h2>
            <input
              id='password'
              name='password'
              type='password'
              style={{ marginTop: 12 }}
              value={form.password}
              onChange={onChangeField}
            />
          </label>
          <br />
          <div className='actions'>
            <button type='submit'>
              {text.signIn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(SignInPresentation);