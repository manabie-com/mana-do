import * as React from "react";
import { useHistory } from "react-router";
import Service from "../../service";
import useLocalStorage from "../../_hooks/useLocalStorage";
import FormGroup from "../FormGroup";
import ManaDoButton from "../ManaDoButton";
import styles from "./LoginForm.module.css";

interface LoginFormProps extends React.HTMLAttributes<HTMLElement> {}

const LoginForm: React.FunctionComponent<LoginFormProps> = ({ ...props }) => {
  const history = useHistory();
  const [, setToken] = useLocalStorage("TOKEN", "");
  const [loginMsg, setLoginMsg] = React.useState("");
  const [usernameFeedbackMsg, setUsernameFeedbackMsg] = React.useState("");
  const [passwordFeedbackMsg, setPasswordFeedbackMsg] = React.useState("");
  const [form, setForm] = React.useState({
    userId: "",
    password: "",
  });

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!form.userId || !form.password) {
        if (!form.userId) {
          setUsernameFeedbackMsg("Username cannot be blank!");
        }
        if (!form.password) {
          setPasswordFeedbackMsg("Password cannot be blank!");
        }
      } else {
        try {
          const resp = await Service.signIn(form.userId, form.password);
          setToken(resp);
          history.push("/todo");
        } catch (error) {
          setLoginMsg(error);
        }
      }
    },
    [form.password, form.userId, history, setToken]
  );

  const onChangeField = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { currentTarget } = e;

      setForm((prev) => ({
        ...prev,
        [currentTarget.name]: currentTarget.value,
      }));
    },
    []
  );

  React.useEffect(() => {
    if (form.userId) {
      setUsernameFeedbackMsg("");
    }
    if (form.password) {
      setPasswordFeedbackMsg("");
    }
  }, [form]);

  return (
    <form
      className={`${styles.ManaDo__loginForm} ${props.className || ""}`}
      onSubmit={handleSubmit}
      noValidate
    >
      {loginMsg && <div className={styles.ManaDo__LoginMsg}>{loginMsg}</div>}
      <FormGroup
        id="user_id"
        name="userId"
        type="text"
        value={form.userId}
        onChange={onChangeField}
        label="Username"
        placeholder="Enter your username"
        feedbackLabel={usernameFeedbackMsg}
        required
      />
      <FormGroup
        id="password"
        name="password"
        type="password"
        value={form.password}
        onChange={onChangeField}
        label="Password"
        className="mt-3"
        placeholder="Enter your password"
        feedbackLabel={passwordFeedbackMsg}
        required
      />
      <ManaDoButton
        label="Login"
        type="submit"
        className={`${styles.ManaDo__LoginButton} mt-3`}
      />
    </form>
  );
};

export default React.memo(LoginForm);
