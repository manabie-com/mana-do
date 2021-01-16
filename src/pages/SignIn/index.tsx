import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ButtonNeutral from '../../components/Buttons/ButtonNeutral';
import FormBasic from '../../components/Forms/FormBasic';
import InputSingle from '../../components/Inputs/InputSingle';
import LabelForm from '../../components/Labels/LabelForm';
import Center from '../../components/Layouts/Center';
import Column from '../../components/Layouts/Column';
import Service from '../../service';
const SignInPage = () => {
  const [form, setForm] = useState({
    userId: '',
    password: ''
  });
  const history = useHistory();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const resp = await Service.signIn(form.userId, form.password)

    localStorage.setItem('token', resp)
    history.push('/todo')
  }

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Center fullWidth>
      <FormBasic onSubmit={signIn}>
        <Column g={2}>
          <Column fullWidth g={1}>
            <LabelForm htmlFor="user_id" label="User ID" />
            <InputSingle
              placeholder='Enter your username...'
              id="user_id"
              name="userId"
              value={form.userId}
              onChange={onChangeField}
            />
          </Column>

          <Column fullWidth g={1}>
            <LabelForm htmlFor="password" label="Password" />
            <InputSingle
              placeholder='Enter your password'
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={onChangeField}
            />
          </Column>

          <Column fullWidth>
            <Center fullWidth>
              <ButtonNeutral type="submit">
                Sign In
                </ButtonNeutral>
            </Center>
          </Column>
        </Column>

      </FormBasic>
    </Center>
  );
};

export default SignInPage;