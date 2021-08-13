import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { BlockShadow, Button, Input } from "../../../../components";
import "./FormLogin.scss";

export const FormLogin: React.FC<IFormLogin> = ({ onSubmit }) => {
  //SignupSchema
  const SignupSchema = Yup.object().shape({
    userId: Yup.string().min(2, "Ít nhất 2 kí tự").required("Bất buộc"),
    password: Yup.string().min(4, "Ít nhất 4 kí tự").required("Bất buộc"),
  });

  //formik
  const formik = useFormik({
    initialValues: {
      userId: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="sign-in__form">
      <BlockShadow className="sign-in__container">
        <h1>Manabie,</h1>
        <p>Sign to continue!</p>
        <br />
        <br />
        <Input
          id="userId"
          name="userId"
          value={formik.values.userId}
          label="User id"
          onChange={formik.handleChange}
          className="sign-in__input"
          error={formik.touched.userId && formik.errors.userId}
        />
        <br />
        <br />
        <Input
          id="password"
          name="password"
          value={formik.values.password}
          label="Password"
          onChange={formik.handleChange}
          className="sign-in__input"
          type={"password"}
          error={formik.touched.password && formik.errors.password}
        />
        <br />
        <br />
        <div className="sign-in__action">
          <Button type="submit">Sign in</Button>
        </div>
      </BlockShadow>
    </form>
  );
};
