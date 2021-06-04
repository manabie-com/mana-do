import React, {FormEvent, useState} from "react";
import MEditableField from "../../commons/MEditableField/MEditableField";
import MButton from "../../commons/MButton/MButton";

interface SignInPageViewProps {
  signInAction: (userId: string, password: string) => void,
  errorMessage?: string
}

const SignInPageView = ({
  signInAction: signIn,
  errorMessage
}: SignInPageViewProps) => {
  const [form, setForm] = useState({
    userId: '',
    password: ''
  });

  const onChangeField = (fieldName: string, fieldValue: string) => {
    setForm(prev=>({
      ...prev,
      [fieldName]: fieldValue
    }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    signIn(form.userId, form.password);
  }

  return (
    <div style={{marginTop: '3rem', textAlign: 'left'}}>
      <form onSubmit={onSubmit}>
        <label htmlFor='user_id'>
          User Id
          <MEditableField
            id='user_id'
            value={form.userId}
            style={{marginTop: 12}}
            alwaysEditMode={true}
            actionOnChange={(value) => onChangeField('userId', value)}/>
        </label>
        <br/>
        <label htmlFor='password' >
          Password
          <MEditableField
            id='user_password'
            type='password'
            value={form.password}
            style={{marginTop: 12}}
            alwaysEditMode={true}
            actionOnChange={(value) => onChangeField('password', value)}/>
        </label>
        <br />
        {
          errorMessage ? <div className='error-message'>{errorMessage}</div> : ''
        }
        <MButton
          type="submit"
          style={{marginTop: 12}}
        >
          Sign in
        </MButton>
      </form>
    </div>
  );
};

export default SignInPageView;
