import React from 'react';

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
    <div style={{ marginTop: '3rem', textAlign: 'left' }}>
      <form onSubmit={signIn}>
        <label htmlFor='user_id'>
          {text.userId}
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
          {text.password}
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
        <button type='submit' style={{ marginTop: 12 }}>
          {text.signIn}
        </button>
      </form>
    </div>
  );
};

export default SignInPresentation;