import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../components/Input";
import Service from "../service";
import { validateBeforeLogin } from "../utils/validate.utils";
import { Response } from "../models/todo";
import HelmetTitle from "../components/Helmet";
import ErrorMessage from "../components/ErrorMessage";
import "../styles/SignInPage.css";
const _ = require("lodash");

const SignInPage: React.FC<any> = () => {
  const [state, setState] = useState({
    userId: "",
    password: "",
    errorMessage: "",
  });

  const history = useHistory();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { isError, message } = validateBeforeLogin(state.userId, state.password);

    if (isError) {
      setState({ ...state, errorMessage: message });
    } else {
      Service.signIn(state.userId, state.password)
        .then((response: Response) => {
          if (response.status === 200) {
            const { token } = response;

            if (token) {
              localStorage.setItem("token", token);
              history.push("/todo");
            } else {
              setState({ ...state, errorMessage: "Something went wrong, please try again." });
            }
          }
        })
        .catch((err) => {
          setState({ ...state, errorMessage: err.message });
        });
    }
  };

  const onChangeCommon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value, errorMessage: "" });
  };

  useEffect(() => {
    let usernameInput: any = document.querySelector(".username");
    let passwordInput: any = document.querySelector(".password");
    let showPasswordButton = document.querySelector(".password-button");
    let face: any = document.querySelector(".dog-face");

    passwordInput?.addEventListener("focus", () => {
      document.querySelectorAll(".hand").forEach((hand) => {
        hand.classList.add("hide");
      });
      document.querySelector(".tongue")?.classList.remove("breath");
    });

    passwordInput?.addEventListener("blur", () => {
      document.querySelectorAll(".hand").forEach((hand) => {
        hand.classList.remove("hide");
        hand.classList.remove("peek");
      });
      document.querySelector(".tongue")?.classList.add("breath");
    });

    usernameInput?.addEventListener("focus", () => {
      let length = Math.min(usernameInput?.value?.length - 16, 19);
      document.querySelectorAll(".hand").forEach((hand) => {
        hand.classList.remove("hide");
        hand.classList.remove("peek");
      });

      face?.style.setProperty("--rotate-head", `${-length}deg`);
    });

    usernameInput.addEventListener("blur", () => {
      face?.style.setProperty("--rotate-head", "0deg");
    });

    usernameInput.addEventListener(
      "input",
      _.throttle((e: any) => {
        let length = Math.min(e.target.value.length - 16, 19);

        face.style.setProperty("--rotate-head", `${-length}deg`);
      }, 100)
    );

    showPasswordButton?.addEventListener("click", () => {
      if (passwordInput?.type === "text") {
        passwordInput.type = "password";
        document.querySelectorAll(".hand").forEach((hand) => {
          hand.classList.remove("peek");
          hand.classList.add("hide");
        });
      } else {
        passwordInput.type = "text";
        document.querySelectorAll(".hand").forEach((hand) => {
          hand.classList.remove("hide");
          hand.classList.add("peek");
        });
      }
    });
  }, []);

  return (
    <div className="login-form-wrap">
      <HelmetTitle title="Login" />

      <div className="login-form">
        <div className="ear ear--left"></div>
        <div className="ear ear--right"></div>
        <div className="dog-face">
          <div className="eyes">
            <div className="eye eye--left">
              <div className="glow"></div>
            </div>
            <div className="eye eye--right">
              <div className="glow"></div>
            </div>
          </div>
          <div className="nose">
            <svg width="38.161" height="22.03">
              <path
                d="M2.017 10.987Q-.563 7.513.157 4.754C.877 1.994 2.976.135 6.164.093 16.4-.04 22.293-.022 32.048.093c3.501.042 5.48 2.081 6.02 4.661q.54 2.579-2.051 6.233-8.612 10.979-16.664 11.043-8.053.063-17.336-11.043z"
                fill="#243946"
              ></path>
            </svg>
            <div className="glow"></div>
          </div>
          <div className="mouth">
            <svg className="smile" viewBox="-2 -2 84 23" width="84" height="23">
              <path
                d="M0 0c3.76 9.279 9.69 18.98 26.712 19.238 17.022.258 10.72.258 28 0S75.959 9.182 79.987.161"
                fill="none"
                strokeWidth={3}
                strokeLinecap="square"
                strokeMiterlimit={3}
              ></path>
            </svg>
            <div className="mouth-hole"></div>
            <div className="tongue breath">
              <div className="tongue-top"></div>
              <div className="line"></div>
              <div className="median"></div>
            </div>
          </div>
        </div>
        <div className="hands">
          <div className="hand hand--left">
            <div className="finger">
              <div className="bone"></div>
              <div className="nail"></div>
            </div>
            <div className="finger">
              <div className="bone"></div>
              <div className="nail"></div>
            </div>
            <div className="finger">
              <div className="bone"></div>
              <div className="nail"></div>
            </div>
          </div>
          <div className="hand hand--right">
            <div className="finger">
              <div className="bone"></div>
              <div className="nail"></div>
            </div>
            <div className="finger">
              <div className="bone"></div>
              <div className="nail"></div>
            </div>
            <div className="finger">
              <div className="bone"></div>
              <div className="nail"></div>
            </div>
          </div>
        </div>
        <form className="login" onSubmit={signIn}>
          <label>
            <Input
              className="username"
              type="text"
              id="user_id"
              name="userId"
              placeholder="Username"
              value={state.userId}
              onChange={onChangeCommon}
            />
          </label>
          <label>
            <Input
              className="password"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={state.password}
              onChange={onChangeCommon}
            />
          </label>
          <ErrorMessage message={state.errorMessage} className="error-message" />
          <button className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
