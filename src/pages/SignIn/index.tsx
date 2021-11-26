import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { isAuthorized } from "../../helpers/authorize";
import Service from "../../service";
import SignInForm from "./components/form";

const SignInPage = () => {
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });
  const history = useHistory();

  useEffect(() => {
    if (isAuthorized()) {
      history.push("/todo");
    }
  }, []);

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await Service.signIn(form.userId, form.password);

    localStorage.setItem("token", resp);
    history.push("/todo");
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <React.StrictMode>
      <div style={{ marginTop: "3rem", textAlign: "left" }}>
        <SignInForm
          onSignIn={signIn}
          formData={form}
          onChangeField={onChangeField}
        />
      </div>
    </React.StrictMode>
  );
};

export default SignInPage;
