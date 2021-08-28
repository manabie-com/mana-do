import React, { useReducer } from "react";

import { useHistory } from "react-router-dom";
import Service from "../service";
import TextInput from "./TextInput";
import Button from "./Button";
import "./SignInPage.scss";
import { useUserInfo } from "../context/UserInfoContext";
import Error from "./Error";
import {setLogin} from '../context/actions'

type State = {
  userInfo: { username: string; password: string };
  errorInfo: { isError: boolean; errorMessage: string };
};
type Action =
  | { type: "error" | string; payload: string }
  | {
      type: "on_change_username" | string;
      payload: string;
    }
  | {
      type: "on_change_password" | string;
      payload: string;
    };
const initialState = {
  userInfo: {
    username: "",
    password: "",
  },
  errorInfo: {
    isError: false,
    errorMessage: "",
  },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "error":
      return {
        userInfo: state.userInfo,
        errorInfo: {
          isError: true,
          errorMessage: action.payload,
        },
      };
    case "on_change_username":
      return {
        ...state,
        userInfo: {
          username: action.payload,
          password: state.userInfo.password,
        },
      };
    case "on_change_password":
      return {
        ...state,
        userInfo: {
          username: state.userInfo.username,
          password: action.payload,
        },
      };
    default:
      return {
        userInfo: {
          username: "",
          password: "",
        },
        errorInfo: {
          isError: false,
          errorMessage: "",
        },
      };
  }
}

const SignInPage = () => {
  const { state: stateInfo, dispatch: dispatchInfo } = useUserInfo();

  const [state, dispatch] = useReducer(reducer, initialState);

  const history = useHistory();

  const signIn = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      const resp = await Service.signIn(
        state.userInfo.username,
        state.userInfo.password
      );
      dispatchInfo(setLogin(state.userInfo.username));
      history.push("/todo");
    } catch (e) {
      dispatch({ type: "error", payload: e || "Error" });
    }
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    dispatch({ type: `on_change_${e.target.name}`, payload: e.target.value });
  };

  return (
    <div className="signIn">
      <div className="signIn__titleContainer">
        <div className="signIn__titleContainer__text">Sign In</div>
      </div>
      <div className="signIn__form">
        <form onSubmit={signIn}>
          <TextInput
            title="Username"
            onChange={onChangeField}
            name="username"
          />
          <TextInput
            title="Password"
            onChange={onChangeField}
            name="password"
          />
          {state.errorInfo.isError ? (
            <Error title={state.errorInfo.errorMessage} />
          ) : null}
          <Button onClick={signIn} title="Sign In" />
        </form>
      </div>
    </div>
  );
};

export default React.memo(SignInPage);
