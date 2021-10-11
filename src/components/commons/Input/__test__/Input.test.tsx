import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";

import { Input } from "components/commons";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";

const propsTest = {
  onChange: jest.fn(),
  value: "Value test",
  className: "Input-Custom",
};

let container: HTMLElement;

beforeEach(() => {
  container = render(<Input {...propsTest} />).container;
});

afterEach(cleanup);

test("Input: render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Input {...propsTest} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
test("Input: props of input", () => {
  const rootEl = container.querySelector(".root-input") as HTMLDivElement;
  const inputEl = container.querySelector(".input-custom") as HTMLInputElement;
  expect(rootEl?.className).toContain(propsTest.className);
  expect(inputEl?.value).toEqual(propsTest.value);
});
test("Input: onChange call when input value", () => {
  const inputEl = container.querySelector(".input-custom") as HTMLInputElement;
  fireEvent.change(inputEl, { target: { value: "test" } });
  expect(propsTest.onChange).toBeCalled();
});
test("Input: match snapshot", () => {
  const tree = renderer.create(<Input {...propsTest} />).toJSON();
  expect(tree).toMatchSnapshot();
});
