import React, {useState} from 'react';

import {useHistory} from 'react-router-dom'
import Service from './service'

const SignInPage = () => {
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });
    const [warning, setWarning] = useState("");
    const history = useHistory();

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        Service.signIn(form.userId, form.password).then(resp =>{
            localStorage.setItem('token', resp)
            history.push('/todo')
        }).catch((error) => {
             setWarning(error);
        });
    }

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setForm((prev:any)=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className={"sign-in-form"} style={{ textAlign: 'left'}}>
           <img src={"/logo.png"} width={"100%"} height={"auto"}   />
            <form onSubmit={signIn} style={{padding: "25px"}}>
                <label htmlFor="user_id">
                    <input
                        id="user_id"
                        name="userId"
                        placeholder="user id"
                        value={form.userId}
                        style={{marginTop: 12, width:"calc(100% - 20px)"}}
                        onChange={onChangeField}
                    />
                </label>
                <br/>
                <label htmlFor="password">
                    <input
                        id="password"
                        name="password"
                        placeholder="password"
                        type="password"
                        style={{marginTop: 12 ,width:"calc(100% - 20px)"}}
                        value={form.password}
                        onChange={onChangeField}
                    />
                </label>
                <br />
                <p className={"warning"}>{warning}</p>
                <button className={"sign-in-btn"}  type="submit" >
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default SignInPage;