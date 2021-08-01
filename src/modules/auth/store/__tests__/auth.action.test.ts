import authActions from "../auth.action";

describe("Auth Actions", () => {
  it("should create an action when login is requested", () => {
    const payload = { username: "abc", password: "abc" };
    const expectedAction = {
      type: "AUTH_LOGIN_REQUEST",
      payload,
    };
    expect(authActions.loginRequest(payload)).toEqual(expectedAction);
  });

  it("should create an action when login is success", () => {
    const expectedAction = {
      type: "AUTH_LOGIN_SUCCESS",
    };
    expect(authActions.loginSuccess()).toEqual(expectedAction);
  });

  it("should create an action when login is failed", () => {
    const expectedAction = {
      type: "AUTH_LOGIN_FAILURE",
      payload: {
        errorMessage: "error message",
      },
    };
    expect(authActions.loginFailure("error message")).toEqual(expectedAction);
  });

  it("should create an action when verifying token", () => {
    const expectedAction = {
      type: "AUTH_VERIFY_TOKEN",
    };
    expect(authActions.verifyToken()).toEqual(expectedAction);
  });
});
