import * as React from "react";

import styles from "./LoginForm.module.css";
import { useHistory } from "react-router";
import Service from "../../service";

import FormGroup from "../FormGroup";
import ManaDoButton from "../ManaDoButton";

interface LoginFormProps extends React.HTMLAttributes<HTMLElement> {}

const LoginForm: React.FunctionComponent<LoginFormProps> = ({ className }) => {
  const history = useHistory();

  const [loginMsg, setLoginMsg] = React.useState("");
  const [buttonLoading, setButtonLoadingState] = React.useState(false);
  const [usernameFeedbackMsg, setUsernameFeedbackMsg] = React.useState("");
  const [passwordFeedbackMsg, setPasswordFeedbackMsg] = React.useState("");
  const [form, setForm] = React.useState({
    userId: "",
    password: "",
  });

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!form.userId.trim()) {
        setUsernameFeedbackMsg("Username cannot be blank!");
      }
      if (!form.password.trim()) {
        setPasswordFeedbackMsg("Password cannot be blank!");
      }
      // Check user inputs
      if (form.userId.trim() && form.password.trim()) {
        setButtonLoadingState(true);
        try {
          const token = await Service.signIn(form.userId, form.password);
          // Wait 1s for token from login (simulated)
          setTimeout(async () => {
            // If token is returned, redirect to authorization pending page
            if (token) {
              history.push("/auth", token);
            } else setLoginMsg("Login info is not valid, please try again!");
          }, 1000);
        } catch (error) {
          setLoginMsg(error);
          setButtonLoadingState(false);
        }
      }
    },
    [form.password, form.userId, history]
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
    // Reset feedback messages on input is not blank
    if (form.userId.trim()) {
      setUsernameFeedbackMsg("");
    }
    if (form.password.trim()) {
      setPasswordFeedbackMsg("");
    }
  }, [form]);

  return (
    <div className={`${styles.ManaDo__LoginFormWrapper} ${styles.ManaDo__WrapperWidth} ${className || ""}`}>
      <h1 className={styles.ManaDo__LogoName}>Mana-do</h1>
      <span className={styles.ManaDo__WelcomeAlt}>
        We're so excited to see you again!
      </span>
      <form
        className={styles.ManaDo__loginForm}
        onSubmit={handleSubmit}
        noValidate
      >
        <FormGroup
          id="user_id"
          name="userId"
          type="text"
          label="USERNAME"
          onChange={onChangeField}
          placeholder="Enter your username"
          feedbackLabel={usernameFeedbackMsg}
          required
        />
        <FormGroup
          className="mt-1"
          id="password"
          name="password"
          type="password"
          label="PASSWORD"
          onChange={onChangeField}
          placeholder="Enter your password"
          feedbackLabel={passwordFeedbackMsg}
          required
        />
        <div className={styles.ManaDo__LoginMsg}>{loginMsg || <>&nbsp;</>}</div>
        <ManaDoButton
          label="Login"
          type="submit"
          variant="primary-light"
          isLoading={buttonLoading}
          className={styles.ManaDo__LoginButton}
        />
        <p className={styles.ManaDo__LoginAltText}>
          Need an account?{" "}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.facebook.com/ptteee/"
            className={styles.ManaDo__formGroupFeedbackLabel__strong}
          >
            Contact the administrator.
          </a>
        </p>
      </form>
    </div>
  );
};

export default React.memo(LoginForm);
