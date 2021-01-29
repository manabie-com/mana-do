import React, {useState} from 'react';

import {useHistory} from 'react-router-dom'
import Service from '../service'

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
        setForm(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div style={{marginTop: '3rem', backgroundColor:'white', borderRadius:'10px', boxShadow:'5px 5px 24px -10px', textAlign: 'left', display:'flex', flexDirection: 'column', alignItems: 'center', padding:'5rem 3rem'}}>
            <h1 style={{
                textAlign: 'center', fontWeight: 400
            }}>Login</h1>
            <form onSubmit={signIn} style={{ display:'flex', flexDirection: 'column', alignItems: 'start', minWidth: '500px'}}>
                <label htmlFor="user_id" style={{ width: '100%', display:'flex', flexDirection: 'column', alignItems: 'start'}}>
                    <input
                        id="user_id"
                        name="userId"
                        placeholder="User ID"
                        value={form.userId}
                        style={{marginTop: 5, width: '100%', fontSize: '21px', textAlign: 'center', boxShadow:'none', border: 'none', backgroundColor: '#f0f0f0'}}
                        onChange={onChangeField}
                    />
                </label>
                <br/>
                <label htmlFor="password" style={{width: '100%', display:'flex', flexDirection: 'column', alignItems: 'start'}}>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder='Password'
                        style={{marginTop: 5, width: '100%', fontSize: '21px', textAlign: 'center', boxShadow:'none', border: 'none', backgroundColor: '#f0f0f0'}}
                        value={form.password}
                        onChange={onChangeField}
                    />
                </label>
                <br />
                <button type="submit" 
                        style={{marginTop: 5, backgroundColor:'#56baec',  boxShadow:'2px 5px 14px -10px #000', color:'white', alignSelf:'center', cursor:'pointer', padding:'1rem 5rem', fontSize: '21px', borderRadius:'13px'}}>
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default SignInPage;