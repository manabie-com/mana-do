import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup } from "@testing-library/react";
import { Modal } from "components/commons";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";

const propsTest = {
  show: true,
  width: "300px",
  title: "Title modal",
  onClose: jest.fn(),
};

let container: HTMLElement;

beforeEach(() => {
  container = render(<Modal {...propsTest} />).container;
});

afterEach(cleanup);

test("Modal: render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Modal {...propsTest} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
test("Modal: props of modal", () => {
  const modalEl = container.querySelector(".modal-custom") as HTMLDivElement;
  const modalMain = container.querySelector(".modal-main") as HTMLDivElement;
  expect(modalEl?.className).toContain("display-block");
  expect(modalMain?.style.width).toEqual(propsTest.width);
});
test("Modal: onClose call when click", () => {
  const iconCloseEl = container.querySelector(".icon-close") as HTMLSpanElement;
  userEvent.click(iconCloseEl);
  expect(propsTest.onClose).toBeCalled();
});
test("Modal: match snapshot", () => {
  const tree = renderer.create(<Modal {...propsTest} />).toJSON();
  expect(tree).toMatchSnapshot();
});
