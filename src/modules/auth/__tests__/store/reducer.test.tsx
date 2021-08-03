import authReducer from '../../store/reducer';

describe("Auth Reducers", () => {
  it("should handle the action Login_Request", () => {
    expect(
      authReducer(
        {
          isLoading: false,
          isAuthenticated: false,
          error: "",
        },
        {
          type: "LOGIN_REQUEST",
          payload: {
            username: "firstUser",
            password: "example",
          },
        }
      )
    ).toEqual({
      isLoading: true,
      isAuthenticated: false,
      error: "",
    });
  });

  it("should handle the action Login_Success", () => {
    expect(
      authReducer(
        {
          isLoading: false,
          isAuthenticated: false,
          error: "",
        },
        {
          type: "LOGIN_SUCCESS",
        }
      )
    ).toEqual({
      isLoading: false,
      isAuthenticated: true,
      error: "",
    });
  });

  it("should handle the action Login_Failure", () => {
    expect(
      authReducer(
        {
          isLoading: false,
          isAuthenticated: false,
          error: "",
        },
        {
          type: "LOGIN_FAILURE",
          payload: {
            error: "Login failure",
          },
        }
      )
    ).toEqual({
      isLoading: false,
      isAuthenticated: false,
      error: "Login failure",
    });
  });

  it("should handle the action Verify_Token", () => {
    expect(
      authReducer(
        {
          isLoading: false,
          isAuthenticated: false,
          error: "",
        },
        {
          type: "VERIFY_TOKEN",
        }
      )
    ).toEqual({
      isLoading: false,
      isAuthenticated: true,
      error: "",
    });
  });
});