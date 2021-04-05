import "./index.css";

import React, { useMemo } from "react";

/* Models */
import { Data } from "src/models/todo";

/* Components */
import Button from "src/common/Button/Button";
import Form from "src/common/Form/Form";

/* Hook */
import { useSignIn } from "src/pages/SignIn/handleApi";

const SignInPage = () => {
  const { signIn, clearError, error, message } = useSignIn();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, data: Data) => {
    e.preventDefault();
    signIn(data);
  };

  const options = useMemo(() => {
    return [
      {
        id: "user_id",
        name: "userId",
        text: "text",
        label: "User id",
      },
      {
        id: "password",
        name: "password",
        type: "password",
        label: "Password",
      },
    ];
  }, []);

  return (
    <div className="form__signIn">
      <span className="form__header">Sign In</span>
      <Form
        onSubmit={handleSubmit}
        options={options}
        error={error}
        messageError={message}
        clearError={clearError}
      >
        <Button type="submit">Sign in</Button>
      </Form>
    </div>
  );
};

export default SignInPage;
