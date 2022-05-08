import { render, screen } from "@testing-library/react";
import React from "react";
import Guide from "../Guide";

const renderComponent = () => {
  return render(<Guide />);
};

describe("<Guide /> rendering", () => {
  it("should match snapshot", () => {
    const wrapper = renderComponent();
    expect(wrapper.container).toMatchSnapshot();
  });

  it("should render UI correctly", () => {
    renderComponent();

    const titleElement = screen.getByText(
      "* Double-click to the label to edit the corresponding task!"
    );

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("guide__text");
  });
});
