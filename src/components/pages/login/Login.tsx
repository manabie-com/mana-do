import React, { useState } from "react";
import { toast } from 'react-toastify';
import Service from '../../../service';

const Login = () => {
    localStorage.setItem('token', '');
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await Service.login(userName, password)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.accessToken);
                }
                window.location.href = "todo";
            })
            .catch(err => {
                toast.error("username or password are incorrect!");
            });
    }
    return (
        <div className="to-do__container">
            <form className="authenticate-form" onSubmit={handleSubmit}>
                <input placeholder="Username" onChange={e => setUserName(e.target.value)} type="text"></input>
                <input placeholder="password" onChange={e => setPassword(e.target.value)} type="password"></input>
                <button type="submit">Login</button>
            </form>
            <a href="/register">create new account</a>
        </div>
    );
};

export default Login;