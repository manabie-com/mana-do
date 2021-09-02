import React from "react";
import ActionButton from "../ActionButton";
import { render } from "@testing-library/react";

let container: HTMLElement;
const propsTest = {
  label: "Test Label",
  note: "300",
};
beforeEach(() => {
  container = render(<ActionButton {...propsTest} />).container;
});

test("test label of action button", () => {
  const btnEl = container.querySelector("button");
  expect(btnEl).toHaveTextContent(propsTest.label);
});

test("test note of action button", () => {
  const btnEl = container.querySelector(".Note__btn");
  expect(btnEl).toHaveTextContent(propsTest.note);
});
