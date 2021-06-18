import React from 'react';
import {Button} from "./Button";

type LoginFormProps = {
    onSubmit: (params:any) => any
    onChange: (params:any) => any
    userId: string
    password: string
}
export const LoginForm = (props: LoginFormProps) => {
    const {onSubmit, onChange, userId, password} = props
    return <form onSubmit={onSubmit}>
        <label htmlFor="user_id">
            User id
            <input
                id="user_id"
                name="userId"
                value={userId}
                style={{marginTop: 12}}
                onChange={onChange}
            />
        </label>
        <br/>
        <label htmlFor="password">
            Password
            <input
                id="password"
                name="password"
                type="password"
                style={{marginTop: 12}}
                value={password}
                onChange={onChange}
            />
        </label>
        <br/>
        <Button text={'Sign in'} type="submit" style={{marginTop: 12}} />
    </form>
}