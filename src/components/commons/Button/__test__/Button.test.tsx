import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button, ButtonColors } from "components/commons";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";

const propsTest = {
  fullWidth: true,
  color: ButtonColors.primary,
  onClick: jest.fn(),
};

let container: HTMLElement;

beforeEach(() => {
  container = render(<Button {...propsTest} />).container;
});

afterEach(cleanup);

test("Button: render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Button {...propsTest} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
test("Button: props of button", () => {
  const buttonEl = container.querySelector(".btn-custom") as HTMLButtonElement;
  expect(buttonEl?.className).toContain("btn-custom-primary");
});
test("Button: onChange call when click", () => {
  const buttonEl = container.querySelector(".btn-custom") as HTMLButtonElement;
  userEvent.click(buttonEl);
  expect(propsTest.onClick).toBeCalled();
});
test("Button: match snapshot", () => {
  const tree = renderer.create(<Button {...propsTest} />).toJSON();
  expect(tree).toMatchSnapshot();
});
