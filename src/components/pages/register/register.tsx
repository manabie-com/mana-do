import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Service from '../../../service';

const Register = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await Service.register(userName, password)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.accessToken);
                }
                window.location.href = "login";
            })
            .catch(err => {
                toast.error("username have been used!");
            });
    }
    return (
        <div className="to-do__container">
            <form className="authenticate-form" onSubmit={handleSubmit}>
                <input placeholder="Username" onChange={e => setUserName(e.target.value)} type="text"></input>
                <input placeholder="password" onChange={e => setPassword(e.target.value)} type="password"></input>
                <button type="submit">Register</button>
            </form>
            <a href="/login">Already have account? login</a>
        </div>
    );
};

export default Register;