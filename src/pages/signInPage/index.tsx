import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import Button from "../../components/button";
import TextInput from "../../components/textInput";
import Heading from "../../components/heading";
import { Constants } from "../../constants";
import Service from "../../service";
import "./signInPage.scss";
import { SignInFormValues } from "../../models/signInFormValues";

const SignInPage = () => {
  // we should add SignInFormValues type here
  const [form, setForm] = useState<SignInFormValues>({
    userId: "",
    password: "",
  });
  // we should add validate for form
  const [formError, setFormError] = useState<string>("");

  const history = useHistory();

  const validateForm = (): boolean => {
    if (!form.userId) {
      setFormError("Please enter user id");
      return false;
    }
    if (!form.password) {
      setFormError("Please enter password");
      return false;
    }
    return true;
  };

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validate form before sign in
    if (!validateForm()) {
      return;
    }
    // we should use try catch to handle error
    try {
      const resp = await Service.signIn(form.userId, form.password);
      localStorage.setItem(Constants.TOKEN, resp);
      history.push("/todo");
    } catch (error) {
      console.log(error);
      setFormError(error as string);
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
    <div className="signin-page">
      <div className="signin">
        <form onSubmit={signIn}>
          <Heading text="Login" />
          <TextInput
            label="User id"
            id="userId"
            name="userId"
            value={form.userId}
            onChange={onChangeField}
            placeholder="User id"
          />
          <br />
          <TextInput
            label="Password"
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={onChangeField}
            placeholder="Password"
          />
          {formError && <p className="signin__error">{formError}</p>}
          <Button data-testid="signin" type="submit" text="Sign in" />
        </form>
      </div>
      <div className="welcome">
        <h1>Welcome to Manabie</h1>
      </div>
    </div>
  );
};

export default SignInPage;
