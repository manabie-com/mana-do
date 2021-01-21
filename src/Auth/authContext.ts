import { createContext } from "react";
import { Profile } from "../models/user";

export interface IAuthContext {
  isLoading: boolean;
  authenticated: boolean;
  user: Profile;
  accessToken: string;
  initiateLogin: () => void;
  handleAuthentication: (
    userId: string,
    password: string,
    callback: (status: "success" | "fail") => void
  ) => void;
  logout: () => void;
}

const authContext = createContext<IAuthContext>({
  isLoading: true,
  authenticated: false,
  user: {
    role: "visitor",
  },
  accessToken: "",
  initiateLogin: () => {},
  handleAuthentication: () => {},
  logout: () => {},
});

export default authContext;

export const AuthProvider = authContext.Provider;
export const AuthConsumer = authContext.Consumer;
