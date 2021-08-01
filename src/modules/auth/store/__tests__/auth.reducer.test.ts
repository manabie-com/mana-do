import Reducer from "../auth.reducer";

describe("Auth Reducers", () => {
  it("should handle the action Login_Request", () => {
    expect(
      Reducer(
        {
          isLoading: false,
          isAuthenticated: false,
          errorMessage: "",
        },
        {
          type: "AUTH_LOGIN_REQUEST",
          payload: {
            username: "firstUser",
            password: "example",
          },
        }
      )
    ).toEqual({
      isLoading: true,
      isAuthenticated: false,
      errorMessage: "",
    });
  });

  it("should handle the action Login_Success", () => {
    expect(
      Reducer(
        {
          isLoading: false,
          isAuthenticated: false,
          errorMessage: "",
        },
        {
          type: "AUTH_LOGIN_SUCCESS",
        }
      )
    ).toEqual({
      isLoading: false,
      isAuthenticated: true,
      errorMessage: "",
    });
  });

  it("should handle the action Login_Failure", () => {
    expect(
      Reducer(
        {
          isLoading: false,
          isAuthenticated: false,
          errorMessage: "",
        },
        {
          type: "AUTH_LOGIN_FAILURE",
          payload: {
            errorMessage: "Login failure",
          },
        }
      )
    ).toEqual({
      isLoading: false,
      isAuthenticated: false,
      errorMessage: "Login failure",
    });
  });

  it("should handle the action Verify_Token", () => {
    expect(
      Reducer(
        {
          isLoading: false,
          isAuthenticated: false,
          errorMessage: "",
        },
        {
          type: "AUTH_VERIFY_TOKEN",
        }
      )
    ).toEqual({
      isLoading: false,
      isAuthenticated: true,
      errorMessage: "",
    });
  });
});
