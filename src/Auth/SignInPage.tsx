import React, { useState, useCallback, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";
import Service from "../service";
import Can from "./Can";
import authContext, { AuthConsumer } from "./authContext";

const SignInPage = () => {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();
  const { handleAuthentication } = useContext(authContext);

  const signInRefactor = useCallback(
    (e) => {
      e.preventDefault();
      setIsLoading(true);
      handleAuthentication(userId, password, (status) => {
        if (status === "success") {
          history.push("/todo");
        } else {
          setIsLoading(false);
          setErrorMsg("Oops! Something when wrong.");
        }
      });
    },
    [userId, password, history, handleAuthentication]
  );

  return (
    <div className="signin-page">
      <div className="signin-background">
        <img
          className="img-fluid"
          src="https://image.freepik.com/free-photo/stunning-sky-big-dark-clouds-background_79720-43.jpg"
          alt="login background"
        />
      </div>
      <div className="signin-form">
        <h1 className="form-title">Please Sign In!</h1>
        <form onSubmit={signInRefactor}>
          <div className="form-group">
            <label className="form-label" htmlFor="user_id">
              User id
            </label>
            <input
              id="user_id"
              className="form-input"
              name="userId"
              value={userId}
              style={{ marginTop: 12 }}
              onChange={(e) => {
                setUserId(e.target.value);
              }}
              placeholder="User Name"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="form-input"
              name="password"
              type="password"
              style={{ marginTop: 12 }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
          </div>
          <button
            className="form-button"
            type="submit"
            style={{ marginTop: 12 }}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign in"}
          </button>
          {errorMsg && <div className="form-error">{errorMsg}</div>}
        </form>
      </div>
    </div>
  );
};

const SignInPageWithCan: React.FC = () => {
  return (
    <AuthConsumer>
      {({ user }) => (
        <Can
          role={user.role}
          perform={"login"}
          yes={() => <SignInPage />}
          no={() => <Redirect to="/todo" />}
        />
      )}
    </AuthConsumer>
  );
};

export default SignInPageWithCan;
