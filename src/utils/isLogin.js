import { token as expectToken } from "../constant";

export const isLogin = () => {
  const token = localStorage.getItem("token");
  return token === expectToken;
};

export default isLogin;
