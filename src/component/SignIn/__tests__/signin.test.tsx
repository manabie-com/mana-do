import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElement,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import LoginForm from "component/SignIn/index";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe("Login Form", () => {
  const incorrectUserId = "testUser";
  const incorrectPassword = "password";
  const correctUserId = "firstUser";
  const correctPassword = "example";
  let form: any;
  let userInput: any;
  let passwordInput: any;
  beforeEach(() => {
    render(<LoginForm />);
    form = screen.getByTestId("login-form");
    userInput = screen.getByTestId("userId");
    passwordInput = screen.getByLabelText(/password/i);
  });

  test("should display a login form, with blank inputs for user and password", () => {
    expect(form).toHaveFormValues({
      userId: "",
      password: "",
    });
  });

  test("form inputs are changable", () => {
    userEvent.type(userInput, "testUser");
    userEvent.type(passwordInput, "test passworc");
    expect(userInput.value).toBe("testUser");
    expect(passwordInput.value).toBe("test passworc");
  });

  test("error message should show up if enter wrong data", async () => {
    userEvent.type(userInput, incorrectUserId);
    userEvent.type(passwordInput, incorrectPassword);
    fireEvent.submit(form);
    await waitForElement(() => screen.getByTestId("error-msg"));
    expect(screen.getByTestId("error-msg")).toBeInTheDocument();

    // when changing input error msg will disappear
    userEvent.type(userInput, "anything");
    expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
  });

  test("when submit correct values, redirect to todo page", () => {
    userEvent.type(userInput, correctUserId);
    userEvent.type(passwordInput, correctPassword);
    fireEvent.submit(form);

    // no error msg to show up
    expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
  });
});
