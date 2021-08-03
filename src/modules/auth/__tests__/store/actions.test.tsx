import {loginSuccessfully, loginUnSuccessfully, requestLogin, verifyToken} from '../../store/actions';

describe("Auth Actions", () => {
  it("should create an action when user login", () => {
    const payload = { username: "abc", password: "abc" };
    const expectedAction = {
      type: "LOGIN_REQUEST",
      payload,
    };
    expect(requestLogin(payload)).toEqual(expectedAction);
  });

  it("should create an action when login successfully", () => {
    const expectedAction = {
      type: "LOGIN_SUCCESS",
    };
    expect(loginSuccessfully()).toEqual(expectedAction);
  });

  it("should create an action when login unsuccessfully", () => {
    const expectedAction = {
      type: "LOGIN_FAILURE",
      payload: {
        error: "error message",
      },
    };
    expect(loginUnSuccessfully("error message")).toEqual(expectedAction);
  });

  it("should create an action when verify token", () => {
    const expectedAction = {
      type: "VERIFY_TOKEN",
    };
    expect(verifyToken()).toEqual(expectedAction);
  });
});