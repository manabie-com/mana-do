import React, { Dispatch, FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../components/Input";
import Service from "../../service";
import { signInAction } from "../../store/actions";

interface Props {
  dispatch: Dispatch<any>;
}

const SignInPage: FC<Props> = (props) => {
  const { dispatch } = props;
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });
  const token = localStorage.getItem("token");
  const history = useHistory();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await Service.signIn(form.userId, form.password);

    localStorage.setItem("token", resp);
    dispatch(signInAction(resp, history));
  };

  useEffect(() => {
    if (token) {
      history.push("/todo");
    }
  }, [history, token]);

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="form" onSubmit={signIn}>
      <Input
        label="Username"
        name="userId"
        value={form.userId}
        onChange={onChangeField}
      />
      <Input
        label="Password"
        name="password"
        value={form.password}
        onChange={onChangeField}
        type="password"
      />
      <button className="active" type="submit">
        Sign in
      </button>
    </form>
  );
};

export default SignInPage;
