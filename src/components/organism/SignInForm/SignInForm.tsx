import React from "react";

import "./SignInForm.css";
import useSignInForm from "./hook";

const SignInForm = () => {
  const { handleSignIn, form, onChangeField, errorMsg } = useSignInForm();

  return (
    <form onSubmit={handleSignIn}>
      <div>
        <label htmlFor="user_id" className="Login__label">
          User id:
        </label>
        <input
          id="user_id"
          type="text"
          name="userId"
          value={form.userId}
          onChange={onChangeField}
        />
      </div>
      <div>
        <label htmlFor="password" className="Login__label">
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={onChangeField}
        />
      </div>
      {errorMsg && (
        <React.Fragment>
          <label className="Message--error">{errorMsg}</label>
          <br />
        </React.Fragment>
      )}
      <button type="submit" className="Login__submit">
        Sign in
      </button>
    </form>
  );
};

export default SignInForm;
