import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Service from "../../service/api-frontend";
import { storeLoginToken } from "../../utils/storageUtils";
import { ROUTES } from "../../utils/constants";
import { Wrapper } from "./styles";

const SignInPage = () => {
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });
  const navigate = useNavigate();

  const notify = (message: string) => toast.error(message);

  // Show the error message when the user input failed their username or password
  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await Service.signIn(form.userId, form.password);

      storeLoginToken(resp);
      navigate(ROUTES.TODO);
    } catch (e: any) {
      notify(e);
    }
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Wrapper>
      <div className="Login__inner">
        <form onSubmit={signIn}>
          <div className="Login__row">
            <label htmlFor="user_id">
              Username
              <input
                id="user_id"
                name="userId"
                value={form.userId}
                style={{ marginTop: 12 }}
                onChange={onChangeField}
              />
            </label>
          </div>
          <div className="Login__row">
            <label htmlFor="password">
              Password
              <input
                id="password"
                name="password"
                type="password"
                style={{ marginTop: 12 }}
                value={form.password}
                onChange={onChangeField}
              />
            </label>
          </div>
          <button type="submit" style={{ marginTop: 12 }}>
            SIGN IN
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default SignInPage;
