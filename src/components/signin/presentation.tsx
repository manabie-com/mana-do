/**
 * For applying presentation component pattern
 * Split UI process and logic process.
 */
import React from 'react';

import Form from 'root/components/commons/form'

import './_signin.css'

export type SignInProps = {
  signin: Function
  form: any
  onChangeField: Function,
  model: any
}

const text = {
  /** help to concentrate all text, easy to edit text or apply multi-language feature */
  signIn: 'Sign in'
}

const SigninPresentation = (props: SignInProps) => {
  const { signin, form, onChangeField, model } = props

  return (
    <div className='login-container'>
      <div className='left-panel'></div>
      <div className='right-panel'>
        <Form
          model={model}
          formData={form}
          onUpdateField={onChangeField}
          onSubmit={signin}
          submitText={text.signIn}
        />
      </div>
    </div>
  );
};

//use shallowly compare complex objects in the props object
export default React.memo(SigninPresentation);