import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";

import SignInPage from "pages/SignInPage";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";

let container: HTMLElement;

beforeEach(() => {
  container = render(<SignInPage />).container;
});

afterEach(cleanup);

test("SignInPage: render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SignInPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("SignInPage: change input username", () => {
  const usernameEl = container.querySelector("#user_id") as HTMLInputElement;
  fireEvent.change(usernameEl, { target: { value: "test" } });
  expect(usernameEl.value).toEqual("test");
});

test("SignInPage: change input password", () => {
  const passwordEl = container.querySelector("#user_id") as HTMLInputElement;
  fireEvent.change(passwordEl, { target: { value: "123456" } });
  expect(passwordEl.value).toEqual("123456");
});

test("SignInPage: match snapshot", () => {
  const tree = renderer.create(<SignInPage />).toJSON();
  expect(tree).toMatchSnapshot();
});
