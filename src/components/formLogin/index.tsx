import React from "react";
import "./formLogin.css";
import { ReactComponent as Spinner } from "../../Spinner.svg";

interface IFormLogin {
  signIn: React.FormEventHandler;
  form: { userId: string; password: string };
  onChangeField: React.ChangeEventHandler;
  loading: boolean;
  error: string;
}

const FormLogin: React.FC<IFormLogin> = ({
  signIn,
  form,
  onChangeField,
  loading,
  error,
}) => {
  return (
    <div className="signin__container">
      <h1 className="signin__heading">LOGIN</h1>

      {error && (
        <h4 className="signin__error" data-testid="signinError">
          {error}
        </h4>
      )}

      <form onSubmit={signIn} className="signin__form">
        <input
          autoComplete="none"
          className="signin__input"
          placeholder="User Name"
          name="userId"
          value={form.userId}
          style={{ marginTop: 12 }}
          data-testid="signinName"
          onChange={onChangeField}
        />
        <br />

        <input
          className="signin__input"
          placeholder="Password"
          name="password"
          type="password"
          data-testid="signinPassword"
          style={{ marginTop: 12 }}
          value={form.password}
          onChange={onChangeField}
        />
        <br />
        <button
          type="submit"
          className="signin__submit"
          data-testid="signinSubmit"
          style={{ marginTop: 12 }}
          disabled={loading}
        >
          {loading ? <Spinner className="signin__spinner" /> : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
