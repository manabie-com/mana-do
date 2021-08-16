import React from "react";
import { Route, Redirect } from "react-router-dom";
const TOKEN_TTL = 15 * 60 * 60 * 1000;
export default function PrivateRoute({ children, ...rest }) {
  const checkingStatus = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const lastTime = localStorage.getItem("loginTime");
      const ttl = Number(new Date().getTime()) - Number(lastTime);
      const isExpire = ttl > TOKEN_TTL;
      if (isExpire) {
        localStorage.setItem("token", "");
        localStorage.setItem("loginTime", "");
        localStorage.setItem("username", "");
        return false;
      }
      return true;
    }
    return false;
  };
  const isLogin = checkingStatus();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogin ? (
          children
        ) : (
          <Redirect
            exact
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
}
