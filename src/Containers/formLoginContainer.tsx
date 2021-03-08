import React, { useState } from "react";
import FormLogin from "../components/formLogin";
import Service from "../service";

const FormLoginContainer: React.FC = () => {
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!form.userId || !form.password) {
      setError("Please input User Name and password");
      return;
    }

    try {
      setLoading(true);
      const resp = await Service.signIn(form.userId, form.password);
      localStorage.setItem("token", resp);
      window.location.reload();
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return <FormLogin {...{ form, signIn, onChangeField, loading, error }} />;
};

export default FormLoginContainer;
