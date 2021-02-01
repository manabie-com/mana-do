/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useHistory } from "react-router-dom";
import { useImmer } from "use-immer";
import Button from "../components/Button";
import Input from "../components/Input";
import Service from "../service";
import { validateBeforeLogin } from "../utils/validate.utils";
import { Response } from "../models/todo";
import HelmetTitle from "../components/Helmet";
import ErrorMessage from "../components/ErrorMessage";

const SignInPage: React.FC<any> = () => {
  const [state, setState] = useImmer({
    userId: "",
    password: "",
    errorMessage: "",
  });

  const setStateCommon = (objects: any) => {
    Object.keys(objects).forEach((key) => {
      setState((draft: any) => {
        draft[key] = objects[key];
      });
    });
  };

  const history = useHistory();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { isError, message } = validateBeforeLogin(
      state.userId,
      state.password
    );

    if (isError) {
      setStateCommon({ errorMessage: message });
    } else {
      Service.signIn(state.userId, state.password)
        .then((response: Response) => {
          if (response.status === 200) {
            const { token } = response;

            if (token) {
              localStorage.setItem("token", token);
              history.push("/todo");
            } else {
              setStateCommon({
                errorMessage: "Something went wrong, please try again.",
              });
            }
          }
        })
        .catch((err) => {
          setStateCommon({ errorMessage: err.message });
        });
    }
  };

  const onChangeCommon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStateCommon({ [name]: value, errorMessage: "" });
  };

  return (
    <div className="Login__WrapperForm">
      <HelmetTitle title="Login" />
      <form onSubmit={signIn}>
        <span className="Login__FormTitle">Sign in</span>
        <div className="Login__WrapperInputs">
          <Input
            id="user_id"
            name="userId"
            placeholder="User ID"
            valueWidth="90%"
            value={state.userId}
            onChange={onChangeCommon}
          />
          <Input
            id="password"
            name="password"
            type="password"
            valueWidth="90%"
            placeholder="Password"
            value={state.password}
            onChange={onChangeCommon}
          />
          <ErrorMessage
            message={state.errorMessage}
            className="Login__ErrorMessage"
          />
          <Button
            type="submit"
            name="buttonLogin"
            className="Login__ButtonSubmit"
            label="Sign in"
            valueWidth="90%"
          />
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
