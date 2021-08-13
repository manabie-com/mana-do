import "./SignInPage.scss";
import Service from "../../service";
import { ImageLogin } from "../../constants/images";
import { FormLogin } from "./components";
import { ErrorModal } from "../../components";
import { useState } from "react";

export const SignInPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (values: any) => {
    try {
      const resp = await Service.signIn(values.userId, values.password);
      localStorage.setItem("token", resp);
      window.location.replace("/");
    } catch (error) {
      setErrorMessage(JSON.stringify(error));
      // alert(error);
    }
  };
  return (
    <div className="sign-in">
      <FormLogin onSubmit={onSubmit} />
      <img src={ImageLogin} alt="login" className="sign-in__img" />
      <ErrorModal
        isShow={errorMessage}
        message={errorMessage}
        setIsShow={setErrorMessage}
      />
    </div>
  );
};
