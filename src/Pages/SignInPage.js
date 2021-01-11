import React from "react";
import { useHistory } from "react-router-dom";
import { BaseInput, AuthButtom } from "../Comps";
import Context from "../store";
import { isLogin } from "../utils";
import { todosPath } from "../constant";

const SignInPage = () => {
  /**
   * get Store using Context
   * set default values to advoil crash app and checking type
   */
  const propsContext = React.useContext(Context);
  const {
    state: { userId = "", password = "", errMgs = null },
    onChangeUID = () => {},
    onChangeUPass = () => {},
  } = propsContext;

  /**
   * check if the user already login then they do not have to login again
   * unless the token is gone
   */

  const history = useHistory();
  if (isLogin()) {
    history.push(todosPath);
  }

  return (
    <div className="container">
      <h1>Todos List</h1>
      <br />
      <BaseInput
        label="User ID"
        id="user_id"
        value={userId}
        onChange={(e) => {
          e.persist();
          onChangeUID(e.target.value);
        }}
      />
      <br />
      <BaseInput
        label="Password"
        id="password"
        type="password"
        value={password}
        onChange={(e) => {
          e.persist();
          onChangeUPass(e.target.value);
        }}
      />
      {
        /* If Err or Err Mgs show this */
        typeof errMgs === "string" && <span className="errMgs">{errMgs}</span>
      }
      <AuthButtom auth="login" />
    </div>
  );
};

export default SignInPage;
