import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import Service from '../../service';
import './style.scss';
import background from '../../assets/images/background.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
const prefix = 'sign-in';
const SignInContainer = () => {
  //state
  const [form, setForm] = useState({
    userId: '',
    password: '',
  });
  const [state, setState] = useState({
    msgErr: null
  });
  
  const history = useHistory();
  //function 
  async function signIn(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await Service.signIn(form.userId, form.password)
      .then((resp) => {
        if (resp) {
          localStorage.setItem('token', resp);
          history.push('/todo');
        }
      })
      .catch((err) => 
      {
        setState({...state, msgErr: err})
      });
  };
  const onChangeField = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className={prefix}>
      <div className={`${prefix}__logo`}>
        <img src={background} alt="none" />
      </div>
      <div className={`${prefix}__content`}>
        <form onSubmit={signIn} className={`${prefix}__content__form`}>
          <div className={`${prefix}__content__form__item`}>
            <Input
              label="User ID"
              id="user_id"
              name="userId"
              value={form.userId}
              onChange={onChangeField}
            />
          </div>
          <div className={`${prefix}__content__form__item`}>
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={onChangeField}
            />
          </div>
          {state.msgErr && <span className="isErr">{state.msgErr}</span>}
          <div className={`${prefix}__content__form__item`}>
            <Button type="submit" size="large" colorType="success"> Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInContainer;
