import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ButtonConfirm from '../../components/Buttons/ButtonConfirm';
import FormBasic from '../../components/Forms/FormBasic';
import InputSingle from '../../components/Inputs/InputSingle';
import LabelForm from '../../components/Labels/LabelForm';
import Center from '../../components/Layouts/Center';
import Column from '../../components/Layouts/Column';
import FullHeight from '../../components/Layouts/FullHeight';
import Row from '../../components/Layouts/Row';
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
    <FullHeight fullWidth>
      <Center fullWidth>
        <FormBasic onSubmit={signIn}>
          <Column g={2}>
            <Row fullWidth>
              <LabelForm htmlFor="user_id" label="User ID" />
              <InputSingle
                id="user_id"
                name="userId"
                value={form.userId}
                onChange={onChangeField}
              />
            </Row>

            <Row fullWidth>
              <LabelForm htmlFor="password" label="Password" />
              <InputSingle
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={onChangeField}
              />
            </Row>

            <Row fullWidth>
              <Center fullWidth>
                <ButtonConfirm type="submit">
                  Sign In
                </ButtonConfirm>
              </Center>
            </Row>
          </Column>

        </FormBasic>
      </Center>
    </FullHeight>
  );
};

export default SignInPage;