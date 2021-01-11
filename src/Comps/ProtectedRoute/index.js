/**
 * ProtectedRoute: Adding logic before Returen Route
 */
import React from "react";
import { Route, useHistory } from "react-router-dom";
import { loginPath, token as mockToken } from "../../constant";

export const ProtectedRoute = (props) => {
  const token = localStorage.getItem("token"); // get token if it exists

  /*
   * destructuring Push function and object location from hook useHistory of react-router-dom,
   * and set the default to avoid crashing the app
   */
  const { push = () => {}, location = {} } = useHistory();

  /**
   * if faulty token or token is not matching expectation
   * redirect using push function and pass location in key { state } for user come back to the last location if login successfully
   * we can use Redirect Componet, but I would love to refer this way!
   */
  if (!token || token !== mockToken) {
    push({ pathname: loginPath, state: location });
  }

  /**
   * if everything is good so far just work as nomal Route.
   */
  return <Route {...props} />;
};

export default ProtectedRoute;
