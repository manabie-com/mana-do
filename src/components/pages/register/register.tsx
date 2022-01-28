import React, { useState } from "react";
import Service from '../../../service';

const Register = () => {
    useState()
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await Service.register(userName, password)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.accessToken);
                }
            });
            window.location.href = "login";
    }
    return (
        <div className="to-do__container">
            <form onSubmit={handleSubmit}>
                <label><p>UserName</p><input onChange={e => setUserName(e.target.value)} type="text"></input></label>
                <label><p>Password</p><input onChange={e => setPassword(e.target.value)} type="password"></input></label>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;