import React from "react";
import SignInPage from "../pages/SignIn";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

describe("SignIn Page", () => {
  test("has a header Sign In", () => {
    const component = render(<SignInPage />);
    const headerEl = component.getByTestId("header");

    expect(headerEl.textContent).toBe("Sign In");
  });
  test("has disable sign in button when no value in userid", () => {
    const component = render(<SignInPage />);
    const inputText = component.getByRole("textbox");
    const btnSubmit = component.getByTestId("btnSignin");
    expect(inputText.textContent).toBe("");
    expect(btnSubmit).toBeDisabled();
  });
  test("has disable sign in button when no value in password", () => {
    const component = render(<SignInPage />);
    const inputPassword = component.getByLabelText("Password");
    const btnSubmit = component.getByTestId("btnSignin");
    expect(inputPassword.textContent).toBe("");
    expect(btnSubmit).toBeDisabled();
  });
  test("has enable sign in button when has value in userid and password", () => {
    const component = render(<SignInPage />);
    const inputText = component.getByLabelText("UserId");
    const inputPassword = component.getByLabelText("Password");
    const btnSubmit = component.getByTestId("btnSignin");

    userEvent.type(inputText, "firstUser");
    userEvent.type(inputPassword, "example");

    expect(inputText).toHaveValue("firstUser");
    expect(inputPassword).toHaveValue("example");
    expect(btnSubmit).toBeEnabled();
  });
});
