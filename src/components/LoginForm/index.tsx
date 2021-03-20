import * as React from "react";
import { useHistory } from "react-router";
import Service from "../../service";
import FormGroup from "../FormGroup";
import ManaDoButton from "../ManaDoButton";
import styles from "./LoginForm.module.css";

interface LoginFormProps extends React.HTMLAttributes<HTMLElement> {}

const LoginForm: React.FunctionComponent<LoginFormProps> = ({
  className,
  ...props
}) => {
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

      if (!form.userId || !form.password) {
        if (!form.userId) {
          setUsernameFeedbackMsg("Username cannot be blank!");
        }
        if (!form.password) {
          setPasswordFeedbackMsg("Password cannot be blank!");
        }
      } else {
        setButtonLoadingState(true);
        setTimeout(async () => {
          try {
            const token = await Service.signIn(form.userId, form.password);
            history.push("/auth", token);
          } catch (error) {
            setLoginMsg(error);
            setButtonLoadingState(false);
          } finally {
            setButtonLoadingState(false);
          }
        }, 1000);
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
    if (form.userId) {
      setUsernameFeedbackMsg("");
    }
    if (form.password) {
      setPasswordFeedbackMsg("");
    }
  }, [form]);

  return (
    <div className={`${styles.ManaDo__LoginFormWrapper} ${className || ""}`}>
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
          onChange={onChangeField}
          label="USERNAME"
          placeholder="Enter your username"
          feedbackLabel={usernameFeedbackMsg}
          required
        />
        <FormGroup
          id="password"
          name="password"
          type="password"
          onChange={onChangeField}
          label="PASSWORD"
          className="mt-3"
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
          className={`${styles.ManaDo__LoginButton}`}
        />
        <p className={styles.ManaDo__LoginAltText}>
          Need an account?{" "}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.facebook.com/ptteee/"
            className={styles.ManaDo__formGroupFeedbackLabel__strong}
          >
            Contact the administrator
          </a>
        </p>
      </form>
    </div>
  );
};

export default React.memo(LoginForm);
