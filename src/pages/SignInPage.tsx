import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import styled from "styled-components";
import EyeIcon from "../components/svg/EyeIcon";
import EyeOffIcon from "../components/svg/EyeOffIcon";
import { useSession } from "../containers/SessionProvider";
import Service from "../service";

const Container = styled.div`
  padding-top: 5rem;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  justify-content: center;
  width: 100%;

  .login {
    max-width: 400px;
    width: 100%;

    padding: 30px 60px;

    border-radius: 10px;

    box-shadow: 0 0 5px rgb(0 0 0 / 20%);

    &__title {
      font-size: 30px;
      text-align: left;
      padding-bottom: 24px;
      font-weight: bold;
      text-align: center;
    }
  }

  .form-item {
    padding-bottom: 25px;

    &__label {
      font-weight: 600;
      padding-bottom: 10px;
    }

    &__input {
      position: relative;
      display: flex;
      align-items: center;

      input {
        width: 100%;
        min-height: 36px;
      }
    }

    &__error {
      padding-bottom: 15px;
      margin-top: -15px;
      color: red;
      font-size: 12px;
    }

    &__icon {
      position: absolute;
      z-index: 2;
      right: 0;
      width: 36px;
      height: 36px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  button {
    width: 100%;
    outline: none;
    box-shadow: unset;
    background-color: deepskyblue;
    color: white;
    font-size: 16px;
    min-height: 36px;
  }

  @media screen and (max-width: 767px) {
    padding-left: 15px;
    padding-right: 15px;

    .login {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
`;

const SignInPage = () => {
  const { signIn } = useSession();

  const [signInError, setSignInError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    userId: "",
    password: "",
  });
  const history = useHistory();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignInError("");
    try {
      const resp = await Service.signIn(form.userId, form.password);
      window.localStorage.setItem("token", resp);

      signIn();

      history.push("/todo");
    } catch (error) {
      setSignInError(error);
      setTimeout(() => {
        setSignInError("");
      }, 2000);
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
    <Container>
      <div className="login">
        <div className="login__title">Sign In</div>
        <form onSubmit={handleSignIn}>
          <div className="form-item">
            <label htmlFor="user_id">
              <div className="form-item__label">Username</div>
              <div className="form-item__input">
                <input
                  id="user_id"
                  name="userId"
                  placeholder="Username"
                  value={form.userId}
                  onChange={onChangeField}
                />
              </div>
            </label>
          </div>
          <div className="form-item">
            <label htmlFor="password">
              <div className="form-item__label">Password</div>
              <div className="form-item__input">
                <input
                  id="password"
                  name="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={onChangeField}
                />
                <div
                  className="form-item__icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </div>
              </div>
            </label>
          </div>
          {signInError && <div className="form-item__error">{signInError}</div>}
          <button type="submit">Sign in</button>
        </form>
      </div>
    </Container>
  );
};

export default SignInPage;
