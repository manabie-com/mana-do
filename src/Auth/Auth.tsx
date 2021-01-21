import React, { Component } from "react";
import { AuthProvider, IAuthContext } from "./authContext";
import Service from "../service";
import Spinner from "../components/Spinner";
import { Profile } from "../models/user";

interface State {
  authenticated: boolean;
  user: Profile;
  accessToken: string;
}

interface Props {}

class Auth extends Component<Props, State> {
  state = {
    isLoading: true,
    authenticated: false,
    user: {
      role: "visitor",
    } as Profile,
    accessToken: "",
  };

  initiateLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const user = await Service.authorize(token);
        this.setState((state) => {
          return {
            ...state,
            user,
          };
        });
        return;
      }
    } catch (error) {
      // TODO: Authen Error now will delete token
      // IT SHOULD ASSERT IF TOKEN IS EXPIRED OR WRONG TOKEN
      localStorage.removeItem("token");
    } finally {
      this.setState((state) => {
        return {
          ...state,
          isLoading: false,
        };
      });
    }
  };

  logout = () => {
    this.setState({
      authenticated: false,
      user: {
        role: "visitor",
      },
      accessToken: "",
    });
  };

  handleAuthentication = async (
    userId: string,
    password: string,
    callback?: (status: "success" | "fail") => void
  ) => {
    try {
      const accessToken = await Service.signIn(userId, password);
      const profile = await Service.authorize(accessToken);
      localStorage.setItem("token", accessToken);
      this.setState(
        {
          authenticated: true,
          user: profile,
          accessToken,
        },
        () => {
          if (callback && typeof callback === "function") {
            callback("success");
          }
        }
      );
    } catch (error) {
      if (callback && typeof callback === "function") {
        callback("fail");
      }
    }
  };

  componentDidMount() {
    this.initiateLogin();
  }

  render() {
    const authProviderValue: IAuthContext = {
      ...this.state,
      initiateLogin: this.initiateLogin,
      handleAuthentication: this.handleAuthentication,
      logout: this.logout,
    };
    const { isLoading } = this.state;
    return (
      <AuthProvider value={authProviderValue}>
        {isLoading ? <Spinner /> : this.props.children}
      </AuthProvider>
    );
  }
}

export default Auth;
