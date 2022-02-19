import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Checkbox from './Checkbox';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  jest.useFakeTimers()
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  jest.useRealTimers()
});


it("render & click checkbox", () => {
  let onChange = jest.fn();
  act(() => {
    render(<Checkbox onChange={onChange}/>, container);
  });
  const checkbox = document.querySelector("[data-testid=checkbox]");
  expect(checkbox.classList).not.toContain("checked");

  act(() => {
    checkbox.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(checkbox.classList).toContain("checked");
  
  act(() => {
    checkbox.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(checkbox.classList).not.toContain("checked");
});

it("render default checked checkbox & click", () => {
  let onChange = jest.fn();
  act(() => {
    render(<Checkbox onChange={onChange} defaultChecked/>, container);
  });
  const checkbox = document.querySelector("[data-testid=checkbox]");
  expect(checkbox.classList).toContain("checked");

  act(() => {
    checkbox.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(checkbox.classList).not.toContain("checked");
});