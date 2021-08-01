import { Dispatch } from "react";
import authAction from "../auth.action";
import {
  ACTION_TYPES,
  IAuthActions,
  ILoginRequestAction,
  IVerifyTokenAction,
} from "../auth.constant";
import { handleLogin, handleVerifyToken } from "../auth.middleware";

describe("Auth Middleware", () => {
  it("should call dispatch when login is success", async () => {
    const action = authAction.loginRequest({
      username: "firstUser",
      password: "example",
    }) as ILoginRequestAction;
    const dispatch = jest.fn() as Dispatch<IAuthActions>;
    await handleLogin(dispatch, action);
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: ACTION_TYPES.LOGIN_SUCCESS,
    });
  });

  it("should call dispatch when login is failure", async () => {
    const action = authAction.loginRequest({
      username: "firstUser",
      password: "abc",
    }) as ILoginRequestAction;
    const dispatch = jest.fn() as Dispatch<IAuthActions>;
    await handleLogin(dispatch, action);
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: ACTION_TYPES.LOGIN_FAILURE,
      payload: {
        errorMessage: "Incorrect username/password",
      },
    });
  });

  it("should call dispatch when token is valid", async () => {
    const dispatch = jest.fn() as Dispatch<IAuthActions>;
    await handleVerifyToken(dispatch);
    expect(dispatch).toBeCalled();
    expect(dispatch).toBeCalledWith({
      type: ACTION_TYPES.LOGIN_SUCCESS,
    });
  });
});
