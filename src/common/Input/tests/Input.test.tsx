import React from "react";
import { render } from "@testing-library/react";

import Input, { Props } from "../Input";

const renderComponent = (props?: Props) => {
  const utils = render(<Input {...props} />);

  const input = utils.container;
  return { ...utils, input };
};

describe("<Input />", () => {
  it("should render label if it has", () => {
    const { input } = renderComponent({ label: "User Id" });
    expect(input.querySelector('label').tagName.toLowerCase()).toMatch("label");
  });

  it("should render input", () => {
    const { input } = renderComponent();
    expect(input.querySelector('input').tagName.toLowerCase()).toMatch("input");
  });

  it("should render type checkbox", () => {
    const { input } = renderComponent({ type: "checkbox" });
    expect(input.querySelector('input').type).toMatch("checkbox");
  });
});
