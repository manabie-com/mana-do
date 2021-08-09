import React, {useState} from 'react';

import {useHistory} from 'react-router-dom'
import Service from '../../service'
import {APP_STORAGE_KEYS} from '../../utils/appConst'
import {portalLayouts} from "../../navigation/router.config"
import FormInput from "../../components/Molecules/FormInput"
import Button from "../../components/Atoms/Button"
import './SignInPage.css'

const SignInPage = () => {
  const [form, setForm] = useState({
    userId: '',
    password: ''
  });
  const history = useHistory();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const resp = await Service.signIn(form.userId, form.password)

    localStorage.setItem(APP_STORAGE_KEYS.token, resp)
    history.push(portalLayouts.todoPage)
  }

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div id="Page__Login">
      <form onSubmit={signIn}>
        <div className="Form__wrapper card">
            <h3 className="Form__title">Sign In</h3>
            <FormInput value={form.userId} label="User Id"
                   id="user_id"
                   name="userId"
                   inputStyle={styles.inputStyle}
                   onChangeField={onChangeField}
            />
            <FormInput value={form.password} label="Password"
                   id="password"
                   name="password"
                   inputStyle={styles.inputStyle}
                   onChangeField={onChangeField}
                   type="password"
            />
            <Button text="Sign in" type="submit" className="Form__btn_submit"/>
        </div>
      </form>
      <div className="Page__Login__background">
        <img src="/assets/background/login-bg.svg"/>
      </div>
    </div>
  );
};

export default SignInPage;

const styles = {
  container: {},
  inputStyle: {marginTop: 12}
}
