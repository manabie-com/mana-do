import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { useImmer } from "use-immer";
import Input from "./components/Input";
import Service from "./service";

const SignInPage = () => {
  //   let _isMounted = true;
  const [state, setState] = useImmer({
    userId: "",
    password: "",
  });

  //   const setStateCommon = (objects: any) => {
  //     if (_isMounted) {
  //       Object.keys(objects).forEach((key) => {
  //         setState((draft) => {
  //           draft[key] = objects[key];
  //         });
  //       });
  //     }
  //   };

  //   useEffect(() => {
  //     return () => {
  //       _isMounted = false;
  //     };
  //   }, []);

  const history = useHistory();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await Service.signIn(state.userId, state.password);

    localStorage.setItem("token", resp);
    history.push("/todo");
  };

  //   const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     e.persist();
  //     setForm((prev) => ({
  //       ...prev,
  //       [e.target.name]: e.target.value,
  //     }));
  //   };
  const onChangeCommon = (name: string, value: string) => {
    console.log("name, value ===>", name, value);
    setState((draft: any) => {
      draft[name] = value;
    });
  };

  return (
    <div className="wrapper-form">
      <form onSubmit={signIn}>
        <span className="form-title">Sign in</span>
        <div className="wrapper-inputs">
          <Input
            id="user_id"
            name="userId"
            placeholder="User ID"
            value={state.userId}
            onChange={onChangeCommon}
          />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={state.password}
            onChange={onChangeCommon}
          />
          <button type="submit">Sign in</button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
