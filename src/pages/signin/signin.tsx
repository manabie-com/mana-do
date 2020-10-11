import React from "react";
import { useHistory } from "react-router-dom";
import Service from "src/services";
import { History } from "history";
import Button from "src/components/button/button";
import Input from "src/components/input";
import "./signin.scss";
import { toast } from "react-toastify";
import Routes from "src/constants/routes";

const onSubmit = (history: History) => async (
  evt: React.FormEvent<HTMLFormElement>
) => {
  evt.preventDefault();
  const formData = new FormData(evt.target as HTMLFormElement);

  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  try {
    const resp = await Service.signIn(username, password);
    localStorage.setItem("token", resp);
    history.push(Routes.Todo);
  } catch (err) {
    toast.error(err);
  }
};

export const SignIn: React.FC = () => {
  const history = useHistory();

  return (
    <div className="signin">
      <form onSubmit={onSubmit(history)} className="form">
        <Input label="Username" name="username" className="mb-2" />
        <Input label="Password" name="password" className="mb-4" />
        <Button type="submit" className="btn">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
