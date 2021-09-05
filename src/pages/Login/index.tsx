import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { login } from "./Login.thunks";
import { Title, Container } from "./Login.styles";
import { useHistory } from "react-router-dom";
import { PATH } from "constants/paths";
import logoImg from "assets/images/logo.svg";

import {
  InputLabel,
  Input,
  LabelRequired,
  InputContainer,
  InputEndAdornment,
} from "styles/Input.styles";
import { Button } from "styles/Button.styles";
import { Alert } from "styles/Alert.styles";
import { FiAlertOctagon } from "react-icons/fi";
import { IoAlertCircle, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const mapStateToProps = (state) => {
  return {
    loading: state.login.loading,
  };
};

const mapDispatchToProps = {
  login,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export interface Props extends ConnectedProps<typeof connector> {}

const Login = (props: Props) => {
  const history = useHistory();
  const { login, loading } = props;
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    username: "",
    password: "",
  });

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setErrorMessage((prev: any) => ({
      ...prev,
      username: "",
    }));
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setErrorMessage((prev: any) => ({
      ...prev,
      password: "",
    }));
  };

  const handleError = () => {
    if (!username) {
      setErrorMessage((prev: any) => ({
        ...prev,
        username: "Username is required.",
      }));
    }
    if (!password) {
      setErrorMessage((prev: any) => ({
        ...prev,
        password: "Password is required.",
      }));
    }
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username || !password || loading) {
      handleError();
      return;
    }

    const payload = { username, password };
    login(payload)
      .then((res) => {
        history.push(PATH.HOME);
      })
      .catch((err) => {
        setError(err.payload.message);
      });
  };

  return (
    <Container>
      <div>
        <div>
          <form onSubmit={submit} id="login-form">
            <Title className="text-center">
              <img src={logoImg} width="150px" height="50px" alt="logo" />
              <br />
              Welcome to my Todo List Challenge
            </Title>

            {error && (
              <Alert>
                <FiAlertOctagon fontSize="24px" />{" "}
                <span className="pl-8">{error}</span>
              </Alert>
            )}
            <div className="pv-8">
              <InputLabel>Username</InputLabel>
              <LabelRequired>*</LabelRequired>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                onChange={handleUsername}
                className={errorMessage?.username ? "border-err" : ""}
              />
              {errorMessage?.username && (
                <div className="text-error pl-8 flex-box">
                  <IoAlertCircle />
                  <span className="pl-8">{errorMessage?.username}</span>
                </div>
              )}
            </div>

            <div className="pv-8">
              <InputLabel>Password</InputLabel>
              <LabelRequired>*</LabelRequired>
              <InputContainer>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handlePassword}
                  className={errorMessage?.password ? "border-err" : ""}
                />
                <InputEndAdornment>
                  <div
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <IoEyeOutline color="gray" />
                    ) : (
                      <IoEyeOffOutline color="gray" />
                    )}
                  </div>
                </InputEndAdornment>
              </InputContainer>

              {errorMessage?.password && (
                <div className="text-error pl-8 flex-box">
                  <IoAlertCircle />
                  <span className="pl-8">{errorMessage?.password}</span>
                </div>
              )}
            </div>
            <div className="pv-8 text-center">
              <Button type="submit">Login</Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default connector(Login);
