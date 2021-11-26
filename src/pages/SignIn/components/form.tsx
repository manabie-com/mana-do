import React from "react";
import Button from "../../../components/Forms/Button";
import FormLabel from "../../../components/Forms/FormLabel";
import Input from "../../../components/Forms/Input";

const SignInForm = ({ onSignIn, formData, onChangeField }: any) => {
  return (
    <form onSubmit={onSignIn}>
      <FormLabel htmlFor="user_id" title="User id">
        <Input
          id="user_id"
          name="userId"
          placeholder="User id"
          value={formData.userId}
          style={{ marginTop: 12 }}
          onChange={onChangeField}
        />
      </FormLabel>
      <br />
      <FormLabel htmlFor="password" title="Password">
        <Input
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          style={{ marginTop: 12 }}
          value={formData.password}
          onChange={onChangeField}
        />
      </FormLabel>
      <br />
      <Button type="submit" title="Sign in" style={{ marginTop: 12 }} />
    </form>
  );
};

export default SignInForm;
