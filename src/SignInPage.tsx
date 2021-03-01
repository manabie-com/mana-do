import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import Service from "./service";
import "./css/signIn.css";
import "./js/signIn";
import background1 from "./img/bg-01.jpg";
import background2 from "./img/bg-02.jpg";
import backgroundTitle from "./img/bg-01-title.jpg";
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
    <div className="limiter">
      <div className="container-login">
        <div className="wrap-login">
          {/* login-form */}
          <div
            className="form-login"
            style={{ marginTop: "-6rem", textAlign: "left" }}
          >
            <div
              className="login-form-title"
              style={{ backgroundImage: `url(${backgroundTitle})` }}
            >
              <span className="login-form-title-1">Account Login</span>
            </div>
            <form className="form-setting" onSubmit={signIn}>
              <label className="label-input" htmlFor="user_id">
                User id
                <div className="wrap-input rs1-wrap-input">
                  <input
                    className="input-custom"
                    id="user_id"
                    name="userId"
                    value={form.userId}
                    style={{ marginTop: 12 }}
                    onChange={onChangeField}
                  />
                  <span className="focus-input"></span>
                </div>
              </label>
              <br />
              <label className="label-input" htmlFor="password">
                Password
                <div className="wrap-input rs2-wrap-input">
                  <input
                    className="input-custom"
                    id="password"
                    name="password"
                    type="password"
                    style={{ marginTop: 12 }}
                    value={form.password}
                    onChange={onChangeField}
                  />
                  <span className="focus-input"></span>
                </div>
              </label>
              <br />
              <input
                className="input-checkbox"
                id="ckb1"
                type="checkbox"
                name="remember-me"
              />
              <label className="label-checkbox" htmlFor="ckb1">
                Remember me
              </label>
              <br />
              <div className="container-login-form-btn">
                <button
                  className="login-form-btn"
                  type="submit"
                  style={{ marginTop: 12 }}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
          {/* login-slider */}
          <div id="login-more">
            <div id="div-login">
              <img
                className="login-img login-img-color"
                src={background1}
                alt="pic1"
              />
              <div className="slider-caption justify-content-center">
                <div className="col-10 align-center">
                  <h2 className="display-h2">Slide 1</h2>
                  <p className="display-p">Content on Slide 1</p>
                </div>
              </div>
            </div>
            <div id="div-login">
              <img
                className="login-img login-img-color"
                src={background2}
                alt="pic2"
              />
              <div className="slider-caption justify-content-center">
                <div className="col-10 align-center">
                  <h2 className="display-h2">Slide 2</h2>
                  <p className="display-p">Content on Slide 2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
