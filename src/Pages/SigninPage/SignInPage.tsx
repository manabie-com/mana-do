import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import Service from "../../service";

const SignInPage = () => {
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });
  const history = useHistory();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await Service.signIn(form.userId, form.password);
    
    localStorage.setItem("token", resp);
    history.push("/todo");
    
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="formSignin__container">
      <div className="formSignin">
        <form onSubmit={signIn}>
          <h1 style={{ textAlign: "center" }}>Login</h1>
          <div className="wrap-input">
            <label htmlFor="user_id">
              <p>User id</p>

              <input
                id="user_id"
                name="userId"
                value={form.userId}
                onChange={onChangeField}
                placeholder='Type your user id'
              />
            </label>
          </div>
      
          <div className="wrap-input">
            <label htmlFor="password">
              <p>Password</p>

              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={onChangeField}
                placeholder='Type your password'
              />
            </label>
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <button className='formSignin__btn' type="submit">
            Sign in
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
