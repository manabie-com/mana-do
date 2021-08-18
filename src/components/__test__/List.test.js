import React from "react";
import List from "../List";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("List renders with correct text", () => {
  const component = render(<List />);
  const headerEl = component.getByTestId("header");

  expect(headerEl.textContent).toBe("");
});
