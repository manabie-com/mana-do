import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";

import FormToDo from "components/ToDo/FormToDo";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";

const propsTest = {
  onCreateToDo: jest.fn(),
};

let container: HTMLElement;

beforeEach(() => {
  container = render(<FormToDo {...propsTest} />).container;
});

afterEach(cleanup);

test("FormToDo: render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FormToDo {...propsTest} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("FormToDo: test event keydown", () => {
  const usernameEl = container.querySelector("input") as HTMLInputElement;
  fireEvent.change(usernameEl, { target: { value: "new task 1" } });
  fireEvent.keyDown(usernameEl, { key: "Enter", code: "Enter", charCode: 13 });
  expect(propsTest.onCreateToDo).toBeCalled();
});

test("SignInPage: match snapshot", () => {
  const tree = renderer.create(<FormToDo {...propsTest} />).toJSON();
  expect(tree).toMatchSnapshot();
});
