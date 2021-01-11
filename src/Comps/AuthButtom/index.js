import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Service from "../../service";
import Context from "../../store";
import { errMgs, loginPath, todosPath } from "../../constant";

import "./styles.css";

const allow = ["login", "logout"];
const valCheck = allow[0];

/**
 *
 * AuthButtom: The same Button for reuse Authentication Logics
 */

const AuthButtom = ({ auth, className, ...rest }) => {
  /**
   * get Store using Context
   */
  const propsContext = React.useContext(Context);
  const {
    state: { userId, password },
    clearID = () => {},
    clearPass = () => {},
    setUserID = () => {},
    setErrMgs = () => {},
  } = propsContext;

  const history = useHistory();

  /**
   * return Fragment if the props auth is not matching
   */
  if (!allow.includes(auth)) {
    return <React.Fragment />;
  }

  /**
   *
   * Logic SingIn
   */
  const signIn = async (e) => {
    e.preventDefault();
    try {
      const resp = await Service.signIn(userId, password);
      setUserID(userId); // set user_ID to create new todo
      clearPass(); // clear Pass for security
      localStorage.setItem("token", resp);
      history.push(todosPath);
    } catch {
      setErrMgs(errMgs);
    }
  };

  /**
   *
   * Logic singOut
   */
  const singOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setUserID(null); // remove user_ID
    /**
     * Reset Logic Login
     */
    setErrMgs(null);
    clearID();
    clearPass();

    history.push(loginPath);
  };

  /**
   * set ClassBase Blue for login and Pink for logout
   */
  const classBase = auth === valCheck ? "btn-primay" : "btn-secondary";

  /**
   * repare props then return
   */
  const propsBtn = {
    className: `${classBase} ${className}`,
    children: auth === valCheck ? "Sign In" : "Sign Out",
    onClick: auth === valCheck ? signIn : singOut,
    onKeyDown: auth === valCheck ? signIn : singOut,
    ...rest,
  };

  return (
    <div className="btn">
      <button
        className={auth === valCheck ? "btn-primay" : "btn-secondary"}
        {...propsBtn}
      />
    </div>
  );
};

AuthButtom.propTypes = {
  auth: PropTypes.oneOf(["login", "logout"]).isRequired,
  className: PropTypes.string,
};

export default React.memo(AuthButtom);
