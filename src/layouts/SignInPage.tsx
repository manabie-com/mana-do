import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Service from "../service";

const SignInPage = () => {
  const history = useHistory();
  const [inCorrect, setInCorrect] = useState(false);
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await Service.signIn(form.userId, form.password);
      setInCorrect(false);

      localStorage.setItem("token", resp);
      history.push("/todo");
    } catch (error) {
      setInCorrect(true);
    }
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="login_popup">
      <h2 className="title">Login</h2>
      <h3 className="sub_title">Login your account</h3>
      <form onSubmit={signIn} className="form_login">
        <div className={`form_group ${inCorrect ? "is_wrong" : ""}`}>
          <input
            id="user_id"
            name="userId"
            value={form.userId}
            className="form_control"
            onChange={onChangeField}
            placeholder="User name"
          />
        </div>
        <div className={`form_group ${inCorrect ? "is_wrong" : ""}`}>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            className="form_control"
            onChange={onChangeField}
            placeholder="Password"
          />
        </div>
        <div className="wrapperBtn">
          <button type="submit" className="btn_submit">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
