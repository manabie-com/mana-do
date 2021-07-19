import React, {useState} from 'react';

import {useHistory} from 'react-router-dom'
import SignInService from '../../service/sign-in'
import TextField from '../../components/TextField';
import { SecondaryButton } from '../../components/Button';
import styled from 'styled-components';
import { Title, Label } from '../../components/Title';
import { ErrorMsg } from '../to-do';

const SignInContainer = styled.div
`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: left;
`

const Form = styled.form
`
    border: 1px solid rgba(0,0,0, 0.13);
    padding: 40px;
    border-radius: 5px;
    background-color: #dce6f5;
`

const SignInPage = () => {
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });                                                                                                                                                                             
    const history = useHistory();
    const [errorMsg, setErrorMsg] = useState<string>("");

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const resp = await SignInService.signIn(form.userId, form.password)
        if (resp.statusCode === 200) {
            localStorage.setItem('token', resp.data)
            history.push('/todo')
        } else {
            showErrorMsg(resp.message)
        }
        
    }

    const showErrorMsg = (msg: string) => {
        setErrorMsg(msg)
        setTimeout(() => {
            setErrorMsg("")
        }, 3000)
    }

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setForm(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <SignInContainer>
            <Title>Sign in to Manabie</Title>
            {errorMsg != "" && (
                <ErrorMsg>
                    {errorMsg}
                </ErrorMsg>
            )}
            <Form onSubmit={signIn}>
                <Label htmlFor="user_id">
                    Username 
                    <TextField
                        id="user_id"
                        name="userId"
                        value={form.userId}
                        style={{marginTop: 12}}
                        onChange={onChangeField}
                    />
                </Label>
                <br/>
                <Label htmlFor="password" >
                    Password
                    <TextField
                        id="password"
                        name="password"
                        type="password"
                        style={{marginTop: 12}}
                        value={form.password}
                        onChange={onChangeField}
                    />
                </Label>
                <br />
                <SecondaryButton type="submit" style={{marginTop: 20, width: '100%', height: 70}}>
                    Sign in
                </SecondaryButton>
            </Form>
        </SignInContainer>
    );
};

export default SignInPage;