import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Checkbox } from "components/commons";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";

const propsTest = {
  disabled: false,
  checked: false,
  onChange: jest.fn(),
};

let container: HTMLElement;

beforeEach(() => {
  container = render(<Checkbox {...propsTest} />).container;
});

afterEach(cleanup);

test("Checkbox: render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Checkbox {...propsTest} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("Checkbox: props of checkbox", () => {
  const inputEl = container.querySelector("input") as HTMLInputElement;
  expect(inputEl?.checked).toBe(inputEl.checked);
  expect(inputEl?.disabled).toBe(inputEl.disabled);
});

test("Checkbox: onChange call when click", () => {
  const inputEl = container.querySelector("input") as HTMLInputElement;
  userEvent.click(inputEl);
  expect(propsTest.onChange).toBeCalled();
});

test("Checkbox: match snapshot", () => {
  const tree = renderer.create(<Checkbox {...propsTest} />).toJSON();
  expect(tree).toMatchSnapshot();
});
