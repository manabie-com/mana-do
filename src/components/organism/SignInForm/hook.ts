import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as globalActions from "modules/actions";
import Service from "service";

const useSignInForm = () => {
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const validateForm = () => {
    if(!form.userId){
      setErrorMsg("Please enter user id")
      return false;
    };
    if(!form.password){
      setErrorMsg("Please enter password");
      return false;
    };
    return true;
  }
  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    if(!validateForm()){
      return;
    }
    signIn(e);
  }

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const resp = await Service.signIn(form.userId, form.password);
      dispatch(globalActions.login(resp));
      history.push("/todo");
    } catch (error) {
      setErrorMsg(error);
    }
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return {
    signIn,
    form,
    onChangeField,
    errorMsg,
    handleSignIn
  };
};

export default useSignInForm;
