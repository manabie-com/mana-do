import React from "react";
import { render } from "@testing-library/react";

import Button, { Props } from "../Button";

const children = <h1>Test</h1>;
const renderComponent = (props?: Props) => {
  const utils = render(<Button {...props}>{children}</Button>);

  const button = utils.queryByText("Test")!.parentNode! as HTMLElement;
  return { ...utils, button };
};

describe("<Button />", () => {
  it("should have children", () => {
    const { button } = renderComponent();
    expect(button.children).toHaveLength(1);
  });

  it("should have a class attribute", () => {
    const { button } = renderComponent();
    expect(button).toHaveAttribute("class");
  });

  it("should not adopt a type attribute when rendering a button", () => {
    const type = "submit";
    const { button } = renderComponent({ children, type });
    expect(button).not.toHaveAttribute("type");
  });
});
